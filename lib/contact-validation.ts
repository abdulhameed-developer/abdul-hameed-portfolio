export const VALID_SERVICE_OPTIONS = [
  'Website Design & Development',
  'WordPress Development & Custom Features',
  'E-Commerce & Online Stores',
  'SEO & Website Optimization',
  'Graphic Design & Digital Creatives',
  'AI-Assisted Digital Solutions',
  'General Website / Digital Consultation',
  'Recruiter / Hiring Opportunity',
] as const;

export const VALID_TIMELINE_OPTIONS = [
  'Flexible / Ready to Discuss',
  'Priority Launch (1–2 Weeks)',
  'Standard Project (2–4 Weeks)',
  'Ongoing Retainer / Maintenance',
  'Full-Time / Contract Role',
] as const;

const SERVICE_SLUG_MAP: Record<string, string> = {
  'website-development': 'Website Design & Development',
  'wordpress-development': 'WordPress Development & Custom Features',
  'ecommerce-development': 'E-Commerce & Online Stores',
  'seo-optimization': 'SEO & Website Optimization',
  'graphic-design': 'Graphic Design & Digital Creatives',
  'graphic-design-creatives': 'Graphic Design & Digital Creatives',
  'graphic-design-digital-creatives': 'Graphic Design & Digital Creatives',
  'ai-assisted-solutions': 'AI-Assisted Digital Solutions',
  recruiter: 'Recruiter / Hiring Opportunity',
  hiring: 'Recruiter / Hiring Opportunity',
};

/**
 * Resolves a query-string ?service= value (title, shortTitle, or slug)
 * into a canonical Project Type option, falling back safely if unknown.
 */
export function resolveRequestedService(rawParam?: string | null): string {
  if (!rawParam || typeof rawParam !== 'string') {
    return VALID_SERVICE_OPTIONS[0];
  }
  const trimmed = rawParam.trim();
  if (!trimmed) return VALID_SERVICE_OPTIONS[0];

  const exactMatch = VALID_SERVICE_OPTIONS.find(
    (opt) => opt.toLowerCase() === trimmed.toLowerCase()
  );
  if (exactMatch) return exactMatch;

  const slugMatch = SERVICE_SLUG_MAP[trimmed.toLowerCase()];
  if (slugMatch) return slugMatch;

  const partialMatch = VALID_SERVICE_OPTIONS.find((opt) =>
    opt.toLowerCase().includes(trimmed.toLowerCase())
  );
  if (partialMatch) return partialMatch;

  return VALID_SERVICE_OPTIONS[0];
}

export interface NormalizedContactBrief {
  name: string;
  contactInfo: string;
  contactType: 'email' | 'phone';
  service: string;
  timeline: string;
  description: string;
}

export interface ContactValidationResult {
  valid: boolean;
  error?: string;
  normalized?: NormalizedContactBrief;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_REGEX = /^[+\d][\d\s().-]{6,24}$/;

export function isValidEmailOrPhone(value: string): {
  valid: boolean;
  type?: 'email' | 'phone';
  reason?: string;
} {
  const trimmed = value.trim();
  if (!trimmed) {
    return {
      valid: false,
      reason: 'Please provide your email address or phone/WhatsApp number.',
    };
  }

  // If it contains '@' or letters, validate as an email address
  if (trimmed.includes('@') || /[a-zA-Z]/.test(trimmed)) {
    if (EMAIL_REGEX.test(trimmed)) {
      return { valid: true, type: 'email' };
    }
    return {
      valid: false,
      reason:
        'Please enter a valid email address (for example, you@example.com).',
    };
  }

  // Otherwise validate as a phone / WhatsApp number (7 to 16 digits)
  const digitCount = (trimmed.match(/\d/g) || []).length;
  if (
    PHONE_CHARS_REGEX.test(trimmed) &&
    digitCount >= 7 &&
    digitCount <= 16
  ) {
    return { valid: true, type: 'phone' };
  }

  return {
    valid: false,
    reason:
      'Please enter a valid phone or WhatsApp number with country/area digits (for example, +92 329 6988010).',
  };
}

function stripControlCharacters(raw: string, allowNewlines = false): string {
  const withoutNulls = raw.replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
    ''
  );
  if (!allowNewlines) {
    return withoutNulls.replace(/[\r\n]+/g, ' ').trim();
  }
  return withoutNulls.replace(/\r\n/g, '\n').trim();
}

