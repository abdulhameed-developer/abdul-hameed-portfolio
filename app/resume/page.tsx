import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ResumePrintButton from '@/components/ResumePrintButton';
import { DEVELOPER_PROFILE, FEATURED_PROJECTS } from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'Resume & CV — Abdul Hameed | Full-Stack Web Developer',
  description:
    'Curriculum Vitae of Abdul Hameed — Full-Stack Web Developer in Lahore, Pakistan. Experience at DE Media Solutions, BSCS at VUP, custom WordPress plugins, Shopify storefronts, and Next.js applications.',
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: 'Resume & CV — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Curriculum Vitae of Abdul Hameed — Full-Stack Web Developer in Lahore, Pakistan.',
    url: '/resume',
    siteName: 'Abdul Hameed Portfolio',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: '/screenshots/shawn-desktop.png',
        width: 1440,
        height: 900,
        alt: 'Abdul Hameed — Full-Stack Web Developer Resume & CV',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume & CV — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Curriculum Vitae of Abdul Hameed — Full-Stack Web Developer in Lahore, Pakistan.',
    images: ['/screenshots/shawn-desktop.png'],
  },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F] print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main
        id="main-content"
        className="pb-24 pt-28 sm:pt-36 print:pb-0 print:pt-0"
      >
        <div className="mx-auto max-w-[1060px] px-4 sm:px-8 print:max-w-none print:px-0">
          {/* Top Action Bar (Hidden when printing to PDF) */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#12161F]/10 pb-5 print:hidden">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#12161F] transition-colors hover:text-[#C85A17]"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-[#C85A17]" />
              <span>Back to About</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <ResumePrintButton />
              <Link
                href="/contact?service=Recruiter%20%2F%20Hiring%20Opportunity"
                className="inline-flex items-center gap-2 rounded-lg border border-[#12161F]/15 bg-white px-4 py-3 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#C85A17] sm:text-sm"
              >
                <span>Contact for Roles &amp; Projects</span>
              </Link>
            </div>
          </div>

          {/* Printable Resume Sheet */}
          <article className="rounded-2xl border border-[#12161F]/12 bg-white p-7 shadow-[0_24px_60px_-24px_rgba(18,22,31,0.1)] sm:p-12 print:rounded-none print:border-0 print:p-4 print:shadow-none">
            {/* Resume Header */}
            <header className="border-b border-[#12161F]/12 pb-8">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                    Curriculum Vitae · Verified Technical Profile
                  </p>
                  <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl">
                    {DEVELOPER_PROFILE.name}
                  </h1>
                  <p className="mt-1.5 font-display text-lg font-semibold text-[#4B5262]">
                    Full-Stack Web Developer · Custom Plugins &amp; Web Applications
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-[#4B5262] sm:text-sm md:text-right">
                  <p className="flex items-center gap-2 md:justify-end">
                    <MapPin className="h-3.5 w-3.5 text-[#C85A17]" />
                    <span>{DEVELOPER_PROFILE.location}</span>
                  </p>
                  <p className="flex items-center gap-2 md:justify-end">
                    <Mail className="h-3.5 w-3.5 text-[#C85A17]" />
                    <a
                      href={`mailto:${DEVELOPER_PROFILE.email}`}
                      className="font-medium text-[#12161F] hover:text-[#C85A17]"
                    >
                      {DEVELOPER_PROFILE.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 md:justify-end">
                    <Phone className="h-3.5 w-3.5 text-[#C85A17]" />
                    <span>{DEVELOPER_PROFILE.whatsappDisplay}</span>
                  </p>
                  <p className="flex items-center gap-2 md:justify-end">
                    <Globe className="h-3.5 w-3.5 text-[#C85A17]" />
                    <a
                      href={DEVELOPER_PROFILE.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#12161F] hover:text-[#C85A17]"
                    >
                      github.com/{DEVELOPER_PROFILE.githubHandle}
                    </a>
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-4xl text-sm leading-relaxed text-[#4B5262] sm:text-base">
                Full-Stack Web Developer experienced in designing and
                engineering end-to-end production websites, custom PHP WordPress
                plugins, searchable Custom Post Type directories, tailored
                Shopify Liquid storefronts, and modern React, Next.js, and
                TypeScript web applications—leveraging AI tools (Cursor, Claude,
                Gemini, and ChatGPT) for accelerated problem-solving, technical
                SEO, and clean architecture.
              </p>
            </header>

            {/* Technical Stack Summary */}
            <section className="border-b border-[#12161F]/10 py-7 print:break-inside-avoid">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                Technical Skills &amp; Stack
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-4 print:bg-white">
                  <h3 className="font-display text-sm font-bold text-[#12161F]">
                    Full-Stack Web &amp; Next.js
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B5262]">
                    HTML, CSS, JavaScript, TypeScript, React, Next.js (App
                    Router), Tailwind CSS, Bootstrap, GSAP, Responsive
                    Multi-Device UI
                  </p>
                </div>
                <div className="rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-4 print:bg-white">
                  <h3 className="font-display text-sm font-bold text-[#12161F]">
                    CMS, Backend &amp; E-Commerce
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B5262]">
                    WordPress, Custom Plugin Architecture (PHP), MySQL,
                    WordPress REST API, AJAX, JetEngine CPTs, Shopify (Liquid),
                    WooCommerce, Elementor, Laravel (Working Familiarity)
                  </p>
                </div>
                <div className="rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-4 print:bg-white">
                  <h3 className="font-display text-sm font-bold text-[#12161F]">
                    AI Workflow, SEO &amp; QA
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B5262]">
                    Cursor, Claude, Gemini, ChatGPT, Technical SEO, Schema.org
                    JSON-LD, Core Web Vitals, Git, GitHub, Vercel, WebAssembly,
                    Playwright QA
                  </p>
                </div>
              </div>
            </section>

            {/* Professional Experience & Open Source */}
            <section className="border-b border-[#12161F]/10 py-7 print:break-inside-avoid">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                Professional Experience &amp; Open-Source Contributions
              </h2>

              <div className="mt-5 space-y-6">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-[#12161F]">
                      Full-Stack Web Developer —{' '}
                      {DEVELOPER_PROFILE.company}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-[#4B5262]">
                      Present
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-[#4B5262]">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C85A17]" />
                      <span>
                        Develop and customize production WordPress websites,
                        searchable Custom Post Type directories, and responsive
                        service platforms for domestic and international
                        clients.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C85A17]" />
                      <span>
                        Engineered and deployed two custom PHP WordPress
                        plugins on live client infrastructure:{' '}
                        <strong className="text-[#12161F]">
                          Course Comparator Pro
                        </strong>{' '}
                        with AJAX taxonomy mapping and server-side PDF export,
                        and{' '}
                        <strong className="text-[#12161F]">
                          Consultation Booking Pro
                        </strong>{' '}
                        with timezone-aware slot resolution and Google Calendar
                        sync.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C85A17]" />
                      <span>
                        Tailor Shopify Liquid templates and mobile merchandising
                        flows for luxury e-commerce storefronts and execute
                        technical &amp; local SEO optimizations.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#12161F]/8 pt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-[#12161F]">
                      WordPress Core Trac Contributor (@
                      {DEVELOPER_PROFILE.wordpressHandle}) — Open Proposal #66548
                    </h3>
                    <a
                      href={DEVELOPER_PROFILE.coreTracTicketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#C85A17] hover:underline"
                    >
                      <span>core.trac.wordpress.org/ticket/66548</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5262]">
                    Submitted an open WordPress Core enhancement proposal for
                    guarded plugin deactivation—proposing a loopback health
                    check after deactivating a plugin to restore its active
                    state if dependent plugins trigger a fatal error.
                  </p>
                </div>
              </div>
            </section>

            {/* Selected Production Projects & Web Applications */}
            <section className="border-b border-[#12161F]/10 py-7">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                Selected Production Projects &amp; Engineering Highlights
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {FEATURED_PROJECTS.slice(0, 6).map((project) => (
                  <div
                    key={project.id}
                    className="rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-4 print:break-inside-avoid print:bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-base font-bold text-[#12161F]">
                          {project.title}
                        </h3>
                        <p className="font-mono text-[11px] text-[#C85A17]">
                          {project.role} · {project.ownershipLabel || project.category}
                        </p>
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-mono text-[11px] font-semibold text-[#12161F] underline hover:text-[#C85A17] print:hidden"
                      >
                        Case Study
                      </Link>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#4B5262]">
                      {project.clientSummary}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-[#12161F]/75">
                      {project.techStack.slice(0, 5).join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Verified Profiles */}
            <section className="pt-7 print:break-inside-avoid">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                    Education
                  </h2>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#12161F]">
                    Bachelor of Science in Computer Science (BSCS)
                  </h3>
                  <p className="text-sm font-medium text-[#4B5262]">
                    Virtual University of Pakistan · Ongoing
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#4B5262]">
                    Coursework includes Data Structures &amp; Algorithms,
                    Object-Oriented Programming, Relational Database Management
                    Systems (MySQL), and Software Engineering.
                  </p>
                </div>

                <div>
                  <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                    Verified Profiles &amp; Portfolio
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs text-[#4B5262] sm:text-sm">
                    <li>
                      <strong className="text-[#12161F]">GitHub:</strong>{' '}
                      <a
                        href={DEVELOPER_PROFILE.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#C85A17]"
                      >
                        {DEVELOPER_PROFILE.githubUrl}
                      </a>{' '}
                      (12+ Public Repositories)
                    </li>
                    <li>
                      <strong className="text-[#12161F]">LinkedIn:</strong>{' '}
                      <a
                        href={DEVELOPER_PROFILE.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#C85A17]"
                      >
                        {DEVELOPER_PROFILE.linkedinUrl}
                      </a>
                    </li>
                    <li>
                      <strong className="text-[#12161F]">WordPress.org:</strong>{' '}
                      <a
                        href={DEVELOPER_PROFILE.wordpressOrgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#C85A17]"
                      >
                        {DEVELOPER_PROFILE.wordpressOrgUrl}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
