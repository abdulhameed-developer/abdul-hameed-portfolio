import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ServiceIllustration from '@/components/ServiceIllustration';
import {
  CLIENT_ENDORSEMENTS,
  GENERAL_SERVICES_FAQS,
  PROCESS_STAGES,
  SERVICES_DATA,
} from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'Full-Stack Web Development, WordPress, Shopify & SEO Services | Abdul Hameed',
  description:
    'Full-stack website design, custom PHP WordPress plugin development, Shopify storefront customization, Next.js web applications, and technical SEO services by Abdul Hameed in Lahore.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Full-Stack Web Development, WordPress, Shopify & SEO Services | Abdul Hameed',
    description:
      'Full-stack website development, custom PHP WordPress plugins, Shopify storefronts, Next.js web apps, and technical SEO services.',
    url: '/services',
    siteName: 'Abdul Hameed Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/v5/service-web-design.jpg',
        width: 1200,
        height: 800,
        alt: 'Full-Stack Web Development Services — Abdul Hameed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Stack Web Development, WordPress, Shopify & SEO Services | Abdul Hameed',
    description:
      'Full-stack website development, custom PHP WordPress plugins, Shopify storefronts, Next.js web apps, and technical SEO services.',
    images: ['/images/v5/service-web-design.jpg'],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
          {/* Page Header — Calm, Editorial, No Pushy Button Pairs */}
          <header
            data-service-reveal
            className="mb-16 border-b border-[#12161F]/10 pb-12"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
              Services &amp; Capabilities
            </p>

            <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-[#12161F] sm:text-6xl">
                  Digital Services Built with Care.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4B5262] sm:text-lg">
                  Custom website development, WordPress engineering, e-commerce
                  storefronts, technical SEO, visual design, and practical
                  workflow integrations—structured around clarity and long-term
                  reliability.
                </p>
              </div>

              <Link
                href="/contact"
                prefetch={true}
                className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#12161F] transition-colors hover:text-[#C85A17] lg:self-auto"
              >
                <span>Have a project in mind? Get in touch</span>
                <ArrowRight className="h-4 w-4 text-[#C85A17]" />
              </Link>
            </div>
          </header>

          {/* All 6 Service Sections — Equal-Height Columns (items-stretch) */}
          <div className="space-y-12">
            {SERVICES_DATA.map((service, index) => {
              const isReversed = index % 2 === 1;

              return (
                <section
                  key={service.id}
                  data-service-reveal
                  aria-labelledby={`service-${service.slug}-heading`}
                  className="overflow-hidden rounded-2xl border border-[#12161F]/10 bg-white p-6 sm:p-10"
                >
                  <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
                    {/* Service-Specific Illustration Column (5 Cols — Stretches 100% to Match Right Column) */}
                    <div
                      className={`flex flex-col lg:col-span-5 ${
                        isReversed ? 'lg:order-2' : ''
                      }`}
                    >
                      <ServiceIllustration
                        slug={service.slug}
                        className="h-full"
                      />
                    </div>

                    {/* Copy & Key Deliverables Column (7 Cols) */}
                    <div
                      className={`flex flex-col justify-between lg:col-span-7 ${
                        isReversed ? 'lg:order-1' : ''
                      }`}
                    >
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
                          {service.shortTitle}
                        </p>
                        <h2
                          id={`service-${service.slug}-heading`}
                          className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-4xl"
                        >
                          {service.title}
                        </h2>

                        <p className="mt-3 text-base font-medium leading-relaxed text-[#12161F] sm:text-lg">
                          {service.benefitStatement}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#4B5262]">
                          {service.overview}
                        </p>

                        {/* Deliverables Grid */}
                        <div className="mt-6 border-t border-[#12161F]/10 pt-5">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4B5262]">
                            Key Deliverables
                          </span>
                          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 rounded-xl border border-[#12161F]/8 bg-[#F8F6F1] p-3 text-xs leading-relaxed text-[#12161F]"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C85A17]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Single Restrained Contextual Action + Secondary Detail Link */}
                      <div className="mt-7 flex flex-wrap items-center gap-6 border-t border-[#12161F]/10 pt-5">
                        <Link
                          href={`/services/${service.slug}`}
                          prefetch={true}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#12161F] px-5 py-3 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-[#C85A17]"
                        >
                          <span>Explore {service.shortTitle}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                          href={`/contact?service=${encodeURIComponent(
                            service.title
                          )}`}
                          prefetch={true}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5262] transition-colors hover:text-[#C85A17]"
                        >
                          <span>Discuss this service</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* How Projects Work — 6 Clear Steps */}
          <section
            aria-labelledby="how-we-work-heading"
            className="mt-24 rounded-2xl border border-[#12161F]/10 bg-[#F1EDE4] p-8 sm:p-12"
          >
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
                Transparent Process
              </p>
              <h2
                id="how-we-work-heading"
                className="mt-2 font-display text-3xl font-bold text-[#12161F] sm:text-4xl"
              >
                How a Project Moves From Idea to Launch
              </h2>
              <p className="mt-2 text-sm text-[#4B5262] sm:text-base">
                A structured six-step workflow that keeps scope, design, and
                technical delivery clear from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.step}
                  className="rounded-xl border border-[#12161F]/10 bg-white p-6"
                >
                  <span className="font-mono text-xs font-bold text-[#C85A17]">
                    Step {stage.step}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#12161F]">
                    {stage.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] text-[#4B5262]">
                    {stage.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5262]">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Verified Production Delivery Summaries — Clean Editorial Cards, 1 Column on Tablet, Zero Truncation */}
          <section
            aria-labelledby="services-endorsements-heading"
            className="mt-20"
          >
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
                Selected Case Studies
              </p>
              <h2
                id="services-endorsements-heading"
                className="mt-2 font-display text-3xl font-bold text-[#12161F] sm:text-4xl"
              >
                Verified Delivery Across Real Client Platforms
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {CLIENT_ENDORSEMENTS.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[#12161F]/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#C85A17]/45 hover:shadow-sm sm:p-7"
                >
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A84308]">
                      {item.context}
                    </p>

                    <h3 className="mt-2.5 break-words font-display text-lg font-bold leading-snug text-[#12161F]">
                      {item.role}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#4B5262]">
                      {item.quote}
                    </p>
                  </div>

                  {item.projectSlug && (
                    <div className="mt-6 border-t border-[#12161F]/10 pt-4">
                      <Link
                        href={`/projects/${item.projectSlug}`}
                        prefetch={true}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12161F] transition-colors hover:text-[#A84308]"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#C85A17]" aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Frequently Asked Questions (FAQ) — Sticky Left Column */}
          <section
            aria-labelledby="services-faq-heading"
            className="mt-20 rounded-2xl border border-[#12161F]/10 bg-white p-7 sm:p-12"
          >
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
                  Common Questions
                </p>
                <h2
                  id="services-faq-heading"
                  className="mt-2 font-display text-3xl font-bold text-[#12161F] sm:text-4xl"
                >
                  Frequently Asked Questions
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5262]">
                  Answers to common questions from business owners, founders,
                  and international teams before starting a project.
                </p>

                <div className="mt-6 rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A84308]">
                    Direct Consultation
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#4B5262]">
                    Have a custom requirement not listed here? Share your scope
                    directly for a personal response.
                  </p>
                  <Link
                    href="/contact"
                    prefetch={true}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#12161F] underline decoration-[#C85A17] underline-offset-4 transition-colors hover:text-[#C85A17]"
                  >
                    <span>Ask a Question or Prepare a Brief</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#C85A17]" />
                  </Link>
                </div>
              </div>

              <div className="space-y-3 lg:col-span-7">
                {GENERAL_SERVICES_FAQS.map((faq, idx) => (
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
      </main>

      <SiteFooter />
    </div>
  );
}
