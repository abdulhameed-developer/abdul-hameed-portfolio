import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  Briefcase,
  ChevronDown,
  Palette,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import ServiceIllustration from '@/components/ServiceIllustration';
import { getServiceBySlug, getProjectBySlug, SERVICES_DATA } from '@/lib/portfolio-data';
import { resolvePublicSiteOrigin } from '@/lib/site-config';

const PLUGIN_SLUGS = new Set([
  'course-comparator-pro',
  'consultation-booking-pro',
]);

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  const canonicalPath = `/services/${service.slug}`;

  return {
    title: `${service.title} — Services | Abdul Hameed`,
    description: service.benefitStatement,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${service.title} — Services | Abdul Hameed`,
      description: service.benefitStatement,
      url: canonicalPath,
      siteName: 'Abdul Hameed — Full-Stack Web Developer',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: service.previewImage,
          width: 1200,
          height: 800,
          alt: `${service.title} — Abdul Hameed`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} — Services | Abdul Hameed`,
      description: service.benefitStatement,
      images: [service.previewImage],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES_DATA.filter((s) => s.slug !== service.slug);
  const relatedProjects = (service.relatedProjectSlugs || [])
    .map((projSlug) => getProjectBySlug(projSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const siteUrl = resolvePublicSiteOrigin();
  const serviceUrl = `${siteUrl}/services/${service.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${serviceUrl}#service`,
        name: service.title,
        description: service.overview,
        url: serviceUrl,
        provider: {
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          name: 'Abdul Hameed',
          url: siteUrl,
        },
        areaServed: 'Worldwide',
        serviceType: service.title,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${serviceUrl}#breadcrumb`,
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
            name: 'Services',
            item: `${siteUrl}/services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.title,
            item: serviceUrl,
          },
        ],
      },
    ],
  };
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <main id="main-content" className="pt-28 pb-24 sm:pt-36">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4A5262] transition-colors hover:text-[#C85A17]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Services
            </Link>
          </div>

          {/* Hero Header */}
          <header className="mb-14 grid grid-cols-1 gap-8 border-b border-[#12161F]/10 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full border border-[#12161F]/15 bg-[#EFECE4] px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#12161F]">
                  Client Service
                </span>
                <span className="font-mono text-xs text-[#C85A17]">{service.shortTitle}</span>
              </div>

              <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-[-0.03em] text-[#12161F] leading-[1.04]">
                {service.title}
              </h1>

              <p className="mt-5 max-w-[64ch] text-lg leading-relaxed text-[#4A5262] sm:text-xl">
                {service.benefitStatement}
              </p>
              <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-[#4A5262]">
                {service.heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#12161F] px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#F8F6F1] transition-all hover:bg-[#C85A17]"
              >
                Discuss This Service
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <p className="font-mono text-[11px] text-[#767F91]">
                Direct personal response · Remote Worldwide
              </p>
            </div>
          </header>

          {/* Service Visual Architecture & Core Value */}
          <section className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-6">
              <div className="rounded-3xl border border-[#12161F]/10 bg-white p-6 sm:p-8">
                <ServiceIllustration slug={service.slug} />
              </div>

              <div className="rounded-3xl border border-[#12161F]/10 bg-white p-7 sm:p-9">
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C85A17]">
                  <Sparkles className="h-4 w-4" />
                  Overview
                </div>
                <h2 className="font-display text-2xl font-bold text-[#12161F]">
                  How This Helps Your Business
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#4A5262]">{service.overview}</p>
              </div>

              <div className="rounded-3xl border border-[#1E6F50]/20 bg-[#1E6F50]/[0.04] p-7 sm:p-9">
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1E6F50]">
                  <ShieldCheck className="h-4 w-4" />
                  Ideal For
                </div>
                <h2 className="font-display text-2xl font-bold text-[#12161F]">
                  Who This Service Is Built For
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.whoItIsFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#12161F]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1E6F50]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-[#12161F]/10 bg-[#EFECE4]/60 p-7 sm:p-9 lg:col-span-6">
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12161F]">
                <Layers className="h-4 w-4 text-[#C85A17]" />
                Scope of Work
              </div>
              <h2 className="font-display text-2xl font-bold text-[#12161F]">
                What Is Included &amp; Delivered
              </h2>

              <div className="mt-6 space-y-4">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3.5 rounded-2xl border border-[#12161F]/8 bg-white p-4 text-sm text-[#12161F]"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C85A17]" />
                    <span className="font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-[#12161F]/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#767F91]">
                  Problems Solved
                </p>
                <ul className="mt-3 space-y-2.5">
                  {service.problemsSolved.map((prob) => (
                    <li key={prob} className="flex items-start gap-2.5 text-xs text-[#4A5262]">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C85A17]" />
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-[#12161F]/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#767F91]">
                  Core Capabilities
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full border border-[#12161F]/12 bg-white px-3.5 py-1.5 font-mono text-xs text-[#12161F]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Service Workflow Steps & Common Questions */}
          <section className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-3xl border border-[#12161F]/10 bg-white p-7 sm:p-9 lg:col-span-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C85A17]">
                Execution Workflow
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#12161F]">
                How We Deliver {service.shortTitle}
              </h2>
              <div className="mt-6 space-y-4">
                {service.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="rounded-2xl border border-[#12161F]/8 bg-[#F8F6F1] p-4"
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#C85A17]">
                      Step {step.step}
                    </span>
                    <h3 className="mt-1 font-display text-base font-bold text-[#12161F]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#4A5262]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#12161F]/10 bg-white p-7 sm:p-9 lg:col-span-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C85A17]">
                Service FAQ
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#12161F]">
                Common Questions About {service.shortTitle}
              </h2>
              <div className="mt-6 space-y-3">
                {service.faqs.map((faq, idx) => (
                  <details
                    key={faq.question}
                    open={idx === 0}
                    className="group rounded-2xl border border-[#12161F]/10 bg-[#F8F6F1] p-5"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-bold text-[#12161F]">
                      <span>{faq.question}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#C85A17] transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 border-t border-[#12161F]/10 pt-3 text-xs leading-relaxed text-[#4A5262]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Exclusive Graphic Design Creative Samples */}
          {service.creativeSamples && service.creativeSamples.length > 0 && (
            <section className="mb-16 rounded-3xl border border-[#12161F]/10 bg-white p-7 sm:p-10">
              <div className="mb-8">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C85A17]">
                  <Palette className="h-4 w-4" />
                  Original Studio Demonstration Concepts
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-3xl">
                  Digital Creative Formats &amp; Campaign Visuals
                </h2>
                <p className="mt-1 text-sm text-[#4A5262]">
                  {service.sampleLabel || 'Original portfolio demonstration concepts illustrating promotional banners and social visuals.'}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {service.creativeSamples.map((sample) => (
                  <div
                    key={sample.title}
                    className="flex flex-col justify-between rounded-2xl border border-[#12161F]/10 bg-[#F8F6F1] p-6"
                  >
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C85A17]">
                        {sample.type}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold text-[#12161F]">
                        {sample.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#4A5262]">
                        {sample.description}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#12161F]/10 pt-3">
                      {sample.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white px-2.5 py-1 font-mono text-[10px] text-[#12161F]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Demonstrated in Portfolio Projects (Real Case Study Proof) */}
          {relatedProjects.length > 0 && (
            <section className="mb-16 rounded-3xl border border-[#12161F]/10 bg-white p-7 sm:p-10">
              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#12161F]/10 pb-6 sm:flex-row sm:items-end">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C85A17]">
                    <Briefcase className="h-4 w-4" />
                    Production Evidence
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-3xl">
                    Demonstrated in Portfolio Case Studies
                  </h2>
                  <p className="mt-1 text-sm text-[#4A5262]">
                    Inspect real production websites and systems where I delivered this capability.
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#12161F] transition-colors hover:text-[#C85A17]"
                >
                  All 9 Case Studies
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((project) => {
                  const isPlugin = PLUGIN_SLUGS.has(project.slug);
                  return (
                  <article
                    key={project.slug}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#12161F]/10 bg-[#F8F6F1] transition-all hover:-translate-y-1 hover:border-[#12161F]/25 hover:bg-white hover:shadow-md"
                  >
                    <div>
                      <Link
                        href={`/projects/${project.slug}`}
                        prefetch={true}
                        className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#12161F]/10 bg-[#EFECE4]"
                      >
                        {isPlugin ? (
                          <div className="flex h-full w-full flex-col justify-between bg-[#EFECE4] p-4 text-[#12161F]">
                            <div className="flex items-center justify-between gap-2 rounded-lg border border-[#12161F]/12 bg-white px-3 py-1.5 font-mono text-[10px] font-semibold">
                              <span>plugins/{project.slug}.php</span>
                              <span className="text-[#A84308]">PHP</span>
                            </div>
                            <div className="rounded-xl border border-[#12161F]/10 bg-[#12161F] p-3 text-[#F8F6F1]">
                              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#F59E6C]">
                                Functional WordPress Plugin
                              </p>
                              <p className="mt-1 font-display text-xs font-bold">
                                {project.shortTitle}
                              </p>
                            </div>
                            <div className="flex items-center justify-between font-mono text-[9px] font-semibold text-stone-700">
                              <span>Host Site: tjsstudysteps.com</span>
                              <span className="text-[#A84308]">Plugin Blueprint →</span>
                            </div>
                          </div>
                        ) : (
                          <Image
                            src={project.previewImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </Link>
                      <div className="p-5">
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C85A17]">
                          {project.ownershipLabel || project.category}
                        </span>
                        <h3 className="mt-1.5 font-display text-xl font-bold text-[#12161F]">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="transition-colors group-hover:text-[#C85A17]"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#4A5262]">
                          {project.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-[#12161F]/8 px-5 py-3.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        prefetch={true}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.13em] text-[#12161F] transition-colors group-hover:text-[#C85A17]"
                      >
                        Inspect Case Study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Other Services Navigation with Full Descriptive Titles */}
          <section className="mt-16 border-t border-[#12161F]/10 pt-12">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#767F91]">
                  Explore Related Capabilities
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-[#12161F]">
                  Other Digital Services
                </h2>
              </div>
              <Link
                href="/services"
                className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#C85A17] hover:underline"
              >
                Compare All 6 Services →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#12161F]/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#C85A17]/50 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#EFECE4] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12161F]">
                        {other.shortTitle}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#767F91] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C85A17]" />
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-[#12161F] group-hover:text-[#C85A17]">
                      {other.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#4A5262]">
                      {other.benefitStatement}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-[#12161F] group-hover:text-[#C85A17]">
                    View Service Details →
                  </span>
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
