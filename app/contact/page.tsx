'use client';

import React, { Suspense, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Edit3,
  Mail,
  Send,
} from 'lucide-react';
import {
  WhatsAppOfficialIcon,
} from '@/components/FloatingWhatsAppButton';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ThemedSelect, { ThemedSelectOption } from '@/components/ThemedSelect';
import {
  DEVELOPER_PROFILE,
  GENERAL_SERVICES_FAQS,
  getWhatsAppUrl,
} from '@/lib/portfolio-data';
import {
  buildProjectBriefHandoff,
  resolveRequestedService,
  validateContactSubmission,
} from '@/lib/contact-validation';

const PROJECT_TYPE_OPTIONS: ThemedSelectOption[] = [
  {
    value: 'Website Design & Development',
    label: 'Website Design & Development',
    badge: 'Web & Next.js',
    description: 'Custom business websites, landing pages, and responsive frontend builds.',
  },
  {
    value: 'WordPress Development & Custom Features',
    label: 'WordPress Development & Custom Features',
    badge: 'WordPress & PHP',
    description: 'Custom themes, Elementor/Divi architecture, and bespoke WordPress plugins.',
  },
  {
    value: 'E-Commerce & Online Stores',
    label: 'E-Commerce & Online Stores',
    badge: 'WooCommerce & Shopify',
    description: 'Online storefronts, product catalogs, checkout flows, and payment setup.',
  },
  {
    value: 'SEO & Website Optimization',
    label: 'SEO & Website Optimization',
    badge: 'Technical SEO',
    description: 'Core Web Vitals speed optimization, semantic structure, and search visibility.',
  },
  {
    value: 'Graphic Design & Digital Creatives',
    label: 'Graphic Design & Digital Creatives',
    badge: 'Brand & Visual',
    description: 'Marketing creatives, brand identity assets, and web-ready visual graphics.',
  },
  {
    value: 'AI-Assisted Digital Solutions',
    label: 'AI-Assisted Digital Solutions',
    badge: 'Automation',
    description: 'Practical content workflows, API integrations, and smart web utilities.',
  },
  {
    value: 'General Website / Digital Consultation',
    label: 'General Website / Digital Consultation',
    badge: 'Advisory',
    description: 'Architecture review, site audit, or planning a new digital project.',
  },
  {
    value: 'Recruiter / Hiring Opportunity',
    label: 'Recruiter / Hiring Opportunity',
    badge: 'Career & Role',
    description: 'Full-time, contract, or remote Full-Stack Web Developer opportunities.',
  },
];

const TIMELINE_OPTIONS: ThemedSelectOption[] = [
  {
    value: 'Flexible / Ready to Discuss',
    label: 'Flexible / Ready to Discuss',
    badge: 'Recommended',
    description: 'Open to discussing project scope and scheduling milestones together.',
  },
  {
    value: 'Priority Launch (1–2 Weeks)',
    label: 'Priority Launch (1–2 Weeks)',
    badge: 'Fast Track',
    description: 'Focused sprint for landing pages, fixes, or urgent WordPress updates.',
  },
  {
    value: 'Standard Project (2–4 Weeks)',
    label: 'Standard Project (2–4 Weeks)',
    badge: 'Full Build',
    description: 'Ideal for complete business websites, custom themes, or online stores.',
  },
  {
    value: 'Ongoing Retainer / Maintenance',
    label: 'Ongoing Retainer / Maintenance',
    badge: 'Long-Term',
    description: 'Continuous development, technical SEO, and WordPress care.',
  },
  {
    value: 'Full-Time / Contract Role',
    label: 'Full-Time / Contract Role',
    badge: 'Hiring',
    description: 'Engineering team role or dedicated agency development partnership.',
  },
];

interface PreparedBriefState {
  name: string;
  contactInfo: string;
  service: string;
  timeline: string;
  description: string;
  fullBriefText: string;
  isTruncatedForUrl: boolean;
  whatsappHref: string;
  mailtoHref: string;
  deduplicated?: boolean;
}

