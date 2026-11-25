import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  GitPullRequest,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import {
  CLIENT_ENDORSEMENTS,
  DEVELOPER_PROFILE,
} from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'About Abdul Hameed — Full-Stack Web Developer | Experience & Resume',
  description:
    'Learn about Abdul Hameed, Full-Stack Web Developer at DE Media Solutions, BSCS student at VUP, and WordPress Core Trac #66548 contributor.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Abdul Hameed — Full-Stack Web Developer | Experience & Resume',
    description:
      'Learn about Abdul Hameed, Full-Stack Web Developer at DE Media Solutions and WordPress Core Trac #66548 contributor.',
    url: '/about',
    siteName: 'Abdul Hameed Portfolio',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: '/images/v5/about-workspace.jpg',
        width: 1200,
        height: 900,
        alt: 'About Abdul Hameed — Full-Stack Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Abdul Hameed — Full-Stack Web Developer | Experience & Resume',
    description:
      'Learn about Abdul Hameed, Full-Stack Web Developer at DE Media Solutions and WordPress Core Trac #66548 contributor.',
    images: ['/images/v5/about-workspace.jpg'],
  },
};

const CORE_SKILLS_GROUPS = [
  {
    category: 'CMS & Full-Stack E-Commerce',
    skills: [
      'WordPress Full-Stack Development & Customization',
      'Custom WordPress Plugins (Modular PHP & MySQL)',
      'Custom Post Types, JetEngine & Dynamic Directories',
      'Shopify Storefront Customization (Liquid Templates)',
      'WooCommerce & E-Commerce Architecture',
    ],
  },
  {
    category: 'Modern Web Applications & UI',
    skills: [
      'HTML, CSS & Modern JavaScript',
      'React & Next.js (App Router)',
      'TypeScript & Client/Server State',
      'Tailwind CSS & Bootstrap',
      'Responsive Multi-Device Architecture',
      'GSAP Motion & Interactive UI',
    ],
  },
  {
    category: 'Backend, AI Workflow & SEO',
    skills: [
      'PHP, MySQL & WordPress REST API / AJAX',
      'AI-Assisted Engineering (Cursor, Claude, Gemini, ChatGPT)',
      'Technical & On-Page SEO (Schema.org JSON-LD)',
      'Core Web Vitals & Asset Optimization',
      'Git, GitHub, Vercel & Playwright QA',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pt-28 pb-24 sm:pt-36">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          {/* 1. BALANCED PERSONAL INTRODUCTION & CREDENTIALS */}
          <section
            data-about-reveal
            className="mb-20 overflow-hidden rounded-3xl border border-[#12161F]/10 bg-white p-6 sm:p-10 lg:p-12"
          >
            {/* Balanced 2-Column Top Row (Equal Visual Weight — Zero Long-Tail Right Column) */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left Column (7 Cols): Bio + Clean 2-Button Action Row */}
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  <span>About &amp; Background</span>
                </p>

                <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl">
                  Hi, I’m Abdul Hameed.
                </h1>

                <p className="mt-4 text-base font-medium leading-relaxed text-[#12161F] sm:text-lg">
                  I design and engineer full-stack websites, custom PHP WordPress
                  plugins, Shopify storefronts, and Next.js web applications end
                  to end from frontend UI to backend logic.
                </p>

                <p className="mt-3.5 text-sm leading-relaxed text-stone-600 sm:text-base">
                  Every project in my portfolio was built across both frontend
                  interfaces and backend systems. To deliver complex features and
                  solve edge-case technical problems rapidly, I integrate modern
                  AI systems—including{' '}
                  <strong className="text-[#12161F]">
                    Cursor, Claude, Gemini, and ChatGPT
                  </strong>
                  —into my engineering workflow while maintaining strict human
                  architecture, code review, and cross-device quality control.
                </p>

                {/* Clean 2-Button Action Row (No Redundant Social Icons) */}
                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-stone-200/80 pt-6">
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-2 rounded-full bg-[#12161F] px-5 py-2.5 text-xs font-semibold text-[#F8F6F1] shadow-xs transition-colors hover:bg-[#C85A17] sm:text-sm"
                  >
                    <FileText
                      className="h-4 w-4 text-[#F59E6C]"
                      aria-hidden="true"
                    />
                    <span>View &amp; Print Résumé</span>
                  </Link>

                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full border border-[#12161F]/15 bg-[#F8F6F1] px-5 py-2.5 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#A84308] sm:text-sm"
                  >
                    <span>Selected Work</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#A84308]"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              {/* Right Column (5 Cols): Clean Studio Photography Frame (Zero Redundant Logo/Name/Role/Chip) */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[#12161F]/12 bg-[#EFECE4]/85 p-3 shadow-2xs sm:p-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#12161F]/10 bg-[#12161F] lg:aspect-[4/3]">
                    <Image
                      src="/images/v5/about-workspace.jpg"
                      alt="Editorial developer studio workspace with wireframe sketchbook and code editor"
                      fill
                      priority
                      sizes="(max-width: 1024px) 95vw, 460px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Credentials Strip (1 Column on Mobile & Tablet, 3 Columns on Desktop) */}
            <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-stone-200/80 pt-7 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#12161F]/10 bg-[#F8F6F1] p-4">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  Professional Experience
                </dt>
                <dd className="mt-1 font-display text-base font-bold text-[#12161F]">
                  {DEVELOPER_PROFILE.company}
                </dd>
                <dd className="mt-0.5 text-xs text-stone-600">
                  Full-Stack Web Development &amp; Custom Plugins
                </dd>
              </div>

              <div className="rounded-2xl border border-[#12161F]/10 bg-[#F8F6F1] p-4">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  Academic Background
                </dt>
                <dd className="mt-1 font-display text-base font-bold text-[#12161F]">
                  BS Computer Science
                </dd>
                <dd className="mt-0.5 text-xs text-stone-600">
                  Virtual University of Pakistan (Ongoing)
                </dd>
              </div>

              <div className="rounded-2xl border border-[#12161F]/10 bg-[#F8F6F1] p-4">
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  Open-Source &amp; Core Contributions
                </dt>
                <dd className="mt-1 font-display text-sm font-bold text-[#12161F]">
                  WordPress Core Trac #66548 (@
                  {DEVELOPER_PROFILE.wordpressHandle})
                </dd>
                <dd className="mt-0.5 text-xs text-stone-600">
                  12+ Public Repositories on GitHub
                </dd>
              </div>
            </dl>
          </section>

          {/* 2. WORKING PHILOSOPHY */}
          <section
            data-about-reveal
            aria-labelledby="values-heading"
            className="mb-20"
          >
            <div className="mb-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A84308]">
                Working Philosophy
              </p>
              <h2
                id="values-heading"
                className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-4xl"
              >
                Why Thoughtful Design &amp; Clean Engineering Matter
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-[#12161F]/10 bg-white p-7">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  Clarity First
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-[#12161F]">
                  Built for Real Visitors
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Visitors should understand what a website offers within
                  seconds and navigate information effortlessly without visual
                  clutter.
                </p>
              </div>

              <div className="rounded-2xl border border-[#12161F]/10 bg-white p-7">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  Responsive Precision
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-[#12161F]">
                  Smooth on Every Device
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Every interface is designed and tested across mobile, tablet,
                  and desktop viewports so typography, spacing, and interactions
                  stay balanced.
                </p>
              </div>

              <div className="rounded-2xl border border-[#12161F]/10 bg-white p-7">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  Long-Term Reliability
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-[#12161F]">
                  Easy to Maintain &amp; Extend
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Whether on WordPress, Shopify, or Next.js, I structure code
                  cleanly so content updates and future enhancements remain
                  straightforward.
                </p>
              </div>
            </div>
          </section>

          {/* 3. EXPERIENCE & EDUCATION */}
          <section
            data-about-reveal
            aria-labelledby="experience-heading"
            className="mb-20"
          >
            <div className="mb-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A84308]">
                Background &amp; Credentials
              </p>
              <h2
                id="experience-heading"
                className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-4xl"
              >
                Professional Experience &amp; Education
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Professional Experience Card */}
              <div className="rounded-2xl border border-[#12161F]/10 bg-white p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F6F1] text-[#A84308]">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                      Professional Experience
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#12161F]">
                      DE Media Solutions Pvt. Ltd.
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  Working professionally in web development, WordPress
                  customization, Shopify storefront tailoring, and frontend UI
                  implementation for client websites and digital platforms.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-[#12161F]/10 pt-4 text-sm text-stone-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]" />
                    <span>
                      Current CGPA: <strong className="text-[#12161F]">3.55 / 4.00</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]" />
                    <span>
                      Developing and customizing responsive WordPress websites
                      and dynamic content directories.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]" />
                    <span>
                      Building custom WordPress plugins for course comparison,
                      PDF export, and consultation booking.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]" />
                    <span>
                      Tailoring Shopify storefronts, improving mobile usability,
                      and implementing technical SEO foundations.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Education Card */}
              <div className="rounded-2xl border border-[#12161F]/10 bg-white p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8F6F1] text-[#12161F]">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-600">
                      University Education
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#12161F]">
                      Virtual University of Pakistan
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-stone-600">
                  Pursuing a{' '}
                  <strong className="text-[#12161F]">
                    Bachelor of Science in Computer Science (BSCS)
                  </strong>
                  , combining academic computer science foundations with
                  hands-on web engineering.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-[#12161F]/10 pt-4 text-sm text-stone-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]" />
                    <span>
                      Data Structures, Algorithms, and Object-Oriented
                      Programming.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]" />
                    <span>
                      Relational Database Management Systems (MySQL) and Web
                      Engineering.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]" />
                    <span>
                      Software Engineering Principles and Modern Application
                      Architecture.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. TECHNICAL CAPABILITIES & OPEN-SOURCE CONTRIBUTIONS */}
          <section
            id="recruiter-overview"
            data-about-reveal
            aria-labelledby="recruiter-heading"
            className="rounded-3xl border border-[#12161F]/15 bg-[#12161F] p-7 text-[#F8F6F1] sm:p-12"
          >
            <div className="mb-8 flex flex-col justify-between gap-6 border-b border-[#F8F6F1]/10 pb-8 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F59E6C]">
                  Technical Overview &amp; Open Source
                </p>
                <h2
                  id="recruiter-heading"
                  className="mt-2 font-display text-3xl font-bold text-[#F8F6F1] sm:text-4xl"
                >
                  Skills Matrix &amp; Ecosystem Contributions
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-[#F8F6F1]/75 sm:text-base">
                  A structured summary of my technical stack, public
                  repositories, and WordPress Core contribution.
                </p>
              </div>

              <div>
                <Link
                  href="/expertise"
                  className="inline-flex items-center gap-2 rounded-full bg-[#C85A17] px-5 py-2.5 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-[#A84308]"
                >
                  <span>Full Technical Expertise</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Skills Matrix (1 Column on Tablet, 3 Columns on Desktop) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {CORE_SKILLS_GROUPS.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-[#F8F6F1]/10 bg-[#1B212E] p-6"
                >
                  <h3 className="font-display text-lg font-bold text-[#F8F6F1]">
                    {group.category}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-xs text-[#F8F6F1]/80 sm:text-sm">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E6C]" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* WordPress Core Trac Highlight */}
            <div className="mt-8 rounded-2xl border border-[#F8F6F1]/10 bg-[#1B212E] p-6">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#F59E6C]">
                    <GitPullRequest className="h-4 w-4" />
                    <span>
                      WordPress Core Contribution · @
                      {DEVELOPER_PROFILE.wordpressHandle}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#F8F6F1]">
                    WordPress Core Trac Ticket #66548 — Guarded Plugin
                    Deactivation (Open Proposal)
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#F8F6F1]/75">
                    Submitted an open enhancement proposal on WordPress Core
                    Trac proposing a loopback health check after plugin
                    deactivation that restores a plugin’s active state if
                    deactivating it triggers a fatal error in dependent plugins.
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  <a
                    href={DEVELOPER_PROFILE.coreTracTicketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#C85A17] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#A84308]"
                  >
                    <span>View Ticket #66548</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={DEVELOPER_PROFILE.wordpressOrgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-white/10"
                  >
                    <span>WordPress.org (@codian)</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 5. PRODUCTION DELIVERY HIGHLIGHTS (1 Column on Tablet, 3 Columns on Desktop, Zero Redundant Top Chips, Zero Text Truncation) */}
          <section aria-labelledby="endorsements-heading" className="mt-20">
            <div className="mb-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A84308]">
                Selected Case Studies
              </p>
              <h2
                id="endorsements-heading"
                className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-4xl"
              >
                Production Delivery Highlights
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

                    <p className="mt-3 text-sm leading-relaxed text-stone-600">
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
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
