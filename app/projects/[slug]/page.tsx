import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  GitBranch,
  Plus,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import {
  getProjectBySlug,
  FEATURED_PROJECTS,
} from '@/lib/portfolio-data';
import { resolvePublicSiteOrigin } from '@/lib/site-config';
import DevicePreview from '@/components/DevicePreview';

const PLUGIN_SLUGS = new Set([
  'course-comparator-pro',
  'consultation-booking-pro',
]);

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  const canonicalPath = `/projects/${project.slug}`;

  return {
    title: `${project.title} — Case Study | Abdul Hameed`,
    description: project.tagline,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${project.title} — Case Study | Abdul Hameed`,
      description: project.tagline,
      url: canonicalPath,
      siteName: 'Abdul Hameed — Full-Stack Web Developer',
      locale: 'en_US',
      type: 'article',
      images: [
        {
          url: project.previewImage,
          width: 1440,
          height: 900,
          alt: `${project.title} — Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study | Abdul Hameed`,
      description: project.tagline,
      images: [project.previewImage],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isPlugin = PLUGIN_SLUGS.has(project.slug);

  // For plugins, primary action inspects the plugin source repository while secondary refers to the host site
  const primaryUrl = isPlugin
    ? project.githubUrl || project.primaryActionUrl || ''
    : project.primaryActionUrl || project.liveUrl || project.githubUrl || '';

  const primaryLabel = isPlugin
    ? 'Inspect Plugin Source (GitHub)'
    : project.primaryActionLabel ||
      (project.liveUrl ? 'Visit Live Website' : 'Inspect Source Repository');

  const relatedCaseStudies = (project.relatedCaseStudySlugs || [])
    .map((relSlug) => getProjectBySlug(relSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  // Secondary distinct destinations (excluding primaryUrl and githubUrl to avoid duplicate actions)
  const secondaryRoutes = (project.verifiedRoutes || []).filter((route) => {
    const cleanRoute = route.url.replace(/\/$/, '');
    const cleanPrimary = primaryUrl.replace(/\/$/, '');
    const cleanGithub = (project.githubUrl || '').replace(/\/$/, '');
    return cleanRoute !== cleanPrimary && cleanRoute !== cleanGithub;
  });

  // 4 "You might also like" projects
  const youMightAlsoLike = [
    ...relatedCaseStudies,
    ...FEATURED_PROJECTS.filter(
      (item) =>
        item.slug !== project.slug &&
        !relatedCaseStudies.some((rel) => rel.slug === item.slug)
    ),
  ].slice(0, 4);

  const siteUrl = resolvePublicSiteOrigin();
  const caseStudyUrl = `${siteUrl}/projects/${project.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': project.githubUrl ? 'SoftwareSourceCode' : 'CreativeWork',
        '@id': `${caseStudyUrl}#work`,
        name: project.title,
        headline: project.tagline,
        description: project.summary,
        image: `${siteUrl}${project.previewImage}`,
        author: {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: 'Abdul Hameed',
          url: siteUrl,
        },
        datePublished: `${project.year}-01-01`,
        url: primaryUrl || caseStudyUrl,
        mainEntityOfPage: caseStudyUrl,
        keywords: project.techStack.join(', '),
        ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${caseStudyUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${siteUrl}/projects`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: caseStudyUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <main id="main-content" className="pt-26 pb-20 sm:pt-34">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          {/* Top Breadcrumb Bar (No duplicate "Client Production Website" label) */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-600 transition-colors hover:text-[#A84308]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to All Projects</span>
            </Link>

            <div className="flex items-center gap-2 font-mono text-xs text-stone-600">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#12161F]">
                {project.year}
              </span>
            </div>
          </div>

          {/* 2-Column Top Split:
              Left Column (8 Cols): Interactive Hover Preview (or Plugin Workbench) + Overview + Build Scope + FAQ
              Right Column (4 Cols): Compact, In-Theme Sticky Card (100% fits in viewport) */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* LEFT COLUMN (8 Cols) */}
            <div className="lg:col-span-8">
              <section aria-label="Interactive Project Preview">
                <DevicePreview project={project} />
              </section>

              {/* Project Title & Status Header Directly Under Preview */}
              <header className="mt-8 border-b border-stone-200/90 pb-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-2xl font-bold tracking-tight text-[#12161F] sm:text-4xl">
                    {project.title}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C85A17]/30 bg-[#C85A17]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#A84308]">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isPlugin
                          ? 'bg-[#A84308]'
                          : project.liveUrl
                            ? 'bg-emerald-600'
                            : 'bg-[#A84308]'
                      }`}
                      aria-hidden="true"
                    />
                    <span>
                      {isPlugin
                        ? 'WP Plugin'
                        : project.liveUrl
                          ? 'Live'
                          : 'Open Source'}
                    </span>
                  </span>
                </div>

                <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-stone-600">
                  <span className="font-semibold text-[#12161F]">
                    {project.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.industry}</span>
                </p>
              </header>

              {/* Overview & Problem Solved */}
              <section className="mt-8 space-y-4">
                <h2 className="font-display text-xl font-bold text-[#12161F] sm:text-2xl">
                  Overview
                </h2>
                <p className="text-base font-medium leading-relaxed text-[#12161F]">
                  {project.tagline}
                </p>
                <p className="text-sm leading-relaxed text-stone-700 sm:text-base">
                  {project.problem}
                </p>
                <p className="text-sm leading-relaxed text-stone-600">
                  {project.businessOverview}
                </p>

                <ul className="mt-4 space-y-2.5 pt-2">
                  <li className="flex items-start gap-2.5 text-sm text-[#12161F]">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A84308]"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold">
                        Verified Outcome:
                      </strong>{' '}
                      {project.outcome}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-stone-700">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E6F50]"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-[#12161F]">
                        Engineering Approach:
                      </strong>{' '}
                      {project.approach}
                    </span>
                  </li>
                </ul>
              </section>

              {/* What I Personally Built & Key Functional Capabilities */}
              <section className="mt-10 border-t border-stone-200/80 pt-8">
                <h2 className="font-display text-xl font-bold text-[#12161F] sm:text-2xl">
                  What I Personally Built
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {project.whatIDelivered}
                </p>

                {project.personalBuildScope &&
                  project.personalBuildScope.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {project.personalBuildScope.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[#12161F]"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#A84308]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                <h3 className="mt-8 font-display text-lg font-bold text-[#12161F]">
                  Key Functional Capabilities
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {project.keyFeaturesPlain.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 rounded-xl border border-stone-200/90 bg-white p-3.5 text-xs font-medium leading-relaxed text-[#12161F]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E6F50]"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Connected Architecture Case Studies */}
              {relatedCaseStudies.length > 0 && (
                <section className="mt-10 border-t border-stone-200/80 pt-8">
                  <h2 className="font-display text-lg font-bold text-[#12161F]">
                    Connected Architecture Case Studies
                  </h2>
                  <p className="mt-1 text-xs text-stone-600">
                    {isPlugin
                      ? 'Inspect the host education portal and companion plugin connected to this module:'
                      : 'Standalone custom WordPress plugins and modules engineered for this deployment:'}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2.5">
                    {relatedCaseStudies.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/projects/${rel.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#C85A17]/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#A84308] transition-colors hover:border-[#C85A17] hover:bg-[#EFECE4]"
                      >
                        <span>{rel.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Technical FAQ / Architecture Accordion */}
              <section
                aria-labelledby="case-study-faq-heading"
                className="mt-10 border-t border-stone-200/80 pt-8"
              >
                <h2
                  id="case-study-faq-heading"
                  className="font-display text-xl font-bold text-[#12161F]"
                >
                  Technical Architecture &amp; FAQ
                </h2>

                <div className="mt-4 space-y-2.5">
                  <details className="group rounded-xl border border-[#12161F]/10 bg-white px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-[#12161F] sm:text-sm">
                      <span>
                        What architecture and technical stack power{' '}
                        {project.title}?
                      </span>
                      <Plus
                        className="h-4 w-4 shrink-0 text-[#A84308] transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="mt-3.5 border-t border-stone-100 pt-3.5 text-xs leading-relaxed text-stone-700">
                      <ul className="space-y-1.5">
                        {project.architectureNotes.map((note) => (
                          <li
                            key={note}
                            className="font-mono text-xs text-[#12161F]"
                          >
                            • {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>

                  <details className="group rounded-xl border border-[#12161F]/10 bg-white px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-[#12161F] sm:text-sm">
                      <span>
                        What were the key implementation points (
                        {project.technicalHighlights.length} engineering
                        highlights)?
                      </span>
                      <Plus
                        className="h-4 w-4 shrink-0 text-[#A84308] transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="mt-3.5 border-t border-stone-100 pt-3.5 text-xs leading-relaxed text-stone-700">
                      <ul className="space-y-2">
                        {project.technicalHighlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#A84308]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>

                  {project.challengesAndSolutions &&
                    project.challengesAndSolutions.length > 0 && (
                      <details className="group rounded-xl border border-[#12161F]/10 bg-white px-5 py-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-[#12161F] sm:text-sm">
                          <span>
                            How were key engineering challenges solved during
                            development?
                          </span>
                          <Plus
                            className="h-4 w-4 shrink-0 text-[#A84308] transition-transform duration-200 group-open:rotate-45"
                            aria-hidden="true"
                          />
                        </summary>
                        <div className="mt-3.5 space-y-3 border-t border-stone-100 pt-3.5 text-xs leading-relaxed text-stone-700">
                          {project.challengesAndSolutions.map((cs) => (
                            <div
                              key={cs.challenge}
                              className="rounded-lg bg-[#F8F6F1] p-3"
                            >
                              <p className="font-semibold text-[#12161F]">
                                Challenge: {cs.challenge}
                              </p>
                              <p className="mt-1 text-stone-700">
                                Solution: {cs.solution}
                              </p>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                </div>

                {/* Two Compact Bottom Cards Under FAQ */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#12161F]/10 bg-white p-5">
                    <h3 className="font-display text-sm font-bold text-[#12161F]">
                      Verified Production &amp; Code Proof
                    </h3>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-stone-600">
                      <li>• Authentic live deployment or public repository</li>
                      <li>
                        •{' '}
                        {isPlugin
                          ? 'Modular PHP WordPress plugin architecture'
                          : 'Multi-device interactive studio (1440px, 768px, 390px)'}
                      </li>
                      <li>• Personally engineered by Abdul Hameed</li>
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between rounded-2xl border border-[#12161F]/10 bg-[#EFECE4]/80 p-5 text-center">
                    <div>
                      <h3 className="font-display text-sm font-bold text-[#12161F]">
                        Building something similar?
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-stone-700">
                        Prepare a structured project brief with your goals,
                        scope, and timeline.
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12161F] px-4 py-2.5 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-[#C85A17]"
                    >
                      <span>Start a Project Brief</span>
                    </Link>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN (4 Cols): Compact, In-Theme Sticky Card (Project-Focused Only — Zero Redundant Chips or Personal Bio) */}
            <aside className="lg:sticky lg:top-24 lg:col-span-4">
              <div className="rounded-3xl border border-[#12161F]/12 bg-[#EFECE4]/85 p-5 shadow-[0_14px_34px_rgba(18,22,31,0.05)] sm:p-6">
                {/* Focused Project Action Buttons */}
                <div className="space-y-2">
                  {primaryUrl && (
                    <a
                      href={primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between rounded-full bg-[#12161F] py-2.5 pr-2.5 pl-4 text-xs font-semibold text-[#F8F6F1] shadow-xs transition-all hover:bg-[#C85A17]"
                    >
                      <span className="truncate pr-2">{primaryLabel}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F8F6F1] text-[#12161F]">
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </a>
                  )}

                  {/* Distinct Secondary Verified Routes (e.g., TJS Course Directory, or Live Host Site for Plugins) */}
                  {secondaryRoutes.map((route) => (
                    <a
                      key={route.url}
                      href={route.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between rounded-full border border-[#12161F]/15 bg-white px-4 py-2 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                    >
                      <span className="truncate">{route.label}</span>
                      <ExternalLink
                        className="h-3.5 w-3.5 shrink-0 text-[#A84308]"
                        aria-hidden="true"
                      />
                    </a>
                  ))}

                  {/* Secondary GitHub Source link if primary action is Live Website */}
                  {project.githubUrl && project.githubUrl !== primaryUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between rounded-full border border-[#12161F]/15 bg-white px-4 py-2 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                    >
                      <span>View Source Repository</span>
                      <GitBranch
                        className="h-3.5 w-3.5 shrink-0 text-[#A84308]"
                        aria-hidden="true"
                      />
                    </a>
                  )}

                  {project.secondaryGithubUrl && (
                    <a
                      href={project.secondaryGithubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-between rounded-full border border-[#12161F]/15 bg-white px-4 py-2 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                    >
                      <span>
                        {project.secondaryGithubLabel ||
                          'Secondary Plugin Source'}
                      </span>
                      <GitBranch
                        className="h-3.5 w-3.5 shrink-0 text-[#A84308]"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>

                {/* Compact 5-Row Metadata Table in a Clean Warm White Card */}
                <dl className="mt-4 space-y-2 rounded-2xl border border-[#12161F]/10 bg-white p-4 text-xs">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="shrink-0 text-stone-600">My Role</dt>
                    <dd className="text-right font-semibold text-[#12161F]">
                      {project.role}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-t border-stone-100 pt-2">
                    <dt className="shrink-0 text-stone-600">Client / Host</dt>
                    <dd className="text-right font-medium text-[#12161F]">
                      {project.shortTitle}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-t border-stone-100 pt-2">
                    <dt className="shrink-0 text-stone-600">Category</dt>
                    <dd className="text-right font-medium text-[#12161F]">
                      {project.category}
                    </dd>
                  </div>
                  <div className="flex items-start justify-between gap-3 border-t border-stone-100 pt-2">
                    <dt className="shrink-0 text-stone-600">Core Stack</dt>
                    <dd className="text-right font-mono text-[11px] font-semibold text-[#A84308]">
                      {project.techStack.slice(0, 3).join(' · ')}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-stone-100 pt-2">
                    <dt className="shrink-0 text-stone-600">Delivery</dt>
                    <dd className="font-semibold text-[#1E6F50]">
                      {isPlugin
                        ? 'Production WP Plugin'
                        : project.liveUrl
                          ? 'Live Production'
                          : 'Verified Open Source'}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>

          {/* "You might also like" Related Projects Grid (4 Compact Cards) */}
          <section
            aria-labelledby="you-might-also-like-heading"
            className="mt-20 border-t border-stone-200/90 pt-12"
          >
            <div className="flex items-center justify-between gap-4">
              <h2
                id="you-might-also-like-heading"
                className="font-display text-xl font-bold text-[#12161F] sm:text-2xl"
              >
                You might also like
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {youMightAlsoLike.map((item) => {
                const itemIsPlugin = PLUGIN_SLUGS.has(item.slug);
                return (
                  <article
                    key={item.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#12161F]/10 bg-white p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C85A17]/45 hover:shadow-[0_14px_32px_rgba(18,22,31,0.07)]"
                  >
                    <Link
                      href={`/projects/${item.slug}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-stone-200/80 bg-[#EFECE4]"
                    >
                      {itemIsPlugin ? (
                        <div className="flex h-full w-full flex-col justify-between bg-[#EFECE4] p-3 pt-10 text-[#12161F]">
                          <div className="rounded-md border border-[#12161F]/12 bg-white px-2 py-1 font-mono text-[9px] font-semibold text-[#12161F] truncate">
                            wp-content/plugins/{item.slug}
                          </div>
                          <div className="flex items-center gap-1.5 rounded-md bg-[#12161F] px-2 py-1.5 text-[10px] font-semibold text-[#F8F6F1]">
                            <Terminal className="h-3 w-3 text-[#F59E6C]" />
                            <span className="truncate">{item.shortTitle}</span>
                          </div>
                          <span className="font-mono text-[9px] font-semibold text-[#A84308]">
                            Host: tjsstudysteps.com →
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={item.desktopScreenshot}
                          alt={`${item.title} desktop preview`}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 23vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </Link>

                    <div className="flex flex-col gap-1 px-1.5 pt-2.5 pb-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-stone-600">
                          {itemIsPlugin ? 'Custom WP Plugin' : item.category}
                        </p>
                        <Link
                          href={`/projects/${item.slug}`}
                          prefetch={true}
                          aria-label={`View ${item.title} case study`}
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C85A17]/30 bg-[#C85A17]/10 text-[#A84308] transition-colors group-hover:bg-[#C85A17] group-hover:text-white"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>

                      <h3 className="font-display text-sm font-bold leading-snug text-[#12161F] group-hover:text-[#A84308]">
                        <Link href={`/projects/${item.slug}`} prefetch={true}>
                          {item.title}
                        </Link>
                      </h3>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-[#12161F]/15 bg-white px-5 py-2.5 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
              >
                <span>View All Projects</span>
              </Link>
            </div>
          </section>

          {/* Bottom Centered Editorial Archive Callout */}
          <section
            aria-labelledby="see-what-else-heading"
            className="mx-auto mt-16 max-w-2xl rounded-3xl border border-[#12161F]/10 bg-[#EFECE4]/75 px-6 py-12 text-center sm:px-12 sm:py-14"
          >
            <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A84308]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>More Case Studies</span>
            </p>

            <h2
              id="see-what-else-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl leading-[1.08]"
            >
              See what else is in the{' '}
              <span className="font-serif font-normal italic text-[#A84308]">
                archive.
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-stone-700 sm:text-sm">
              Every project includes verified architecture details, personal
              engineering scope, and live production or source links.
            </p>

            <div className="mt-7 flex justify-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#12161F] py-3 pr-3.5 pl-5 text-xs font-semibold text-[#F8F6F1] shadow-sm transition-all hover:bg-[#C85A17]"
              >
                <span>Browse more projects</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F8F6F1] text-[#12161F]">
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
