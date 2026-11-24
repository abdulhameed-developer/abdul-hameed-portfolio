import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Compass,
  FileCode2,
  FileText,
  FolderKanban,
  Globe,
  Layers,
  Terminal,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import {
  DEVELOPER_PROFILE,
  EXPERTISE_DOMAINS,
  FEATURED_PROJECTS,
  PLAYGROUND_EXPERIMENTS as PLAYGROUND_ITEMS,
  SERVICES_DATA as SERVICES,
} from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'Interactive Sitemap & Architectural Directory | Abdul Hameed',
  description:
    'Complete architectural index and interactive sitemap of Full-Stack Web Developer Abdul Hameed’s portfolio—covering primary pages, verified project case studies, client service offerings, interactive lab demos, and machine-readable AI/SEO endpoints.',
  alternates: {
    canonical: '/sitemap',
  },
  openGraph: {
    title: 'Interactive Sitemap & Architectural Directory | Abdul Hameed',
    description:
      'Complete architectural index and interactive sitemap of Full-Stack Web Developer Abdul Hameed’s portfolio.',
    url: '/sitemap',
    siteName: 'Abdul Hameed Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/screenshots/shawn-desktop.png',
        width: 1440,
        height: 900,
        alt: 'Interactive Sitemap & Directory — Abdul Hameed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Sitemap & Architectural Directory | Abdul Hameed',
    description:
      'Complete architectural index and interactive sitemap of Full-Stack Web Developer Abdul Hameed’s portfolio.',
    images: ['/screenshots/shawn-desktop.png'],
  },
};

const PRIMARY_PAGES = [
  {
    title: 'Home — Portfolio Overview',
    href: '/',
    badge: 'Primary Route',
    description:
      'Personal introduction, interactive technology marquee, featured work showcase, 4-step engineering workflow, capabilities, and approach.',
  },
  {
    title: 'Projects & Case Studies',
    href: '/projects',
    badge: '9 Verified Builds',
    description:
      'Filterable portfolio directory with live interactive device sandbox preview modals for production client sites, custom PHP WordPress plugins, and web apps.',
  },
  {
    title: 'Technical Expertise',
    href: '/expertise',
    badge: '4 Engineering Domains',
    description:
      'Deep technical breakdown across Full-Stack Web & Next.js, WordPress & Custom PHP Plugins, E-Commerce Storefronts, and AI-Assisted Velocity & Technical SEO.',
  },
  {
    title: 'About Abdul Hameed',
    href: '/about',
    badge: 'Biography & Credentials',
    description:
      `Background at ${DEVELOPER_PROFILE.company}, BS Computer Science at Virtual University of Pakistan, WordPress Core Trac #66548 contribution, and working philosophy.`,
  },
  {
    title: 'Services & Capabilities',
    href: '/services',
    badge: '6 Service Offerings',
    description:
      'End-to-end client services covering custom website development, WordPress & plugin engineering, Shopify/WooCommerce stores, SEO, and AI workflows.',
  },
  {
    title: 'Interactive Playground',
    href: '/playground',
    badge: '8 Live Sandboxes',
    description:
      'Full-stack and interactive JavaScript, WebAssembly, and WordPress/PHP experiments with live Multi-Device (Desktop / Tablet / Mobile) sandbox launch modals.',
  },
  {
    title: 'Contact & Project Brief Builder',
    href: '/contact',
    badge: 'Direct Inquiry',
    description:
      'Guided project scope and brief generator with one-click WhatsApp, email, and clipboard dispatch.',
  },
  {
    title: 'Printable Technical Résumé (A4)',
    href: '/resume',
    badge: 'Print / PDF Ready',
    description:
      'Clean A4 technical curriculum vitae detailing full-stack skills, production experience, open-source contributions, and academic background.',
  },
];

const MACHINE_READABLE_ENDPOINTS = [
  {
    title: 'XML Sitemap Index',
    path: '/sitemap.xml',
    format: 'application/xml',
    purpose:
      'Canonical search engine crawler index listing all primary routes, project case studies, and service detail pages with priority weights.',
  },
  {
    title: 'Crawler Directives',
    path: '/robots.txt',
    format: 'text/plain',
    purpose:
      'Search engine and AI answer-engine robot directives referencing the canonical XML sitemap.',
  },
  {
    title: 'LLM Concise Index',
    path: '/llms.txt',
    format: 'text/plain (Markdown)',
    purpose:
      'Structured plain-text portfolio summary following the llms.txt specification for AI assistants and answer engines.',
  },
  {
    title: 'LLM Full Portfolio Corpus',
    path: '/llms-full.txt',
    format: 'text/plain (Markdown)',
    purpose:
      'Complete technical documentation of all 9 project case studies, 6 services, stack matrices, and verified profile URLs.',
  },
  {
    title: 'A2A Agent Discovery Card',
    path: '/.well-known/agent.json',
    format: 'application/json',
    purpose:
      'Machine-readable developer capability manifest and contact discovery schema for autonomous agents.',
  },
];