function ContactContent() {
  const searchParams = useSearchParams();
  const requestedServiceParam = searchParams.get('service');
  const requestedProjectParam = searchParams.get('project');

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedService, setSelectedService] = useState(() =>
    resolveRequestedService(requestedServiceParam)
  );
  const [prevServiceParam, setPrevServiceParam] = useState(requestedServiceParam);
  if (requestedServiceParam !== prevServiceParam) {
    setPrevServiceParam(requestedServiceParam);
    setSelectedService(resolveRequestedService(requestedServiceParam));
  }

  const [selectedTimeline, setSelectedTimeline] = useState(
    TIMELINE_OPTIONS[0].value
  );
  const [description, setDescription] = useState(() =>
    requestedProjectParam
      ? `I would like to discuss a project similar to ${requestedProjectParam}. `
      : ''
  );
  const [isPreparing, setIsPreparing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [preparedBrief, setPreparedBrief] =
    useState<PreparedBriefState | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const reviewPanelRef = useRef<HTMLDivElement>(null);

  const liveHandoff = buildProjectBriefHandoff(
    {
      name,
      contactInfo,
      service: selectedService,
      timeline: selectedTimeline,
      description,
    },
    DEVELOPER_PROFILE.email,
    DEVELOPER_PROFILE.whatsappDigits
  );

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopyBrief = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2800);
    } catch {
      setCopiedBrief(false);
    }
  };

  const handlePrepareBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreparing) return;
    setFormError(null);

    const clientCheck = validateContactSubmission({
      name,
      contactInfo,
      service: selectedService,
      timeline: selectedTimeline,
      description,
    });

    if (!clientCheck.valid || !clientCheck.normalized) {
      setFormError(clientCheck.error || 'Please check your input fields.');
      return;
    }

    setIsPreparing(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          contactInfo,
          service: selectedService,
          timeline: selectedTimeline,
          description,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFormError(data.error || 'Please complete all required fields.');
      } else if (data.brief) {
        setPreparedBrief({
          ...data.brief,
          deduplicated: Boolean(data.deduplicated),
        });
        window.setTimeout(() => {
          reviewPanelRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }, 50);
      }
    } catch {
      // Fallback: if offline or server unreachable, still prepare the validated brief in client state
      const normalized = clientCheck.normalized;
      const handoff = buildProjectBriefHandoff(
        normalized,
        DEVELOPER_PROFILE.email,
        DEVELOPER_PROFILE.whatsappDigits
      );
      setPreparedBrief({
        ...normalized,
        fullBriefText: handoff.fullBriefText,
        isTruncatedForUrl: handoff.isTruncatedForUrl,
        whatsappHref: handoff.whatsappHref,
        mailtoHref: handoff.mailtoHref,
      });
      window.setTimeout(() => {
        reviewPanelRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 50);
    } finally {
      setIsPreparing(false);
    }
  };

  const handleEditBrief = () => {
    setPreparedBrief(null);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 30);
  };

  return (
    <div>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Form Column First on Mobile (order-1 lg:order-2), Right Column on Desktop (7 Cols) */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="rounded-2xl border border-[#12161F]/10 bg-white p-5 sm:p-9">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
              Project Brief Builder
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-[#12161F] sm:text-3xl">
              Tell Me About Your Project
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[#4B5262] sm:text-sm">
              Complete the fields below to format your project brief, then send
              it in one tap via WhatsApp or your Email app.
            </p>

            {preparedBrief ? (
              <div
                ref={reviewPanelRef}
                role="region"
                aria-labelledby="review-brief-heading"
                aria-live="polite"
                className="mt-7 rounded-2xl border border-[#12161F]/15 bg-[#F8F6F1] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A17]">
                      Step 2 of 2 · Action Required to Complete Sending
                    </p>
                    <h3
                      id="review-brief-heading"
                      className="mt-1 font-display text-2xl font-bold text-[#12161F]"
                    >
                      Review Your Brief
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleEditBrief}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#12161F]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#C85A17]"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-[#C85A17]" />
                    <span>Edit Details</span>
                  </button>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#4B5262]">
                  Your brief for{' '}
                  <strong className="text-[#12161F]">
                    {preparedBrief.service}
                  </strong>{' '}
                  ({preparedBrief.timeline}) is formatted below. Because this
                  portfolio does not send background emails automatically,{' '}
                  <strong className="text-[#12161F]">
                    please select WhatsApp or your Email application below to
                    complete sending your message
                  </strong>
                  , or copy the brief to paste manually.
                </p>

                {preparedBrief.isTruncatedForUrl && (
                  <div className="mt-4 rounded-xl border border-amber-700/30 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-950">
                    <strong>Long brief note:</strong> Because your project
                    description is detailed, direct URL links shorten the preview
                    text to stay within browser URL limits. Use{' '}
                    <strong>Copy Project Brief</strong> below to paste the
                    complete text into your email or WhatsApp message.
                  </div>
                )}

                <div className="mt-5 rounded-xl border border-[#12161F]/12 bg-white p-4 text-xs text-[#12161F]">
                  <div className="flex items-center justify-between gap-2 border-b border-[#12161F]/10 pb-2.5">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4B5262]">
                      Formatted Project Brief ({preparedBrief.name} ·{' '}
                      {preparedBrief.contactInfo})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyBrief(preparedBrief.fullBriefText)}
                      className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] font-semibold text-[#C85A17] hover:underline"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Brief Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="mt-3 whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#12161F] sm:text-sm">
                    {preparedBrief.fullBriefText}
                  </pre>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={preparedBrief.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#12161F] px-5 py-3.5 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-[#C85A17] sm:text-sm"
                  >
                    <WhatsAppOfficialIcon className="h-4 w-4 text-[#25D366]" />
                    <span>Send via WhatsApp</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={preparedBrief.mailtoHref}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#12161F]/15 bg-white px-5 py-3.5 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#C85A17] sm:text-sm"
                  >
                    <Mail className="h-4 w-4 text-[#C85A17]" />
                    <span>Open Email Draft</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyBrief(preparedBrief.fullBriefText)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#12161F]/15 bg-white px-4 py-3.5 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] sm:text-sm"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-700" />
                        <span>Copied Project Brief</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-[#C85A17]" />
                        <span>Copy Project Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handlePrepareBrief}
                className="mt-7 space-y-5"
                noValidate
              >
                {formError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-[#C85A17]/40 bg-[#C85A17]/10 px-4 py-3 text-xs font-semibold text-[#12161F]"
                  >
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="mb-2 block text-xs font-semibold text-[#12161F]"
                    >
                      Name *
                    </label>
                    <input
                      ref={nameInputRef}
                      id="enquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-[#12161F]/15 bg-[#F8F6F1] px-4 py-3 text-sm text-[#12161F] placeholder:text-[#4B5262]/60 focus:border-[#C85A17] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-contact"
                      className="mb-2 block text-xs font-semibold text-[#12161F]"
                    >
                      Contact Information (Email or Phone) *
                    </label>
                    <input
                      id="enquiry-contact"
                      type="text"
                      required
                      value={contactInfo}
                      onChange={(e) => {
                        setContactInfo(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="you@example.com or +92..."
                      className="w-full rounded-xl border border-[#12161F]/15 bg-[#F8F6F1] px-4 py-3 text-sm text-[#12161F] placeholder:text-[#4B5262]/60 focus:border-[#C85A17] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <ThemedSelect
                  id="enquiry-service"
                  label="Project Type"
                  value={selectedService}
                  options={PROJECT_TYPE_OPTIONS}
                  onChange={setSelectedService}
                />

                <ThemedSelect
                  id="enquiry-timeline"
                  label="Estimated Timeline & Scope"
                  value={selectedTimeline}
                  options={TIMELINE_OPTIONS}
                  onChange={setSelectedTimeline}
                />

                <div>
                  <label
                    htmlFor="enquiry-description"
                    className="mb-2 block text-xs font-semibold text-[#12161F]"
                  >
                    Short Description *
                  </label>
                  <textarea
                    id="enquiry-description"
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Briefly describe what you are looking to build, customize, or improve..."
                    className="w-full rounded-xl border border-[#12161F]/15 bg-[#F8F6F1] p-4 text-sm text-[#12161F] placeholder:text-[#4B5262]/60 focus:border-[#C85A17] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Single Clean Primary Submit Action + Compact Quick-Send Links */}
                <div className="border-t border-[#12161F]/10 pt-5">
                  <button
                    type="submit"
                    disabled={isPreparing}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#12161F] px-6 py-3.5 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-[#C85A17] disabled:opacity-60 sm:w-auto sm:text-sm"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {isPreparing
                        ? 'Preparing Project Brief...'
                        : 'Prepare Project Enquiry'}
                    </span>
                  </button>

                  <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#4B5262]">
                    <span>Prefer to send right away?</span>
                    <a
                      href={liveHandoff.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#12161F] underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#C85A17]"
                    >
                      <WhatsAppOfficialIcon className="h-3.5 w-3.5 text-[#25D366]" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={liveHandoff.mailtoHref}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#12161F] underline decoration-stone-300 underline-offset-4 transition-colors hover:text-[#C85A17]"
                    >
                      <Mail className="h-3.5 w-3.5 text-[#C85A17]" />
                      <span>Open Email Draft</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Left Column on Desktop / Second on Mobile: Single Consolidated Direct Contact Card (5 Cols) */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="rounded-2xl border border-[#12161F]/10 bg-white p-6 sm:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
              Direct Contact Channels
            </p>
            <h2 className="mt-1.5 font-display text-xl font-bold text-[#12161F] sm:text-2xl">
              Reach Out Directly
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[#4B5262] sm:text-sm">
              If you prefer a direct email or quick WhatsApp message instead of
              the project brief builder, use either channel below.
            </p>

            {/* Channel 1: Direct Email Row */}
            <div className="mt-6 rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A84308]">
                  Email
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex cursor-pointer items-center gap-1 font-mono text-[11px] font-semibold text-[#4B5262] transition-colors hover:text-[#C85A17]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3 w-3 text-[#C85A17]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${DEVELOPER_PROFILE.email}`}
                className="mt-1.5 inline-flex items-center gap-2 font-display text-base font-bold text-[#12161F] transition-colors hover:text-[#C85A17] sm:text-lg"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#C85A17]" />
                <span className="break-all">{DEVELOPER_PROFILE.email}</span>
              </a>
            </div>

            {/* Channel 2: Direct WhatsApp Row */}
            <div className="mt-3.5 rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-4">
              <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#4B5262]">
                WhatsApp
              </span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-2 font-display text-base font-bold text-[#12161F] transition-colors hover:text-[#C85A17] sm:text-lg"
              >
                <WhatsAppOfficialIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                <span>{DEVELOPER_PROFILE.whatsappDisplay}</span>
                <ArrowUpRight className="h-4 w-4 text-[#C85A17]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Common Questions Before Reaching Out */}
      <section
        aria-labelledby="contact-faq-heading"
        className="mt-20 rounded-2xl border border-[#12161F]/10 bg-white p-7 sm:p-12"
      >
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
              Before You Reach Out
            </p>
            <h2
              id="contact-faq-heading"
              className="mt-2 font-display text-3xl font-bold text-[#12161F] sm:text-4xl"
            >
              Common Project &amp; Collaboration Questions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#4B5262]">
              Quick answers regarding remote collaboration, existing website
              improvements, and project timelines.
            </p>
          </div>

          <div className="space-y-3 lg:col-span-7">
            {GENERAL_SERVICES_FAQS.slice(0, 4).map((faq, idx) => (
              <details
                key={faq.question}
                open={idx === 0}
                className="group rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-[#12161F]">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#C85A17] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 border-t border-[#12161F]/10 pt-3 text-sm leading-relaxed text-[#4B5262]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
          {/* Page Header — Always Server-Rendered Above Suspense for Instant SSR H1 & SEO */}
          <header className="mb-10 border-b border-[#12161F]/10 pb-8 sm:mb-14 sm:pb-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
                Contact &amp; Project Enquiry
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#12161F]/12 bg-white px-3.5 py-1.5 text-xs font-medium text-[#12161F]">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-600"
                  aria-hidden="true"
                />
                <Clock className="h-3.5 w-3.5 text-[#C85A17]" />
                <span>Available for Remote Projects &amp; Roles</span>
              </div>
            </div>

            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl lg:text-6xl">
              Start a Conversation.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4B5262] sm:text-base">
              Whether you are planning a website, need a custom WordPress
              plugin, or want to discuss a development role, prepare your
              project brief below and send it directly via WhatsApp or your
              Email app.
            </p>
          </header>

          <Suspense
            fallback={
              <div className="py-12 text-sm text-[#4B5262]">
                Loading contact form...
              </div>
            }
          >
            <ContactContent />
          </Suspense>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
