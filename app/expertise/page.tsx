'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ChevronDown,
  FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import HorizontalScrollStrip from '@/components/HorizontalScrollStrip';
import {
  EXPERTISE_DOMAINS,
  PROCESS_STAGES,
} from '@/lib/portfolio-data';

export default function ExpertisePage() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
          {/* Page Header — Skills First */}
          <header className="mb-16 border-b border-[#12161F]/10 pb-12">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
              Technical Capabilities &amp; Stack
            </p>

            <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-[#12161F] sm:text-6xl">
                  Technical Expertise &amp; Architecture
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4B5262] sm:text-lg">
                  A focused look at the full-stack engineering disciplines,
                  backend/frontend languages, and AI-assisted workflows (Cursor,
                  Claude, Gemini, and ChatGPT) behind my production WordPress
                  plugins, Shopify storefronts, and Next.js applications.
                </p>
              </div>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 self-start rounded-lg border border-[#12161F]/15 bg-white px-5 py-3 text-xs font-semibold text-[#12161F] transition-colors hover:border-[#C85A17] hover:text-[#C85A17] sm:text-sm lg:self-auto"
              >
                <FileText className="h-4 w-4 text-[#C85A17]" />
                <span>View Printable Resume (PDF)</span>
              </Link>
            </div>
          </header>

          {/* 1. FOUR CORE TECHNICAL DOMAINS (NO PROJECT GALLERY CARDS) */}
          <section aria-labelledby="pillars-heading" className="mb-24 space-y-8">
            <h2 id="pillars-heading" className="sr-only">
              Core Engineering Domains
            </h2>

            {EXPERTISE_DOMAINS.map((domain) => (
              <article
                key={domain.id}
                className="overflow-hidden rounded-2xl border border-[#12161F]/10 bg-white p-6 sm:p-10"
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                  {/* Left: Capabilities & Deliverables (7 Cols) */}
                  <div className="lg:col-span-7">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
                      {domain.subtitle}
                    </p>

                    <h3 className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-4xl">
                      {domain.title}
                    </h3>

                    <p className="mt-3 text-base font-medium leading-relaxed text-[#12161F]">
                      {domain.businessValue}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B5262]">
                      {domain.summary}
                    </p>

                    {/* Unboxed Technology Line */}
                    <div className="mt-6 border-y border-[#12161F]/10 py-4">
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4B5262]">
                        Core Technologies &amp; Tools
                      </span>
                      <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#12161F]">
                        {domain.technologies.join(' · ')}
                      </p>
                    </div>

                    {/* Compact Text-Only Applied Project References */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4B5262]">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#4B5262]">
                        Applied in:
                      </span>
                      {domain.relatedProjects.map((rel, idx) => (
                        <React.Fragment key={rel.slug}>
                          <Link
                            href={`/projects/${rel.slug}`}
                            className="font-semibold text-[#12161F] underline decoration-[#12161F]/25 underline-offset-4 transition-colors hover:text-[#C85A17] hover:decoration-[#C85A17]"
                          >
                            {rel.title}
                          </Link>
                          {idx < domain.relatedProjects.length - 1 && (
                            <span className="text-[#4B5262]/50">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Right: Architectural Specification & Deliverables (5 Cols — No Project Thumbnails) */}
                  <div className="flex flex-col justify-between rounded-xl border border-[#12161F]/10 bg-[#F8F6F1] p-6 lg:col-span-5">
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                        Engineering Deliverables
                      </span>
                      <ul className="mt-4 space-y-2.5">
                        {domain.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs leading-relaxed text-[#12161F]"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C85A17]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <details className="group mt-6 border-t border-[#12161F]/10 pt-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#12161F]">
                        <span>Architectural Proof Note</span>
                        <ChevronDown className="h-4 w-4 text-[#C85A17] transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 text-xs leading-relaxed text-[#4B5262]">
                        {domain.architecturalProof}
                      </p>
                    </details>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* 2. INTERACTIVE 6-STAGE WORKFLOW */}
          <section
            aria-labelledby="workflow-heading"
            className="rounded-2xl border border-[#12161F]/10 bg-white p-6 sm:p-10 lg:p-12"
          >
            <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C85A17]">
                  Development Process
                </p>
                <h2
                  id="workflow-heading"
                  className="mt-2 font-display text-3xl font-bold text-[#12161F] sm:text-5xl"
                >
                  6-Step Engineering Workflow
                </h2>
              </div>
              <p className="max-w-md text-sm text-[#4B5262]">
                Select any stage below to inspect how projects move from initial
                requirements and architecture to testing and deployment.
              </p>
            </div>

            <HorizontalScrollStrip
              ariaLabel="6-Step Engineering Workflow Stages"
              role="tablist"
              fadeColorFrom="from-white"
              stripClassName="gap-3 py-1"
            >
              {PROCESS_STAGES.map((stage, idx) => {
                const isSelected = idx === activeStage;
                return (
                  <button
                    key={stage.step}
                    id={`workflow-tab-${idx}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`workflow-panel-${idx}`}
                    data-active={isSelected}
                    onClick={() => setActiveStage(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        const next = (idx + 1) % PROCESS_STAGES.length;
                        setActiveStage(next);
                        document.getElementById(`workflow-tab-${next}`)?.focus();
                      } else if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        const prev =
                          (idx - 1 + PROCESS_STAGES.length) %
                          PROCESS_STAGES.length;
                        setActiveStage(prev);
                        document.getElementById(`workflow-tab-${prev}`)?.focus();
                      } else if (e.key === 'Home') {
                        e.preventDefault();
                        setActiveStage(0);
                        document.getElementById('workflow-tab-0')?.focus();
                      } else if (e.key === 'End') {
                        e.preventDefault();
                        const last = PROCESS_STAGES.length - 1;
                        setActiveStage(last);
                        document.getElementById(`workflow-tab-${last}`)?.focus();
                      }
                    }}
                    className={`flex min-w-[175px] flex-1 shrink-0 cursor-pointer flex-col items-start rounded-xl border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C85A17] ${
                      isSelected
                        ? 'border-[#12161F] bg-[#12161F] text-[#F8F6F1]'
                        : 'border-[#12161F]/10 bg-[#F8F6F1] text-[#12161F] hover:border-[#12161F]/30'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold ${
                        isSelected ? 'text-[#C85A17]' : 'text-[#4B5262]'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span className="mt-2 font-display text-lg font-bold">
                      {stage.title}
                    </span>
                    <span
                      className={`mt-1 line-clamp-1 text-[11px] ${
                        isSelected ? 'text-[#F8F6F1]/70' : 'text-[#4B5262]'
                      }`}
                    >
                      {stage.subtitle}
                    </span>
                  </button>
                );
              })}
            </HorizontalScrollStrip>

            <div
              id={`workflow-panel-${activeStage}`}
              role="tabpanel"
              aria-labelledby={`workflow-tab-${activeStage}`}
              className="mt-6 rounded-xl border border-[#12161F]/10 bg-[#F1EDE4] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C85A17]">
                    Step {PROCESS_STAGES[activeStage].step} ·{' '}
                    {PROCESS_STAGES[activeStage].subtitle}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[#12161F] sm:text-3xl">
                    {PROCESS_STAGES[activeStage].title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#4B5262]">
                    {PROCESS_STAGES[activeStage].description}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4B5262]">
                    Key Outputs
                  </span>
                  <div className="mt-3 space-y-2.5">
                    {PROCESS_STAGES[activeStage].artifacts.map((artifact) => (
                      <div
                        key={artifact}
                        className="flex items-center gap-3 rounded-lg border border-[#12161F]/10 bg-white px-4 py-3 text-xs font-semibold text-[#12161F]"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#C85A17]" />
                        <span>{artifact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
