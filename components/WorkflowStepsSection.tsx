'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Code2,
  Eye,
  GitBranch,
  Layers,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

const SCOPE_TICKETS = [
  {
    id: 'WP-101',
    title: 'Custom PHP Plugin & Directory',
    stack: 'WordPress · PHP · MySQL',
    priority: 'High Priority',
    detail: 'Course Comparator Pro + Server-Side PDF Export + REST API.',
  },
  {
    id: 'NX-204',
    title: 'Multi-Pane SaaS Workspace',
    stack: 'Next.js · TypeScript · Tailwind',
    priority: 'Full-Stack',
    detail: '4-column desktop inbox collapsing to 390px mobile bottom nav.',
  },
  {
    id: 'SH-308',
    title: 'Editorial Couture Storefront',
    stack: 'Shopify · Liquid · SEO',
    priority: 'E-Commerce',
    detail: 'Tailored Liquid templates and mobile-first product galleries.',
  },
] as const;

const BUILD_STAGES = [
  {
    label: 'Responsive UI & Motion',
    detail: 'Fluid 390px–1440px layouts with 60fps hardware-accelerated motion.',
    progress: 100,
  },
  {
    label: 'Modular PHP & Next.js',
    detail: 'Clean server/client architecture, REST endpoints & MySQL queries.',
    progress: 100,
  },
  {
    label: 'AI-Assisted Code QA',
    detail: 'Accelerated with Cursor, Claude, Gemini & ChatGPT + human review.',
    progress: 100,
  },
  {
    label: 'Pushed to GitHub',
    detail: 'Strict TypeScript & ESLint validation before production release.',
    progress: 100,
  },
] as const;

const TELEMETRY_MODES = [
  {
    id: 'vitals',
    label: 'Web Vitals',
    headline: 'Fast Load & Core Web Vitals',
    badge: '99/100 Speed',
    pathD: 'M 8 68 Q 65 58, 115 38 T 225 22 T 352 12',
    areaD: 'M 8 68 Q 65 58, 115 38 T 225 22 T 352 12 L 352 78 L 8 78 Z',
    activeNode: 0,
  },
  {
    id: 'schema',
    label: 'Schema.org',
    headline: 'JSON-LD Graph & Search Readiness',
    badge: '100% Indexed',
    pathD: 'M 8 64 Q 75 48, 115 34 T 225 18 T 352 10',
    areaD: 'M 8 64 Q 75 48, 115 34 T 225 18 T 352 10 L 352 78 L 8 78 Z',
    activeNode: 1,
  },
  {
    id: 'launch',
    label: 'Live Launch',
    headline: 'Production Edge & SSL Delivery',
    badge: '100% Ready',
    pathD: 'M 8 68 Q 65 62, 115 46 T 225 26 T 352 12',
    areaD: 'M 8 68 Q 65 62, 115 46 T 225 26 T 352 12 L 352 78 L 8 78 Z',
    activeNode: 2,
  },
] as const;