export function validateContactSubmission(input: {
  name?: unknown;
  contactInfo?: unknown;
  service?: unknown;
  timeline?: unknown;
  description?: unknown;
}): ContactValidationResult {
  const name =
    typeof input.name === 'string'
      ? stripControlCharacters(input.name, false)
      : '';
  const contactInfo =
    typeof input.contactInfo === 'string'
      ? stripControlCharacters(input.contactInfo, false)
      : '';
  const rawService =
    typeof input.service === 'string'
      ? stripControlCharacters(input.service, false)
      : '';
  const rawTimeline =
    typeof input.timeline === 'string'
      ? stripControlCharacters(input.timeline, false)
      : '';
  const description =
    typeof input.description === 'string'
      ? stripControlCharacters(input.description, true)
      : '';

  if (!name || name.length < 2) {
    return {
      valid: false,
      error: 'Please enter your name (at least 2 characters).',
    };
  }

  if (name.length > 120) {
    return {
      valid: false,
      error: 'Name must be 120 characters or fewer.',
    };
  }

  if (contactInfo.length > 160) {
    return {
      valid: false,
      error: 'Contact information must be 160 characters or fewer.',
    };
  }

  const contactCheck = isValidEmailOrPhone(contactInfo);
  if (!contactCheck.valid || !contactCheck.type) {
    return {
      valid: false,
      error:
        contactCheck.reason ||
        'Please provide a valid email address or phone/WhatsApp number.',
    };
  }

  if (!description || description.length < 10) {
    return {
      valid: false,
      error:
        'Please share a short project or role description (at least 10 characters).',
    };
  }

  if (description.length > 5000) {
    return {
      valid: false,
      error: 'Project description must be 5,000 characters or fewer.',
    };
  }

  const service = resolveRequestedService(rawService);
  const timeline = VALID_TIMELINE_OPTIONS.includes(
    rawTimeline as (typeof VALID_TIMELINE_OPTIONS)[number]
  )
    ? rawTimeline
    : VALID_TIMELINE_OPTIONS[0];

  return {
    valid: true,
    normalized: {
      name,
      contactInfo,
      contactType: contactCheck.type,
      service,
      timeline,
      description,
    },
  };
}

export interface ProjectBriefHandoff {
  fullBriefText: string;
  urlSafeBriefText: string;
  isTruncatedForUrl: boolean;
  whatsappHref: string;
  mailtoHref: string;
}

const MAX_URL_DESCRIPTION_CHARS = 900;

/**
 * Formats a validated or draft contact brief and generates URL-length-safe
 * WhatsApp and mailto handoff links without losing full text for clipboard copy.
 */
export function buildProjectBriefHandoff(
  input: {
    name?: string;
    contactInfo?: string;
    service: string;
    timeline: string;
    description?: string;
  },
  recipientEmail = 'hameedrjt@gmail.com',
  recipientWhatsappDigits = '923296988010'
): ProjectBriefHandoff {
  const cleanName = (input.name || '').trim();
  const cleanContact = (input.contactInfo || '').trim();
  const cleanDesc = (input.description || '').trim();

  const fullBriefText = [
    'Hello Abdul Hameed, I would like to discuss a project.',
    cleanName ? `Name: ${cleanName}` : null,
    cleanContact ? `Contact: ${cleanContact}` : null,
    `Project Type: ${input.service}`,
    `Timeline: ${input.timeline}`,
    cleanDesc
      ? `Project Brief:\n${cleanDesc}`
      : 'Project Brief: I would like to discuss requirements and next steps.',
  ]
    .filter(Boolean)
    .join('\n');

  const isTruncatedForUrl = cleanDesc.length > MAX_URL_DESCRIPTION_CHARS;
  const urlDesc = isTruncatedForUrl
    ? `${cleanDesc.slice(0, MAX_URL_DESCRIPTION_CHARS).trim()}…\n[Note: Full brief copied to clipboard due to URL length limits]`
    : cleanDesc;

  const urlSafeBriefText = [
    'Hello Abdul Hameed, I would like to discuss a project.',
    cleanName ? `Name: ${cleanName}` : null,
    cleanContact ? `Contact: ${cleanContact}` : null,
    `Project Type: ${input.service}`,
    `Timeline: ${input.timeline}`,
    urlDesc
      ? `Project Brief:\n${urlDesc}`
      : 'Project Brief: I would like to discuss requirements and next steps.',
  ]
    .filter(Boolean)
    .join('\n');

  const cleanDigits = recipientWhatsappDigits.replace(/[^\d]/g, '');
  const whatsappHref = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(
    urlSafeBriefText
  )}`;

  const subject = encodeURIComponent(
    `Project Enquiry: ${input.service}${cleanName ? ` — ${cleanName}` : ''}`
  );
  const body = encodeURIComponent(urlSafeBriefText);
  const mailtoHref = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

  return {
    fullBriefText,
    urlSafeBriefText,
    isTruncatedForUrl,
    whatsappHref,
    mailtoHref,
  };
}
