import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroGradientBackground from '@/components/HeroGradientBackground';
import HeroSection from '@/components/HeroSection';
import TechLogoMarquee from '@/components/TechLogoMarquee';
import HorizontalWorkCarousel from '@/components/HorizontalWorkCarousel';
import WorkflowStepsSection from '@/components/WorkflowStepsSection';
import SiteFooter from '@/components/SiteFooter';
import { DEVELOPER_PROFILE } from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title:
    'Abdul Hameed — Full-Stack Web Developer | Custom Websites, Plugins & Web Apps',
  description:
    'Abdul Hameed is a Full-Stack Web Developer designing and engineering responsive business websites, custom PHP WordPress plugins, Shopify storefronts, and Next.js applications.',
  alternates: {
    canonical: '/',
  },
};

const WHAT_I_DO_PILLARS = [
  {
    kicker: 'Web & App Architecture',
    title: 'Full-Stack Web & Next.js Applications',
    description:
      'End-to-end responsive web applications and business websites engineered across frontend interfaces and backend APIs using React, Next.js, TypeScript, and Tailwind CSS.',
    tech: 'Next.js · React · TypeScript · Tailwind CSS · GSAP',
  },
  {
    kicker: 'CMS & Custom Plugins',
    title: 'WordPress & Custom PHP Plugin Engineering',
    description:
      'Bespoke WordPress architectures, modular PHP plugins, searchable Custom Post Type directories, MySQL queries, REST API integrations, and dynamic booking or comparison workflows.',
    tech: 'WordPress · PHP · MySQL · REST API · Custom Plugins',
  },
  {
    kicker: 'Storefront Engineering',
    title: 'E-Commerce & Shopify Storefronts',
    description:
      'Tailored Shopify Liquid templates and WooCommerce storefronts that present collections with editorial polish and make mobile browsing and checkout effortless.',
    tech: 'Shopify · Liquid · WooCommerce · Storefront UX',
  },
  {
    kicker: 'Search & Velocity',
    title: 'AI-Assisted Velocity & Technical SEO',
    description:
      'Combining Cursor, Claude, Gemini, and ChatGPT for rapid architectural problem-solving with semantic HTML, Schema.org JSON-LD graphs, and Core Web Vitals optimization.',
    tech: 'Cursor · Claude · Gemini · ChatGPT · Schema.org · SEO',
  },
];

