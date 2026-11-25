/**
 * Resolves the canonical public production origin for metadata, OpenGraph,
 * JSON-LD structured data, sitemap.xml, and robots.txt.
 *
 * Never uses localhost, 127.0.0.1, or temporary preview container URLs
 * as the canonical production domain.
 */
// The verified production deployment for this repository. The custom
// abdulhameed.dev domain currently serves a different Vercel project, so it
// must not be used as the canonical identity until it is attached here.
const DEFAULT_CANONICAL_ORIGIN = 'https://abdul-hameed-portfolio-rho.vercel.app';

export function isTemporaryOrLocalOrigin(rawUrl?: string | null): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') return true;
  const trimmed = rawUrl.trim();
  if (
    !trimmed ||
    trimmed === 'MY_APP_URL' ||
    trimmed === 'MY_SITE_URL' ||
    trimmed === 'https://example.com'
  ) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host.endsWith('.run.app') ||
      host.endsWith('.studio')
    ) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

export function resolvePublicSiteOrigin(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    process.env.APP_URL,
  ];

  for (const candidate of candidates) {
    if (candidate && !isTemporaryOrLocalOrigin(candidate)) {
      return candidate.trim().replace(/\/+$/, '');
    }
  }

  return DEFAULT_CANONICAL_ORIGIN;
}
