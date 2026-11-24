import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import {
  buildProjectBriefHandoff,
  validateContactSubmission,
} from '@/lib/contact-validation';

/**
 * Privacy-first, ephemeral deduplication map storing ONLY non-reversible
 * SHA-256 hashes and timestamps for 60 seconds to prevent accidental double-clicks.
 *
 * No personal enquiry data is written to /tmp, disk, or application logs,
 * and no fake delivery receipt IDs are generated.
 */
const RECENT_SUBMISSION_HASHES = new Map<string, number>();
const IP_RATE_WINDOW = new Map<string, { count: number; resetAt: number }>();
const DEDUP_WINDOW_MS = 60_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const MAX_PAYLOAD_BYTES = 16_384;

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
};

function pruneExpiredState(nowMs: number) {
  for (const [hash, timestamp] of RECENT_SUBMISSION_HASHES.entries()) {
    if (nowMs - timestamp > DEDUP_WINDOW_MS) {
      RECENT_SUBMISSION_HASHES.delete(hash);
    }
  }
  for (const [ipHash, entry] of IP_RATE_WINDOW.entries()) {
    if (nowMs > entry.resetAt) {
      IP_RATE_WINDOW.delete(ipHash);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const nowMs = Date.now();
    pruneExpiredState(nowMs);

    // Privacy-preserving rate limit using hashed client IP
    const forwardedFor = req.headers.get('x-forwarded-for') || 'local-client';
    const clientIpHash = crypto
      .createHash('sha256')
      .update(forwardedFor.split(',')[0].trim())
      .digest('hex');

    const rateRecord = IP_RATE_WINDOW.get(clientIpHash);
    if (rateRecord && nowMs < rateRecord.resetAt) {
      if (rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Too many requests in a short window. Please wait a moment or use WhatsApp / Email directly.',
          },
          {
            status: 429,
            headers: {
              ...SECURITY_HEADERS,
              'Retry-After': '60',
            },
          }
        );
      }
      rateRecord.count += 1;
    } else {
      IP_RATE_WINDOW.set(clientIpHash, {
        count: 1,
        resetAt: nowMs + RATE_LIMIT_WINDOW_MS,
      });
    }

    const rawBody = await req.text();
    if (rawBody.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Request payload is too large.',
        },
        { status: 413, headers: SECURITY_HEADERS }
      );
    }

    const parsed: unknown = rawBody ? JSON.parse(rawBody) : {};
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid request format.',
        },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const validation = validateContactSubmission(
      parsed as Record<string, unknown>
    );

    if (!validation.valid || !validation.normalized) {
      return NextResponse.json(
        {
          ok: false,
          error: validation.error || 'Please complete all required fields.',
        },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const { name, contactInfo, contactType, service, timeline, description } =
      validation.normalized;

    const fingerprint = crypto
      .createHash('sha256')
      .update(
        `${name.toLowerCase()}|${contactInfo.toLowerCase()}|${service}|${description}`
      )
      .digest('hex');

    const lastSeen = RECENT_SUBMISSION_HASHES.get(fingerprint);
    const deduplicated =
      typeof lastSeen === 'number' && nowMs - lastSeen < DEDUP_WINDOW_MS;

    RECENT_SUBMISSION_HASHES.set(fingerprint, nowMs);

    const handoff = buildProjectBriefHandoff({
      name,
      contactInfo,
      service,
      timeline,
      description,
    });

    return NextResponse.json(
      {
        ok: true,
        deduplicated,
        workflow: 'external_handoff_required',
        storedOnServer: false,
        deliveredAutomatically: false,
        brief: {
          name,
          contactInfo,
          contactType,
          service,
          timeline,
          description,
          fullBriefText: handoff.fullBriefText,
          isTruncatedForUrl: handoff.isTruncatedForUrl,
          whatsappHref: handoff.whatsappHref,
          mailtoHref: handoff.mailtoHref,
        },
      },
      { headers: SECURITY_HEADERS }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Unable to validate your brief on the server right now. You can still send directly via WhatsApp or Email.',
      },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      workflow: 'external_handoff_required',
      storedOnServer: false,
      deliveredAutomatically: false,
    },
    { headers: SECURITY_HEADERS }
  );
}