const PHILOSOPHY_PRINCIPLES = [
  {
    kicker: 'Architecture & Delivery',
    title: 'Complete Frontend-to-Backend Ownership',
    body: 'Every project in this portfolio is architected and built across both frontend interfaces and backend PHP, MySQL, Liquid, or TypeScript logic—ensuring cohesive quality without handoff gaps.',
  },
  {
    kicker: 'Modern Workflow',
    title: 'AI-Accelerated, Human-Verified',
    body: 'I integrate AI tools like Cursor, Claude, Gemini, and ChatGPT to solve complex engineering problems faster while maintaining strict human code review and cross-device QA.',
  },
  {
    kicker: 'Production Standard',
    title: 'Authentic, Practical Solutions',
    body: 'Whether building a custom WordPress plugin for an education portal or customizing a luxury Shopify store, I focus on reliable features that solve real business problems.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content">
        {/* UNIFIED HERO & MARQUEE STAGE WITH INFINITE 3D SILK RIBBON GRADIENT BACKGROUND */}
        <div className="relative overflow-hidden border-b border-stone-200/80 bg-[#F8F6F1]">
          <HeroGradientBackground />

          {/* SECTION 1 — PERSONAL HERO */}
          <HeroSection />

          {/* SECTION 2 — TECHNOLOGY LOGO MARQUEE (INTERACTIVE DRAG & TOUCH) */}
          <TechLogoMarquee />
        </div>

        {/* SECTION 3 — AUTOMATIC VISUAL PROJECT CAROUSEL (EDGE BLUR FADES & DOTS) */}
        <HorizontalWorkCarousel />

        {/* SECTION 4 — FOUR STEPS CONNECTED WORKFLOW PATH (DESKTOP / TABLET / MOBILE) */}
        <WorkflowStepsSection />

        {/* SECTION 5 — WHAT I DO */}
        <section
          aria-labelledby="what-i-do-heading"
          className="border-b border-stone-200/80 bg-[#F8F6F1] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
            <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A84308]">
                  Core Capabilities
                </p>
                <h2
                  id="what-i-do-heading"
                  className="mt-2 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl [text-wrap:balance]"
                >
                  What I Do
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
                  I work across full-stack web development, custom PHP WordPress
                  plugin engineering, and e-commerce customization—building
                  complete solutions from frontend UI to backend logic.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
                <Link
                  href="/expertise"
                  className="inline-flex items-center gap-1.5 text-[#12161F] underline decoration-stone-300 underline-offset-8 transition-colors hover:decoration-[#12161F]"
                >
                  <span>Explore Technical Expertise</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-stone-700 underline decoration-stone-300 underline-offset-8 transition-colors hover:text-[#12161F] hover:decoration-[#12161F]"
                >
                  <span>Client Services</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {WHAT_I_DO_PILLARS.map((pillar) => (
                <article
                  key={pillar.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#C85A17]/45 hover:shadow-[0_18px_40px_rgba(18,22,31,0.07)] sm:p-9"
                >
                  {/* Top Radial Spotlight Wash on Hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_top,rgba(200,90,23,0.12),transparent_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative z-10">
                    <span className="inline-flex rounded-full border border-[#C85A17]/25 bg-[#F8F6F1] px-3 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#A84308] transition-colors group-hover:bg-[#C85A17] group-hover:text-white">
                      {pillar.kicker}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold text-[#12161F] transition-colors group-hover:text-[#A84308] sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
                      {pillar.description}
                    </p>
                  </div>

                  <p className="relative z-10 mt-6 border-t border-stone-100 pt-4 font-mono text-xs text-stone-600 transition-colors group-hover:border-[#C85A17]/25 group-hover:text-[#12161F]">
                    {pillar.tech}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — ABOUT ME (FULL-STACK & AI-ASSISTED WORKFLOW) */}
        <section
          aria-labelledby="home-about-heading"
          className="border-b border-stone-200/80 bg-[#EFECE4] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A84308]">
                  Personal Background
                </p>
                <h2
                  id="home-about-heading"
                  className="mt-2 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl [text-wrap:balance]"
                >
                  End-to-End Web Engineering Powered by Modern AI Workflows.
                </h2>

                <p className="mt-6 text-base leading-relaxed text-stone-700 sm:text-lg">
                  Every project showcased in this portfolio—from searchable
                  university portals and custom PHP WordPress plugins to luxury
                  Shopify stores and Next.js web applications—was engineered end
                  to end across frontend interfaces and backend systems.
                </p>

                <p className="mt-4 text-base leading-relaxed text-stone-700">
                  Alongside my professional work at{' '}
                  <strong className="text-[#12161F]">
                    {DEVELOPER_PROFILE.company}
                  </strong>{' '}
                  and my ongoing{' '}
                  <strong className="text-[#12161F]">
                    BS in Computer Science at Virtual University of Pakistan
                  </strong>
                  , I integrate AI tools including{' '}
                  <strong className="text-[#12161F]">
                    Cursor, Claude, Gemini, and ChatGPT
                  </strong>{' '}
                  into my daily workflow to accelerate debugging, architecture,
                  and delivery—and contribute to WordPress Core Trac (
                  {DEVELOPER_PROFILE.coreTracTicketNumber}).
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#12161F] underline decoration-stone-400 underline-offset-8 transition-colors hover:decoration-[#12161F]"
                  >
                    <span>Read My Full Story &amp; Experience</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <a
                    href={DEVELOPER_PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 transition-colors hover:text-[#12161F]"
                  >
                    <span>GitHub (@{DEVELOPER_PROFILE.githubHandle})</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right Column: Clean Fact Ledger */}
              <div className="lg:col-span-5">
                <dl className="divide-y divide-stone-200 rounded-2xl border border-stone-200/90 bg-[#F8F6F1] p-6 sm:p-8">
                  <div className="pb-4">
                    <dt className="font-mono text-xs text-stone-600">
                      Professional Role
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-[#12161F]">
                      Full-Stack Web Developer
                    </dd>
                    <dd className="text-sm text-stone-600">
                      {DEVELOPER_PROFILE.company} · Websites, Custom Plugins &amp; Web Apps
                    </dd>
                  </div>

                  <div className="py-4">
                    <dt className="font-mono text-xs text-stone-600">
                      AI-Assisted Engineering Stack
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-[#12161F]">
                      Cursor · Claude · Gemini · ChatGPT
                    </dd>
                    <dd className="text-sm text-stone-600">
                      Rapid full-stack problem-solving paired with human QA
                    </dd>
                  </div>

                  <div className="pt-4">
                    <dt className="font-mono text-xs text-stone-600">
                      Academic &amp; Open-Source
                    </dt>
                    <dd className="mt-1 font-display text-lg font-bold text-[#12161F]">
                      BS Computer Science &amp; WP Core Trac {DEVELOPER_PROFILE.coreTracTicketNumber}
                    </dd>
                    <dd className="text-sm text-stone-600">
                      Virtual University of Pakistan · @{DEVELOPER_PROFILE.wordpressHandle} on WordPress.org
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 — PROFESSIONAL APPROACH / PHILOSOPHY */}
        <section
          aria-labelledby="philosophy-heading"
          className="bg-[#F8F6F1] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A84308]">
                Engineering Approach
              </p>
              <h2
                id="philosophy-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-4xl [text-wrap:balance]"
              >
                How I Approach Every Project
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 border-t border-stone-200/90 pt-10 lg:grid-cols-3">
              {PHILOSOPHY_PRINCIPLES.map((item) => (
                <div key={item.title}>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A84308]">
                    {item.kicker}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#12161F]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-stone-600 sm:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
