'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  ExternalLink,
  FileSpreadsheet,
  GitBranch,
  Search,
  Wrench,
  X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ThemedSelect, { ThemedSelectOption } from '@/components/ThemedSelect';
import {
  FEATURED_PROJECTS,
  ProjectItem,
  filterProjectsByCategory,
} from '@/lib/portfolio-data';

const SORT_OPTIONS: ThemedSelectOption[] = [
  {
    value: 'featured',
    label: 'Featured Highlights',
  },
  {
    value: 'client-live',
    label: 'Live Client Websites',
  },
  {
    value: 'engineering',
    label: 'Web Apps & Plugins',
  },
  {
    value: 'alphabetical',
    label: 'Alphabetical (A–Z)',
  },
];

const BROWSE_BY_BUILDING_LINKS: {
  label: string;
  href: string;
}[] = [
  {
    label: 'Business & Service Websites with Custom Booking',
    href: '/projects/shawn-salon',
  },
  {
    label: 'Custom PHP WordPress Plugins & Admin Modules',
    href: '/projects/course-comparator-pro',
  },
  {
    label: 'Luxury E-Commerce & Tailored Shopify Storefronts',
    href: '/projects/kamdani-by-rana',
  },
  {
    label: 'Searchable Course Directories & Education Portals',
    href: '/projects/tjs-studysteps',
  },
  {
    label: 'Next.js, React & TypeScript Web Applications',
    href: '/projects/boxpad-chat-dashboard',
  },
  {
    label: 'AI-Assisted SEO & Client-Side Media Utilities',
    href: '/projects/pakseo-ai',
  },
  {
    label: 'In-Browser WebAssembly Media Compression Suite',
    href: '/projects/filecompresser',
  },
  {
    label: 'Timezone-Aware Consultation & Lead Capture Flows',
    href: '/projects/consultation-booking-pro',
  },
  {
    label: 'Full Service Breakdown & Custom Project Scopes',
    href: '/services',
  },
];

const PLUGIN_SLUGS = new Set([
  'course-comparator-pro',
  'consultation-booking-pro',
]);

function isWordPressPluginProject(project: ProjectItem): boolean {
  return PLUGIN_SLUGS.has(project.slug);
}

function formatCompactTech(techStack: string[]): string {
  return techStack
    .slice(0, 2)
    .map((t) =>
      t
        .replace('Next.js (App Router)', 'Next.js')
        .replace('WordPress Plugin API', 'WP Plugin API')
    )
    .join(' / ');
}

function PluginCardBlueprint({ project }: { project: ProjectItem }) {
  const isComparator = project.slug === 'course-comparator-pro';
  const pluginFile = isComparator
    ? 'plugins/course-comparator-pro.php'
    : 'plugins/consultation-booking-pro.php';
  const stackTag = 'WordPress · PHP';
  const modules = isComparator
    ? [
        {
          icon: Database,
          title: 'JetEngine Taxonomy Mapper',
          tag: 'Meta Binding',
        },
        {
          icon: FileSpreadsheet,
          title: 'Side-by-Side Course Matrix',
          tag: 'Multi-Attribute',
        },
        {
          icon: Code2,
          title: 'Server-Side PDF Generator',
          tag: 'DOMPDF Export',
        },
      ]
    : [
        {
          icon: Wrench,
          title: 'Asia/Singapore Slot Resolver',
          tag: 'UTC+8 Lookup',
        },
        {
          icon: Database,
          title: 'WordPress AJAX Validator',
          tag: 'Nonce Security',
        },
        {
          icon: Code2,
          title: 'Google Calendar API Sync',
          tag: 'Auto-Booking',
        },
      ];

  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#EFECE4] p-3.5 pt-11 text-[#12161F]">
      {/* Plugin Package Path Header */}
      <div className="flex items-center justify-between gap-2 rounded-lg border border-[#12161F]/12 bg-white px-2.5 py-1.5 shadow-2xs">
        <span className="font-mono text-[10px] font-semibold text-[#12161F]">
          {pluginFile}
        </span>
        <span className="shrink-0 rounded bg-[#C85A17]/12 px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#A84308]">
          {stackTag}
        </span>
      </div>

      {/* Functional Module Stack */}
      <div className="my-auto space-y-1.5 py-1.5">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.title}
              className="flex items-center justify-between gap-2 rounded-lg border border-[#12161F]/10 bg-[#F8F6F1] px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#12161F] text-[#F8F6F1]">
                  <Icon className="h-3 w-3 text-[#F59E6C]" aria-hidden="true" />
                </span>
                <span className="font-display text-[11px] font-bold text-[#12161F]">
                  {mod.title}
                </span>
              </div>
              <span className="shrink-0 rounded border border-[#12161F]/10 bg-white px-1.5 py-0.5 font-mono text-[9px] font-medium text-stone-700">
                {mod.tag}
              </span>
            </div>
          );
        })}
      </div>

      {/* Host Platform Reference Strip */}
      <div className="flex items-center justify-between border-t border-[#12161F]/10 pt-1.5 font-mono text-[9px] font-semibold text-stone-700">
        <span>Host Site: tjsstudysteps.com</span>
        <span className="text-[#A84308]">Plugin Architecture →</span>
      </div>
    </div>
  );
}