export default function SitemapPage() {
  const totalRoutesCount =
    PRIMARY_PAGES.length +
    FEATURED_PROJECTS.length +
    SERVICES.length +
    MACHINE_READABLE_ENDPOINTS.length +
    1;

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pt-28 pb-20 sm:pt-34 sm:pb-28">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          {/* Top Editorial Header */}
          <header className="border-b border-stone-200/90 pb-10 sm:pb-14">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12161F]/12 bg-[#EFECE4] px-3.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A84308]">
                  <Compass className="h-3.5 w-3.5 text-[#C85A17]" aria-hidden="true" />
                  <span>Complete Portfolio Architecture · {totalRoutesCount} Indexed Routes</span>
                </span>

                <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl lg:text-6xl">
                  Interactive Sitemap
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
                  A structured human- and crawler-friendly directory of every
                  page, production project case study, client service offering,
                  interactive playground experiment, and machine-readable
                  discovery endpoint on{' '}
                  <span className="font-semibold text-[#12161F]">
                    {DEVELOPER_PROFILE.name}
                  </span>
                  ’s portfolio.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#12161F]/15 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-[#12161F] shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#C85A17] hover:text-[#A84308]"
                >
                  <FileCode2 className="h-3.5 w-3.5 text-[#A84308]" aria-hidden="true" />
                  <span>Raw XML (/sitemap.xml)</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[#12161F] px-5 py-2.5 text-xs font-semibold text-[#F8F6F1] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#C85A17]"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Quick Summary Stat Pills */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-2xl border border-stone-200/90 bg-white p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                  Primary Pages
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-[#12161F]">
                  {PRIMARY_PAGES.length} Core Routes
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200/90 bg-white p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                  Case Studies
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-[#12161F]">
                  {FEATURED_PROJECTS.length} Project Pages
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200/90 bg-white p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                  Client Services
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-[#12161F]">
                  {SERVICES.length} Dedicated Guides
                </p>
              </div>
              <div className="rounded-2xl border border-stone-200/90 bg-white p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                  AI &amp; Crawler Feeds
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-[#12161F]">
                  {MACHINE_READABLE_ENDPOINTS.length} Endpoints
                </p>
              </div>
            </div>
          </header>

          {/* SECTION 1: Primary Portfolio Routes */}
          <section
            aria-labelledby="sitemap-primary-heading"
            className="mt-14 border-b border-stone-200/90 pb-14"
          >
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFECE4] text-[#A84308]">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                    Top-Level Architecture
                  </p>
                  <h2
                    id="sitemap-primary-heading"
                    className="font-display text-2xl font-bold text-[#12161F] sm:text-3xl"
                  >
                    Primary Portfolio Pages
                  </h2>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {PRIMARY_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  prefetch={true}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C85A17]/50 hover:shadow-[0_16px_36px_rgba(18,22,31,0.06)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#EFECE4] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#A84308]">
                        {page.badge}
                      </span>
                      <span className="font-mono text-[11px] text-stone-400 group-hover:text-[#C85A17]">
                        {page.href}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-bold text-[#12161F] transition-colors group-hover:text-[#A84308]">
                      {page.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600">
                      {page.description}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#12161F] group-hover:text-[#A84308]">
                    <span>Open Page</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 2: Project Case Studies (All 9 Verified Builds) */}
          <section
            aria-labelledby="sitemap-projects-heading"
            className="mt-14 border-b border-stone-200/90 pb-14"
          >
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFECE4] text-[#A84308]">
                  <FolderKanban className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                    Case Study Directory · /projects/[slug]
                  </p>
                  <h2
                    id="sitemap-projects-heading"
                    className="font-display text-2xl font-bold text-[#12161F] sm:text-3xl"
                  >
                    Production Websites, Custom WP Plugins &amp; Web Apps
                  </h2>
                </div>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#A84308] hover:underline"
              >
                <span>View Full Interactive Directory</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {FEATURED_PROJECTS.map((project) => (
                <div
                  key={project.slug}
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C85A17]/50 hover:shadow-[0_16px_36px_rgba(18,22,31,0.06)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-[#C85A17]/25 bg-[#F8F6F1] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#A84308]">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-stone-500">
                        {project.year}
                      </span>
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      prefetch={true}
                      className="mt-3 block"
                    >
                      <h3 className="font-display text-lg font-bold text-[#12161F] transition-colors group-hover:text-[#A84308]">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600">
                      {project.summary}
                    </p>

                    <p className="mt-3 font-mono text-[10px] text-stone-500">
                      {project.techStack.slice(0, 4).join(' · ')}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      prefetch={true}
                      className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#12161F] transition-colors hover:text-[#A84308]"
                    >
                      <span>/projects/{project.slug}</span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#A84308] hover:underline"
                      >
                        <span>Live Site</span>
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Client Service Detail Pages (All 6 Services) */}
          <section
            aria-labelledby="sitemap-services-heading"
            className="mt-14 border-b border-stone-200/90 pb-14"
          >
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFECE4] text-[#A84308]">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                    Service Architecture · /services/[slug]
                  </p>
                  <h2
                    id="sitemap-services-heading"
                    className="font-display text-2xl font-bold text-[#12161F] sm:text-3xl"
                  >
                    Client Services &amp; Capabilities
                  </h2>
                </div>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#A84308] hover:underline"
              >
                <span>All Services Overview</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  prefetch={true}
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C85A17]/50 hover:shadow-[0_16px_36px_rgba(18,22,31,0.06)]"
                >
                  <div>
                    <span className="inline-flex rounded-full bg-[#EFECE4] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#A84308]">
                      {service.shortTitle}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-[#12161F] transition-colors group-hover:text-[#A84308]">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-600">
                      {service.benefitStatement}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 font-mono text-[11px] font-semibold text-[#12161F] group-hover:text-[#A84308]">
                    <span>/services/{service.slug}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* SECTION 4: Technical Expertise Domains & Interactive Playground Sandboxes */}
          <section
            aria-labelledby="sitemap-domains-lab-heading"
            className="mt-14 border-b border-stone-200/90 pb-14"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Left 5 Cols: Technical Expertise Pillars */}
              <div className="lg:col-span-5">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFECE4] text-[#A84308]">
                    <Code2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                      /expertise
                    </p>
                    <h2
                      id="sitemap-domains-lab-heading"
                      className="font-display text-xl font-bold text-[#12161F] sm:text-2xl"
                    >
                      Engineering Domains
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {EXPERTISE_DOMAINS.map((domain) => (
                    <Link
                      key={domain.id}
                      href="/expertise"
                      prefetch={true}
                      className="group block rounded-2xl border border-stone-200/90 bg-white p-4 transition-all hover:border-[#C85A17]/50"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#A84308]">
                          {domain.subtitle}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#A84308]" aria-hidden="true" />
                      </div>
                      <h3 className="mt-1 font-display text-base font-bold text-[#12161F] group-hover:text-[#A84308]">
                        {domain.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] text-stone-500">
                        {domain.technologies.slice(0, 5).join(' · ')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right 7 Cols: Interactive Playground Sandboxes */}
              <div className="lg:col-span-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFECE4] text-[#A84308]">
                      <Terminal className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                        /playground
                      </p>
                      <h2 className="font-display text-xl font-bold text-[#12161F] sm:text-2xl">
                        Interactive Lab &amp; Micro-App Sandboxes
                      </h2>
                    </div>
                  </div>

                  <Link
                    href="/playground"
                    className="font-mono text-xs font-semibold text-[#A84308] hover:underline"
                  >
                    Open Lab →
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PLAYGROUND_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-[#EFECE4] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#A84308]">
                            {item.category}
                          </span>
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-stone-600 hover:text-[#A84308]"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                        <h3 className="mt-2 font-display text-base font-bold text-[#12161F]">
                          {item.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-stone-600">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 font-mono text-[10px] text-stone-500">
                        <span>
                          {item.language} · {item.type}
                        </span>
                        <Link
                          href="/playground"
                          className="font-semibold text-[#12161F] hover:text-[#A84308]"
                        >
                          Launch in Sandbox →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: Search Engine & AI Discovery Feeds */}
          <section aria-labelledby="sitemap-machine-heading" className="mt-14">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFECE4] text-[#A84308]">
                <FileText className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A84308]">
                  SEO · AEO · GEO · Machine Discovery
                </p>
                <h2
                  id="sitemap-machine-heading"
                  className="font-display text-2xl font-bold text-[#12161F] sm:text-3xl"
                >
                  Search Crawler &amp; AI Agent Endpoints
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {MACHINE_READABLE_ENDPOINTS.map((endpoint) => (
                <a
                  key={endpoint.path}
                  href={endpoint.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#C85A17]/50 hover:shadow-sm"
                >
                  <div>
                    <span className="inline-flex rounded-full bg-[#EFECE4] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#A84308]">
                      {endpoint.format}
                    </span>
                    <h3 className="mt-3 font-display text-base font-bold text-[#12161F] group-hover:text-[#A84308]">
                      {endpoint.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                      {endpoint.purpose}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 font-mono text-xs font-semibold text-[#12161F] group-hover:text-[#A84308]">
                    <span>{endpoint.path}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