export default function WorkflowStepsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsStageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const orbGroupRef = useRef<SVGGElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  // Interactive widget states for each of the 4 steps
  const [selectedTicketIdx, setSelectedTicketIdx] = useState(0);
  const [selectedBuildStageIdx, setSelectedBuildStageIdx] = useState(2);
  const [qaStatus, setQaStatus] = useState<'approved' | 'inspecting'>('approved');
  const [telemetryModeIdx, setTelemetryModeIdx] = useState(2);

  // Smooth scroll progress (0..1) driving active step nodes (01 -> 02 -> 03 -> 04 -> Done)
  const [activeStepCount, setActiveStepCount] = useState<number>(1);
  const [isDoneReached, setIsDoneReached] = useState<boolean>(false);

  // Dynamic pixel-accurate SVG viewBox & path so the winding line NEVER crosses text or cards
  const [svgMetrics, setSvgMetrics] = useState<{
    width: number;
    height: number;
    d: string;
    startX: number;
    startY: number;
  }>({
    width: 1120,
    height: 1320,
    d: 'M 24 24 L 24 290 Q 24 318 52 318 L 1068 318 Q 1096 318 1096 346 L 1096 610 Q 1096 638 1068 638 L 52 638 Q 24 638 24 666 L 24 930 Q 24 958 52 958 L 1068 958 Q 1096 958 1096 986 L 1096 1250 Q 1096 1278 1068 1278 L 560 1278',
    startX: 24,
    startY: 24,
  });

  const recomputeDesktopPath = useCallback(() => {
    const stage = stepsStageRef.current;
    if (!stage) return;

    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (w < 640 || h < 200) return;

    const rows = Array.from(
      stage.querySelectorAll<HTMLElement>('[data-workflow-step]')
    );
    const doneNode = stage.querySelector<HTMLElement>(
      '[data-workflow-done-node]'
    );
    if (rows.length < 4) return;

    const leftX = 24;
    const rightX = w - 24;
    const r = 28; // smooth corner radius

    const r0Top = rows[0].offsetTop + 18;
    const r0Bottom = rows[0].offsetTop + rows[0].offsetHeight;
    const r1Top = rows[1].offsetTop;
    const r1Bottom = rows[1].offsetTop + rows[1].offsetHeight;
    const r2Top = rows[2].offsetTop;
    const r2Bottom = rows[2].offsetTop + rows[2].offsetHeight;
    const r3Top = rows[3].offsetTop;
    const r3Bottom = rows[3].offsetTop + rows[3].offsetHeight;

    // Exact midpoints of the vertical gaps between rows
    const gap1Y = Math.round((r0Bottom + r1Top) / 2);
    const gap2Y = Math.round((r1Bottom + r2Top) / 2);
    const gap3Y = Math.round((r2Bottom + r3Top) / 2);

    const doneCenterY = doneNode
      ? Math.round(doneNode.offsetTop + doneNode.offsetHeight / 2)
      : Math.round(r3Bottom + 56);
    const centerX = Math.round(w / 2);

    const d = [
      `M ${leftX} ${r0Top}`,
      // Down left rail past Step 01 to Gap 1
      `L ${leftX} ${gap1Y - r}`,
      `Q ${leftX} ${gap1Y} ${leftX + r} ${gap1Y}`,
      // Horizontal across Gap 1 to right rail
      `L ${rightX - r} ${gap1Y}`,
      `Q ${rightX} ${gap1Y} ${rightX} ${gap1Y + r}`,
      // Down right rail past Step 02 to Gap 2
      `L ${rightX} ${gap2Y - r}`,
      `Q ${rightX} ${gap2Y} ${rightX - r} ${gap2Y}`,
      // Horizontal across Gap 2 to left rail
      `L ${leftX + r} ${gap2Y}`,
      `Q ${leftX} ${gap2Y} ${leftX} ${gap2Y + r}`,
      // Down left rail past Step 03 to Gap 3
      `L ${leftX} ${gap3Y - r}`,
      `Q ${leftX} ${gap3Y} ${leftX + r} ${gap3Y}`,
      // Horizontal across Gap 3 to right rail
      `L ${rightX - r} ${gap3Y}`,
      `Q ${rightX} ${gap3Y} ${rightX} ${gap3Y + r}`,
      // Down right rail past Step 04 to terminal Done pill level
      `L ${rightX} ${doneCenterY - r}`,
      `Q ${rightX} ${doneCenterY} ${rightX - r} ${doneCenterY}`,
      `L ${centerX} ${doneCenterY}`,
    ].join(' ');

    setSvgMetrics((prev) => {
      if (
        prev.width === w &&
        prev.height === h &&
        prev.d === d &&
        prev.startX === leftX &&
        prev.startY === r0Top
      ) {
        return prev;
      }
      return {
        width: w,
        height: h,
        d,
        startX: leftX,
        startY: r0Top,
      };
    });
  }, []);

  useEffect(() => {
    recomputeDesktopPath();
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        recomputeDesktopPath();
      });
    }
    const stage = stepsStageRef.current;
    if (!stage || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      recomputeDesktopPath();
    });
    ro.observe(stage);
    window.addEventListener('resize', recomputeDesktopPath);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recomputeDesktopPath);
    };
  }, [recomputeDesktopPath]);

  // Silky-smooth 60fps lerped scroll progress tracking (Zero GSAP jump or 180ms flash)
  useEffect(() => {
    let rafId: number;
    let currentP = 0.06;
    let targetP = 0.06;
    let lastStepCount = 1;
    let lastDone = false;

    const computeTargetProgress = () => {
      const stage = stepsStageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      // Start progressing when top of steps stage enters 78% of viewport; finish when bottom reaches 62% of viewport
      const startY = vh * 0.78;
      const endY = vh * 0.62;
      const totalScrollSpan = Math.max(1, rect.height - (startY - endY));
      const scrolled = startY - rect.top;
      targetP = Math.min(1, Math.max(0.04, scrolled / totalScrollSpan));
    };

    const renderProgress = (p: number) => {
      const pathEl = pathRef.current;
      const orbEl = orbGroupRef.current;
      const barEl = mobileBarRef.current;

      if (pathEl) {
        try {
          const totalLen = pathEl.getTotalLength();
          if (totalLen > 0) {
            pathEl.style.strokeDasharray = `${totalLen}`;
            pathEl.style.strokeDashoffset = `${totalLen * (1 - p)}`;
            if (orbEl) {
              const pt = pathEl.getPointAtLength(totalLen * p);
              orbEl.setAttribute('transform', `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`);
            }
          }
        } catch {
          // SVG hidden on mobile
        }
      }

      if (barEl) {
        barEl.style.transform = `scaleY(${Math.max(0.06, p).toFixed(4)})`;
        barEl.style.transformOrigin = 'top center';
      }

      const nextStepCount =
        p >= 0.78 ? 4 : p >= 0.52 ? 3 : p >= 0.25 ? 2 : 1;
      const nextDone = p >= 0.95;

      if (nextStepCount !== lastStepCount) {
        lastStepCount = nextStepCount;
        setActiveStepCount(nextStepCount);
      }
      if (nextDone !== lastDone) {
        lastDone = nextDone;
        setIsDoneReached(nextDone);
      }
    };

    computeTargetProgress();
    currentP = targetP;
    renderProgress(currentP);

    const tick = () => {
      computeTargetProgress();
      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0005) {
        currentP += diff * 0.14;
        renderProgress(currentP);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [svgMetrics.d]);

  const scrollToStep = useCallback((stepCode: string) => {
    const stage = stepsStageRef.current;
    if (!stage) return;
    const row = stage.querySelector<HTMLElement>(
      `[data-workflow-step="${stepCode}"]`
    );
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const currentTicket = SCOPE_TICKETS[selectedTicketIdx];
  const currentBuildStage = BUILD_STAGES[selectedBuildStageIdx];
  const currentTelemetry = TELEMETRY_MODES[telemetryModeIdx];

  return (
    <section
      ref={sectionRef}
      data-gsap-ignore="true"
      data-testid="workflow-steps-section"
      aria-labelledby="workflow-steps-heading"
      className="border-b border-stone-200/80 bg-[#F8F6F1] py-14 sm:py-22"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
        {/* Outer Editorial Rounded Stage Container */}
        <div className="relative overflow-hidden rounded-3xl border border-[#12161F]/12 bg-[#EFECE4]/75 px-4 py-10 shadow-[0_22px_60px_-20px_rgba(18,22,31,0.08)] sm:rounded-[2.5rem] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          {/* Subtle Warm Radial Background Accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#C85A17]/10 to-transparent blur-3xl"
          />

          {/* Section Header */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#12161F]/12 bg-white px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A84308] shadow-2xs">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#C85A17]"
                aria-hidden="true"
              />
              <span>How It Works</span>
            </span>

            <h2
              id="workflow-steps-heading"
              className="mt-3.5 font-display text-2xl font-bold tracking-tight text-[#12161F] sm:text-5xl [text-wrap:balance]"
            >
              Four steps from brief to{' '}
              <span className="font-serif font-normal italic text-[#A84308]">
                live production.
              </span>
            </h2>

            <p className="mt-2.5 text-xs leading-relaxed text-stone-600 sm:text-base">
              A transparent, end-to-end engineering pipeline combining full-stack
              ownership with modern AI-assisted development and multi-device
              verification.
            </p>
          </div>

          {/* Winding Path & 4 Alternating Steps Container */}
          <div ref={stepsStageRef} className="relative mt-10 sm:mt-16">
            {/* Desktop Winding S-Curve SVG Pipeline — Dynamically Routed in Outer Rails (x=24 / x=W-24) & Exact Mid-Row Gaps */}
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${svgMetrics.width} ${svgMetrics.height}`}
              fill="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            >
              <defs>
                <linearGradient
                  id="workflow-path-grad"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#C85A17" />
                  <stop offset="55%" stopColor="#A84308" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              {/* Muted Base Track */}
              <path
                d={svgMetrics.d}
                stroke="#DAD4C8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated Terracotta-to-Emerald Progress Track */}
              <path
                ref={pathRef}
                d={svgMetrics.d}
                stroke="url(#workflow-path-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Leading Glowing Progress Orb */}
              <g
                ref={orbGroupRef}
                transform={`translate(${svgMetrics.startX}, ${svgMetrics.startY})`}
              >
                <circle r="11" fill="#C85A17" fillOpacity="0.22" />
                <circle
                  r="5.5"
                  fill="#C85A17"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                />
              </g>
            </svg>

            {/* Mobile & Tablet Left Vertical Connector Spine */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-3 bottom-12 left-3.5 w-[3px] overflow-hidden rounded-full bg-[#DAD4C8] lg:hidden"
            >
              <div
                ref={mobileBarRef}
                className="h-full w-full origin-top bg-gradient-to-b from-[#C85A17] via-[#A84308] to-emerald-600"
              />
            </div>

            {/* Steps Rows — Padded Inward (lg:px-16) So Outer Rails (x=24px and x=W-24px) Never Touch Text or Cards */}
            <div className="relative z-10 space-y-10 pl-9 sm:space-y-14 lg:space-y-24 lg:px-16 lg:pl-16">
              {/* STEP 01 — Scope & Architecture */}
              <div
                data-workflow-step="01"
                className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10"
              >
                {/* Mobile Step Node Pill */}
                <button
                  type="button"
                  onClick={() => scrollToStep('01')}
                  aria-label="Step 01: Scope and Stack"
                  className={`absolute -left-9 top-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border font-mono text-[11px] font-bold transition-all duration-300 lg:hidden ${
                    activeStepCount >= 1
                      ? 'border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_14px_rgba(200,90,23,0.38)]'
                      : 'border-[#C85A17]/35 bg-white text-[#A84308] shadow-2xs'
                  }`}
                >
                  01
                </button>

                {/* Desktop Outer Left Rail Node Pill (Centered on x=24px Rail) */}
                <button
                  type="button"
                  onClick={() => scrollToStep('01')}
                  aria-label="Step 01: Scope and Stack"
                  className={`absolute -left-10 top-0 hidden h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all duration-300 lg:inline-flex ${
                    activeStepCount >= 1
                      ? 'scale-105 border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_18px_rgba(200,90,23,0.42)]'
                      : 'border-[#C85A17]/40 bg-white text-[#A84308] shadow-xs hover:border-[#C85A17]'
                  }`}
                >
                  01
                </button>

                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`whitespace-nowrap rounded-full border px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] shadow-2xs transition-colors duration-300 ${
                        activeStepCount >= 1
                          ? 'border-[#C85A17]/30 bg-white text-[#A84308]'
                          : 'border-[#12161F]/10 bg-white/90 text-stone-600'
                      }`}
                    >
                      Step 01 · Scope &amp; Stack
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-bold text-[#12161F] sm:text-3xl">
                    Define the brief &amp; stack
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-base">
                    Every project starts with a clear architectural blueprint—mapping
                    your pages, custom database fields, or e-commerce flows to the
                    right stack.
                  </p>
                </div>

                {/* Right Interactive Scope Card */}
                <div className="lg:col-span-7">
                  <div
                    className={`mx-auto max-w-[490px] overflow-hidden rounded-2xl border bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 sm:p-5 ${
                      activeStepCount >= 1
                        ? 'border-[#C85A17]/35 shadow-[0_18px_40px_rgba(18,22,31,0.08)]'
                        : 'border-[#12161F]/12 shadow-[0_14px_34px_rgba(18,22,31,0.05)]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2.5">
                      <div
                        role="group"
                        aria-label="Switch sample project scope"
                        className="flex items-center gap-1"
                      >
                        {SCOPE_TICKETS.map((t, i) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTicketIdx(i)}
                            className={`cursor-pointer whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold transition-all ${
                              selectedTicketIdx === i
                                ? 'bg-[#12161F] text-[#F8F6F1] shadow-2xs'
                                : 'bg-[#F8F6F1] text-stone-600 hover:bg-[#EFECE4] hover:text-[#12161F]'
                            }`}
                          >
                            {t.id}
                          </button>
                        ))}
                      </div>

                      <span className="shrink-0 whitespace-nowrap rounded-full border border-[#C85A17]/30 bg-[#C85A17]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#A84308]">
                        {currentTicket.priority}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="truncate font-display text-sm font-bold text-[#12161F] sm:text-base">
                        {currentTicket.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">
                        {currentTicket.detail}
                      </p>
                    </div>

                    <div className="mt-3.5 flex items-center justify-between gap-2 rounded-xl border border-stone-200/80 bg-[#F8F6F1] px-3 py-2">
                      <span className="truncate font-mono text-[10px] font-semibold text-[#A84308]">
                        {currentTicket.stack}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-mono text-[10px] font-semibold text-emerald-700">
                        <Layers className="h-3 w-3" aria-hidden="true" />
                        <span>Scope Ready</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 02 — Full-Stack & AI-Assisted Build */}
              <div
                data-workflow-step="02"
                className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10"
              >
                <button
                  type="button"
                  onClick={() => scrollToStep('02')}
                  aria-label="Step 02: Engineering"
                  className={`absolute -left-9 top-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border font-mono text-[11px] font-bold transition-all duration-300 lg:hidden ${
                    activeStepCount >= 2
                      ? 'border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_14px_rgba(200,90,23,0.38)]'
                      : 'border-[#C85A17]/35 bg-white text-[#A84308] shadow-2xs'
                  }`}
                >
                  02
                </button>

                {/* Desktop Outer Right Rail Node Pill (Centered on x=W-24px Rail) */}
                <button
                  type="button"
                  onClick={() => scrollToStep('02')}
                  aria-label="Step 02: Engineering"
                  className={`absolute -right-10 top-0 hidden h-8 w-8 translate-x-1/2 cursor-pointer items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all duration-300 lg:inline-flex ${
                    activeStepCount >= 2
                      ? 'scale-105 border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_18px_rgba(200,90,23,0.42)]'
                      : 'border-[#C85A17]/40 bg-white text-[#A84308] shadow-xs hover:border-[#C85A17]'
                  }`}
                >
                  02
                </button>

                {/* Left Interactive Build Pipeline Card on Desktop */}
                <div className="order-2 lg:order-1 lg:col-span-7">
                  <div
                    className={`mx-auto max-w-[490px] overflow-hidden rounded-2xl border bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 sm:p-5 ${
                      activeStepCount >= 2
                        ? 'border-[#C85A17]/35 shadow-[0_18px_40px_rgba(18,22,31,0.08)]'
                        : 'border-[#12161F]/12 shadow-[0_14px_34px_rgba(18,22,31,0.05)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#12161F] text-[#F59E6C]">
                          <Code2 className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-bold text-[#12161F] sm:text-base">
                            Full-Stack Build Pipeline
                          </p>
                          <p className="truncate font-mono text-[10px] text-stone-600">
                            {currentBuildStage.detail}
                          </p>
                        </div>
                      </div>

                      {/* Circular 100% Progress Ring */}
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                        <svg
                          viewBox="0 0 36 36"
                          className="h-11 w-11 -rotate-90"
                          aria-hidden="true"
                        >
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke="#EFECE4"
                            strokeWidth="3.2"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="15"
                            fill="none"
                            stroke="#C85A17"
                            strokeWidth="3.2"
                            strokeDasharray="94.2"
                            strokeDashoffset="0"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute font-mono text-[10px] font-bold text-[#12161F]">
                          100%
                        </span>
                      </div>
                    </div>

                    <div
                      role="group"
                      aria-label="Inspect build pipeline stages"
                      className="mt-3.5 grid grid-cols-1 gap-1.5 border-t border-stone-200/80 pt-3 sm:grid-cols-2"
                    >
                      {BUILD_STAGES.map((stage, idx) => {
                        const isSelected = selectedBuildStageIdx === idx;
                        return (
                          <button
                            key={stage.label}
                            type="button"
                            onClick={() => setSelectedBuildStageIdx(idx)}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs font-medium transition-all ${
                              isSelected
                                ? 'border-[#C85A17]/40 bg-[#F8F6F1] text-[#12161F] shadow-2xs'
                                : 'border-transparent bg-[#F8F6F1]/65 text-stone-700 hover:bg-[#F8F6F1] hover:text-[#12161F]'
                            }`}
                          >
                            <CheckCircle2
                              className={`h-3.5 w-3.5 shrink-0 ${
                                isSelected ? 'text-[#C85A17]' : 'text-emerald-600'
                              }`}
                              aria-hidden="true"
                            />
                            <span className="truncate">{stage.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Copy on Desktop */}
                <div className="order-1 lg:order-2 lg:col-span-5">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`whitespace-nowrap rounded-full border px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] shadow-2xs transition-colors duration-300 ${
                        activeStepCount >= 2
                          ? 'border-[#C85A17]/30 bg-white text-[#A84308]'
                          : 'border-[#12161F]/10 bg-white/90 text-stone-600'
                      }`}
                    >
                      Step 02 · Engineering
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-bold text-[#12161F] sm:text-3xl">
                    Full-stack build &amp; AI velocity
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-base">
                    I engineer both the responsive frontend interface and the
                    backend database or plugin logic—using{' '}
                    <strong className="text-[#12161F]">
                      Cursor, Claude, Gemini, and ChatGPT
                    </strong>{' '}
                    to accelerate problem-solving.
                  </p>
                </div>
              </div>

              {/* STEP 03 — Multi-Device & Security Review */}
              <div
                data-workflow-step="03"
                className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10"
              >
                <button
                  type="button"
                  onClick={() => scrollToStep('03')}
                  aria-label="Step 03: Verification"
                  className={`absolute -left-9 top-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border font-mono text-[11px] font-bold transition-all duration-300 lg:hidden ${
                    activeStepCount >= 3
                      ? 'border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_14px_rgba(200,90,23,0.38)]'
                      : 'border-[#C85A17]/35 bg-white text-[#A84308] shadow-2xs'
                  }`}
                >
                  03
                </button>

                {/* Desktop Outer Left Rail Node Pill (Centered on x=24px Rail) */}
                <button
                  type="button"
                  onClick={() => scrollToStep('03')}
                  aria-label="Step 03: Verification"
                  className={`absolute -left-10 top-0 hidden h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all duration-300 lg:inline-flex ${
                    activeStepCount >= 3
                      ? 'scale-105 border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_18px_rgba(200,90,23,0.42)]'
                      : 'border-[#C85A17]/40 bg-white text-[#A84308] shadow-xs hover:border-[#C85A17]'
                  }`}
                >
                  03
                </button>

                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`whitespace-nowrap rounded-full border px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] shadow-2xs transition-colors duration-300 ${
                        activeStepCount >= 3
                          ? 'border-[#C85A17]/30 bg-white text-[#A84308]'
                          : 'border-[#12161F]/10 bg-white/90 text-stone-600'
                      }`}
                    >
                      Step 03 · Verification
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-bold text-[#12161F] sm:text-3xl">
                    Review across devices
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-base">
                    Before launch, every layout, booking flow, and interactive
                    state is verified across Desktop, Tablet, and Mobile
                    viewports alongside technical SEO checks.
                  </p>
                </div>

                {/* Right Interactive Review & Approve Card */}
                <div className="lg:col-span-7">
                  <div
                    className={`mx-auto max-w-[490px] overflow-hidden rounded-2xl border bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 sm:p-5 ${
                      activeStepCount >= 3
                        ? 'border-[#C85A17]/35 shadow-[0_18px_40px_rgba(18,22,31,0.08)]'
                        : 'border-[#12161F]/12 shadow-[0_14px_34px_rgba(18,22,31,0.05)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-2.5">
                      <div className="flex min-w-0 items-center gap-2">
                        <ShieldCheck
                          className={`h-4 w-4 shrink-0 ${
                            qaStatus === 'approved'
                              ? 'text-emerald-600'
                              : 'text-[#C85A17]'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="truncate font-display text-xs font-bold text-[#12161F] sm:text-sm">
                          {qaStatus === 'approved'
                            ? 'Ready for Production Review'
                            : 'Inspecting Multi-Device Matrix'}
                        </span>
                      </div>
                      <span
                        className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                          qaStatus === 'approved'
                            ? 'bg-emerald-500/12 text-emerald-700'
                            : 'bg-[#C85A17]/12 text-[#A84308]'
                        }`}
                      >
                        3/3 Viewports
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                      <div className="flex items-center justify-between gap-2 rounded-lg bg-[#F8F6F1] px-3 py-1.5">
                        <span className="truncate font-medium text-[#12161F]">
                          {qaStatus === 'approved'
                            ? 'Desktop · Tablet · Mobile QA'
                            : '1440px · 820px · 390px Layout'}
                        </span>
                        <span className="shrink-0 whitespace-nowrap font-mono text-[10px] font-semibold text-emerald-700">
                          Zero Overflow
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 rounded-lg bg-[#F8F6F1] px-3 py-1.5">
                        <span className="truncate font-medium text-[#12161F]">
                          {qaStatus === 'approved'
                            ? 'Schema.org & Security Guards'
                            : 'WCAG AA Contrast & Escaped Output'}
                        </span>
                        <span className="shrink-0 whitespace-nowrap font-mono text-[10px] font-semibold text-[#A84308]">
                          Verified
                        </span>
                      </div>
                    </div>

                    <div className="mt-3.5 flex items-center justify-between gap-2 pt-0.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQaStatus('approved')}
                          className={`inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                            qaStatus === 'approved'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'border border-stone-200 bg-[#F8F6F1] text-stone-700 hover:bg-[#EFECE4]'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Approve</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setQaStatus('inspecting')}
                          className={`inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                            qaStatus === 'inspecting'
                              ? 'bg-[#12161F] text-white shadow-xs'
                              : 'border border-stone-200 bg-[#F8F6F1] text-stone-700 hover:bg-[#EFECE4]'
                          }`}
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Inspect</span>
                        </button>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[10px] text-stone-500">
                        <GitBranch className="h-3 w-3" aria-hidden="true" />
                        <span>main</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 04 — Launch & Performance */}
              <div
                data-workflow-step="04"
                className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10"
              >
                <button
                  type="button"
                  onClick={() => scrollToStep('04')}
                  aria-label="Step 04: Launch and Scale"
                  className={`absolute -left-9 top-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border font-mono text-[11px] font-bold transition-all duration-300 lg:hidden ${
                    activeStepCount >= 4
                      ? 'border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_14px_rgba(200,90,23,0.38)]'
                      : 'border-[#C85A17]/35 bg-white text-[#A84308] shadow-2xs'
                  }`}
                >
                  04
                </button>

                {/* Desktop Outer Right Rail Node Pill (Centered on x=W-24px Rail) */}
                <button
                  type="button"
                  onClick={() => scrollToStep('04')}
                  aria-label="Step 04: Launch and Scale"
                  className={`absolute -right-10 top-0 hidden h-8 w-8 translate-x-1/2 cursor-pointer items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all duration-300 lg:inline-flex ${
                    activeStepCount >= 4
                      ? 'scale-105 border-[#C85A17] bg-[#C85A17] text-white shadow-[0_0_18px_rgba(200,90,23,0.42)]'
                      : 'border-[#C85A17]/40 bg-white text-[#A84308] shadow-xs hover:border-[#C85A17]'
                  }`}
                >
                  04
                </button>

                {/* Left Interactive Performance Curve Card */}
                <div className="order-2 lg:order-1 lg:col-span-7">
                  <div
                    className={`mx-auto max-w-[490px] overflow-hidden rounded-2xl border bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 sm:p-5 ${
                      activeStepCount >= 4
                        ? 'border-[#C85A17]/35 shadow-[0_18px_40px_rgba(18,22,31,0.08)]'
                        : 'border-[#12161F]/12 shadow-[0_14px_34px_rgba(18,22,31,0.05)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A84308]">
                          Production Telemetry
                        </p>
                        <p className="mt-0.5 truncate font-display text-sm font-bold text-[#12161F] sm:text-base">
                          {currentTelemetry.headline}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-emerald-500/12 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-700">
                        <TrendingUp className="h-3 w-3" aria-hidden="true" />
                        <span>{currentTelemetry.badge}</span>
                      </span>
                    </div>

                    {/* Smooth Warm Editorial Area Sparkline SVG */}
                    <div className="mt-3 overflow-hidden rounded-xl border border-stone-200/70 bg-[#F8F6F1] p-3">
                      <svg
                        viewBox="0 0 360 84"
                        className="h-14 w-full sm:h-16"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="sparkline-fill"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#C85A17"
                              stopOpacity="0.28"
                            />
                            <stop
                              offset="100%"
                              stopColor="#C85A17"
                              stopOpacity="0.0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d={currentTelemetry.areaD}
                          fill="url(#sparkline-fill)"
                        />
                        <path
                          d={currentTelemetry.pathD}
                          fill="none"
                          stroke="#C85A17"
                          strokeWidth="2.75"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="115"
                          cy="44"
                          r={currentTelemetry.activeNode === 0 ? '5' : '3.5'}
                          fill={
                            currentTelemetry.activeNode === 0
                              ? '#C85A17'
                              : '#FFFFFF'
                          }
                          stroke="#C85A17"
                          strokeWidth="2"
                        />
                        <circle
                          cx="225"
                          cy="24"
                          r={currentTelemetry.activeNode === 1 ? '5' : '3.5'}
                          fill={
                            currentTelemetry.activeNode === 1
                              ? '#C85A17'
                              : '#FFFFFF'
                          }
                          stroke="#C85A17"
                          strokeWidth="2"
                        />
                        <circle
                          cx="352"
                          cy="12"
                          r={currentTelemetry.activeNode === 2 ? '5' : '4'}
                          fill="#059669"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      </svg>

                      <div
                        role="group"
                        aria-label="Switch production telemetry metric"
                        className="mt-1.5 flex items-center justify-between gap-2 font-mono text-[10px]"
                      >
                        {TELEMETRY_MODES.map((mode, idx) => {
                          const isSelected = telemetryModeIdx === idx;
                          return (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setTelemetryModeIdx(idx)}
                              className={`cursor-pointer whitespace-nowrap rounded-md px-2 py-0.5 transition-colors ${
                                isSelected
                                  ? 'bg-[#12161F] font-semibold text-white'
                                  : 'text-stone-600 hover:bg-[#EFECE4] hover:text-[#12161F]'
                              }`}
                            >
                              {mode.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Copy */}
                <div className="order-1 lg:order-2 lg:col-span-5">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`whitespace-nowrap rounded-full border px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] shadow-2xs transition-colors duration-300 ${
                        activeStepCount >= 4
                          ? 'border-[#C85A17]/30 bg-white text-[#A84308]'
                          : 'border-[#12161F]/10 bg-white/90 text-stone-600'
                      }`}
                    >
                      Step 04 · Launch &amp; Scale
                    </span>
                  </div>

                  <h3 className="mt-2.5 font-display text-xl font-bold text-[#12161F] sm:text-3xl">
                    Ship faster every week
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-base">
                    Your website, plugin, or web application launches with clean
                    documentation, fast asset delivery, and straightforward admin
                    controls.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Terminal Node Pill ("Done · Live in Production" — Strictly Single Line & Illuminates on Completion) */}
            <div
              data-workflow-done-node
              className="relative z-10 mt-10 flex justify-center lg:mt-16"
            >
              <div
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 transition-all duration-300 sm:px-5 ${
                  isDoneReached
                    ? 'scale-105 border-emerald-600/50 bg-white shadow-[0_0_24px_rgba(5,150,105,0.22)]'
                    : 'border-emerald-600/25 bg-white shadow-sm'
                }`}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#12161F] sm:text-xs">
                  Done · Live in Production
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