export default function AllProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    const base = filterProjectsByCategory(
      FEATURED_PROJECTS,
      'All Projects',
      searchQuery
    );
    const list = [...base];

    if (sortBy === 'client-live') {
      list.sort((a, b) => {
        const aScore =
          a.category === 'Business Websites' || a.category === 'Online Stores'
            ? 2
            : a.liveUrl
              ? 1
              : 0;
        const bScore =
          b.category === 'Business Websites' || b.category === 'Online Stores'
            ? 2
            : b.liveUrl
              ? 1
              : 0;
        return bScore - aScore;
      });
    } else if (sortBy === 'engineering') {
      list.sort((a, b) => {
        const aScore =
          a.category === 'WordPress Solutions' ||
          a.category === 'Web Applications' ||
          a.category === 'Tools & Experiments'
            ? 2
            : a.githubUrl
              ? 1
              : 0;
        const bScore =
          b.category === 'WordPress Solutions' ||
          b.category === 'Web Applications' ||
          b.category === 'Tools & Experiments'
            ? 2
            : b.githubUrl
              ? 1
              : 0;
        return bScore - aScore;
      });
    } else if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [searchQuery, sortBy]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('[data-project-card]');
    if (!cards.length) return;

    const tween = gsap.fromTo(
      cards,
      { y: 10, opacity: 0.65 },
      {
        y: 0,
        opacity: 1,
        duration: 0.25,
        stagger: 0.025,
        ease: 'power2.out',
        overwrite: 'auto',
        clearProps: 'transform,opacity',
      }
    );

    return () => {
      tween.kill();
    };
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          {/* Editorial Library Header */}
          <header className="mb-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A84308]">
              Selected Work &amp; Case Studies
            </p>

            <div className="mt-2.5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-[#12161F] sm:text-5xl lg:text-[3.35rem] leading-[1.06]">
                Projects &amp; case studies,{' '}
                <span className="font-serif font-normal italic text-[#A84308]">
                  one archive.
                </span>
              </h1>

              <p className="max-w-md text-sm leading-relaxed text-stone-600">
                Production websites, custom PHP WordPress plugins, Shopify
                storefronts, and web applications—engineered end to end from
                frontend interfaces to backend systems.
              </p>
            </div>
          </header>

          {/* Clean Studio Control Bar: Label on Left, Search + Sort on Right */}
          <section
            aria-label="Search and sort projects"
            className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#12161F]/10 bg-[#EFECE4]/90 px-4 py-3 shadow-2xs sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-sm font-bold text-[#12161F] sm:text-base">
                All Projects
              </h2>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-stone-500"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects or stack..."
                  aria-label="Search projects"
                  className="w-full rounded-xl border border-[#12161F]/15 bg-white py-2 pr-8 pl-9 text-xs font-medium text-[#12161F] shadow-2xs placeholder:text-stone-500 focus:border-[#C85A17] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-stone-500 hover:text-[#12161F]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* External "Sort:" Label + Minimal Dropdown */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="projects-sort-select"
                  className="shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-600"
                >
                  Sort:
                </label>
                <div className="w-full sm:w-48">
                  <ThemedSelect
                    id="projects-sort-select"
                    value={sortBy}
                    options={SORT_OPTIONS}
                    onChange={setSortBy}
                    compact
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3-Column Compact Projects Gallery Grid */}
          <div ref={gridRef}>
            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
                <p className="font-display text-2xl font-bold text-[#12161F]">
                  No matching projects found
                </p>
                <p className="mt-2 text-sm text-stone-600">
                  Try clearing your search query.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSortBy('featured');
                  }}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#12161F] px-5 py-2.5 text-xs font-semibold text-white"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, idx) => {
                  const isPlugin = isWordPressPluginProject(project);

                  return (
                    <article
                      key={project.id}
                      data-project-card
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#12161F]/10 bg-white p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C85A17]/45 hover:shadow-[0_14px_32px_rgba(18,22,31,0.07)]"
                    >
                      {/* Compact 16:10 Visual Thumbnail Container with 3D Layered Card Fan Hover Effect (Zero Overlaid Chips) */}
                      <Link
                        href={`/projects/${project.slug}`}
                        aria-label={`Inspect ${project.title} case study`}
                        className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-[#12161F]"
                      >
                        {isPlugin ? (
                          <PluginCardBlueprint project={project} />
                        ) : (
                          <div className="relative flex h-full w-full items-center justify-center p-2.5 [perspective:900px]">
                            {/* Ambient Terracotta Radial Glow on Hover */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(200,90,23,0.32),transparent_70%)] opacity-45 transition-opacity duration-500 group-hover:opacity-100"
                            />

                            {/* Left Peeking Fan Card (Fanned out smoothly on Hover) */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute h-[82%] w-[72%] -translate-x-4 translate-y-1.5 -rotate-3 scale-[0.92] overflow-hidden rounded-lg border border-white/15 bg-[#1B2230] opacity-65 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-10 group-hover:translate-y-1 group-hover:-rotate-7 group-hover:scale-[0.94] group-hover:opacity-90"
                            >
                              <Image
                                src={
                                  project.mobileScreenshot &&
                                  project.mobileScreenshot !==
                                    project.desktopScreenshot
                                    ? project.mobileScreenshot
                                    : project.desktopScreenshot
                                }
                                alt=""
                                fill
                                sizes="220px"
                                className="object-cover object-top opacity-70 brightness-75"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Right Peeking Fan Card (Fanned out smoothly on Hover) */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute h-[82%] w-[72%] translate-x-4 translate-y-1.5 rotate-3 scale-[0.92] overflow-hidden rounded-lg border border-white/15 bg-[#1B2230] opacity-65 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-10 group-hover:translate-y-1 group-hover:rotate-7 group-hover:scale-[0.94] group-hover:opacity-90"
                            >
                              <Image
                                src={project.desktopScreenshot}
                                alt=""
                                fill
                                sizes="220px"
                                className="object-cover object-bottom opacity-70 brightness-75"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Front Primary Screen Card (Tilted slightly at rest, levels & elevates on Hover) */}
                            <div className="relative z-10 h-[92%] w-[87%] translate-x-1 -rotate-1 overflow-hidden rounded-lg border border-white/25 bg-[#0D111A] shadow-[0_18px_40px_rgba(0,0,0,0.65)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:-translate-y-0.5 group-hover:rotate-0 group-hover:scale-[1.03] group-hover:border-[#F59E6C]/65">
                              <Image
                                src={project.desktopScreenshot}
                                alt={`${project.title} desktop preview`}
                                fill
                                priority={idx < 3}
                                sizes="(max-width: 640px) 94vw, (max-width: 1024px) 46vw, 31vw"
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                referrerPolicy="no-referrer"
                              />

                              {/* Compact Mobile Companion Preview Inset for Websites & Web Apps */}
                              {project.mobileScreenshot &&
                                project.mobileScreenshot !==
                                  project.desktopScreenshot && (
                                  <div className="pointer-events-none absolute right-2 bottom-1.5 h-[56%] w-[21%] min-w-[44px] max-w-[68px] overflow-hidden rounded-md border border-white/40 bg-white shadow-xl transition-transform duration-300 group-hover:-translate-y-0.5">
                                    <Image
                                      src={project.mobileScreenshot}
                                      alt={`${project.title} mobile preview`}
                                      fill
                                      sizes="76px"
                                      className="object-cover object-top"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
                      </Link>

                      {/* Card Inner Content — Short Category Next to Action Icons, Full Title & Stack in Content Body */}
                      <div className="flex flex-col gap-1 px-2 pt-2.5 pb-1.5">
                        {/* Row 1: Category on Left, Circular Action Icons on Right */}
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-stone-600">
                            {isPlugin ? 'Custom WP Plugin' : project.category}
                          </p>

                          {/* Compact Icon-Only Action Cluster (32x32px Touch Targets) */}
                          <div className="flex shrink-0 items-center gap-1.5">
                            {isPlugin && project.githubUrl ? (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} plugin source on GitHub`}
                                title="Inspect Plugin Source on GitHub"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200/90 bg-[#F8F6F1] text-stone-700 transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                              >
                                <GitBranch
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </a>
                            ) : project.liveUrl ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={
                                  project.slug === 'tjs-studysteps'
                                    ? `Visit ${project.title} Main Portal`
                                    : `Visit ${project.title} live website`
                                }
                                title={
                                  project.slug === 'tjs-studysteps'
                                    ? 'Visit Main Portal'
                                    : 'Visit Live Site'
                                }
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200/90 bg-[#F8F6F1] text-stone-700 transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                              >
                                <ExternalLink
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </a>
                            ) : project.githubUrl ? (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} source on GitHub`}
                                title="View Source on GitHub"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200/90 bg-[#F8F6F1] text-stone-700 transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                              >
                                <GitBranch
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </a>
                            ) : null}

                            <Link
                              href={`/projects/${project.slug}`}
                              prefetch={true}
                              aria-label={`Open ${project.title} case study`}
                              title="View Case Study"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#C85A17]/30 bg-[#C85A17]/10 text-[#A84308] transition-colors group-hover:border-[#C85A17] group-hover:bg-[#C85A17] group-hover:text-white"
                            >
                              <ArrowUpRight
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            </Link>
                          </div>
                        </div>

                        {/* Row 2: 100% Full-Width Project Title */}
                        <h3 className="font-display text-[15px] font-bold leading-snug tracking-tight text-[#12161F] transition-colors group-hover:text-[#A84308]">
                          <Link
                            href={`/projects/${project.slug}`}
                            prefetch={true}
                          >
                            {project.title}
                          </Link>
                        </h3>

                        {/* Row 3: Technology Stack Inside Inner Content Body */}
                        <p className="mt-1 font-mono text-[10px] font-semibold text-[#A84308]">
                          {formatCompactTech(project.techStack)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* "Browse by what you are building" Index Section — Direct Case Study & Service Navigation */}
          <section
            aria-labelledby="browse-by-building-heading"
            className="mt-16 border-t border-stone-200/90 pt-10"
          >
            <h2
              id="browse-by-building-heading"
              className="font-display text-lg font-bold tracking-tight text-[#12161F] sm:text-xl"
            >
              Browse by what you are building
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {BROWSE_BY_BUILDING_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 border-b border-stone-200/80 py-3.5 text-xs font-medium text-stone-700 transition-colors hover:border-[#C85A17]/50 hover:text-[#12161F]"
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-stone-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#A84308]"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
