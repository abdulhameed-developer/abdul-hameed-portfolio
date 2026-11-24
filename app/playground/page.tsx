'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  AlertCircle,
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  Monitor,
  Play,
  RotateCw,
  Smartphone,
  Tablet,
  X,
} from 'lucide-react';
import { GitHubOfficialIcon } from '@/components/FloatingWhatsAppButton';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import { ExperimentItem, PLAYGROUND_EXPERIMENTS } from '@/lib/portfolio-data';

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function PlaygroundPage() {
  const [modalApp, setModalApp] = useState<ExperimentItem | null>(null);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [screenTier, setScreenTier] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sandboxLoaded, setSandboxLoaded] = useState<boolean>(false);
  const [sandboxTimedOut, setSandboxTimedOut] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  useEffect(() => {
    const syncScreenTier = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setScreenTier('mobile');
        setViewport('mobile');
      } else if (w < 1024) {
        setScreenTier('tablet');
        setViewport((prev) => (prev === 'desktop' ? 'tablet' : prev));
      } else {
        setScreenTier('desktop');
      }
    };
    syncScreenTier();
    window.addEventListener('resize', syncScreenTier);
    return () => window.removeEventListener('resize', syncScreenTier);
  }, []);

  useEffect(() => {
    if (!modalApp || sandboxLoaded) return;
    const timer = window.setTimeout(() => {
      setSandboxTimedOut(true);
    }, 9000);
    return () => window.clearTimeout(timer);
  }, [modalApp, sandboxLoaded, iframeKey]);

  useEffect(() => {
    if (!modalApp) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalApp(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalApp]);

  const handleOpenSandboxModal = (item: ExperimentItem) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const defaultMode: ViewportMode =
      w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
    setViewport(defaultMode);
    setSandboxLoaded(false);
    setSandboxTimedOut(false);
    setIframeKey((k) => k + 1);
    setModalApp(item);
  };

  const handleReload = () => {
    setSandboxLoaded(false);
    setSandboxTimedOut(false);
    setIframeKey((k) => k + 1);
  };

  const availableDeviceOptions = (
    [
      { id: 'desktop', label: 'Desktop view', icon: Monitor },
      { id: 'tablet', label: 'Tablet view', icon: Tablet },
      { id: 'mobile', label: 'Mobile view', icon: Smartphone },
    ] as const
  ).filter((item) => {
    if (screenTier === 'desktop') return true;
    if (screenTier === 'tablet') return item.id === 'tablet' || item.id === 'mobile';
    return false;
  });

  const renderSandboxFrameContent = (item: ExperimentItem) => {
    return (
      <div className="relative h-full w-full bg-white">
        {!sandboxLoaded && !sandboxTimedOut && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0D1017]/95 p-6 text-center text-white">
            <div className="mb-3 h-7 w-7 animate-spin rounded-full border-2 border-[#C85A17] border-t-transparent" />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#F59E6C]">
              Loading {item.title}
            </p>
            <p className="mt-1 font-mono text-xs text-stone-400">
              {item.liveUrl}
            </p>
          </div>
        )}

        {sandboxTimedOut && !sandboxLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0D1017]/95 p-6 text-center text-white">
            <AlertCircle className="mb-2 h-8 w-8 text-amber-400" />
            <p className="font-display text-base font-bold">
              Sandbox frame took longer than expected
            </p>
            <p className="mt-1 max-w-md text-xs text-stone-300">
              You can reload the frame or open {item.title} directly in a full
              browser tab.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleReload}
                className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#12161F]"
              >
                Reload Sandbox
              </button>
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#C85A17] px-4 py-2 text-xs font-semibold text-white"
                >
                  <span>Open Full Tab</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        )}

        {(item.embedUrl || item.liveUrl) && (
          <iframe
            key={`${item.id}-${iframeKey}`}
            src={item.embedUrl ?? item.liveUrl}
            title={`${item.title} live sandbox`}
            onLoad={() => {
              setSandboxLoaded(true);
              setSandboxTimedOut(false);
            }}
            className="h-full w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
      </div>
    );
  };

  const sandboxWrapperClasses =
    viewport === 'desktop'
      ? 'relative flex h-full w-full max-w-[1380px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.75)] transition-all duration-300'
      : viewport === 'tablet'
        ? 'relative flex h-full max-h-[920px] w-full max-w-[740px] flex-col overflow-hidden rounded-[32px] border-[12px] border-[#1D2230] bg-[#1D2230] shadow-[0_32px_95px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] transition-all duration-300'
        : 'relative flex h-full max-h-[820px] w-full max-w-[390px] flex-col overflow-hidden rounded-[48px] border-[11px] border-[#1D2230] bg-[#1D2230] shadow-[0_32px_95px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.14)] transition-all duration-300';

  const sandboxInnerScreenClasses =
    viewport === 'desktop'
      ? 'relative h-full w-full overflow-hidden bg-white'
      : viewport === 'tablet'
        ? 'relative h-full w-full overflow-hidden rounded-[20px] bg-white'
        : 'relative h-full w-full overflow-hidden rounded-[36px] bg-white';

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12161F]">
      <Navbar />

      <main id="main-content" className="pb-24 pt-28 sm:pt-36">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-8">
          {/* Page Header — Editorial Studio Header */}
          <header className="mb-10 border-b border-[#12161F]/10 pb-8">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A84308]">
              Open-Source Lab · Live Web Apps &amp; WordPress Core Trac
            </p>

            <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="font-display text-4xl font-bold tracking-tight text-[#12161F] sm:text-6xl">
                  Playground &amp; Experiments
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4B5262] sm:text-lg">
                  Interactive full-stack &amp; frontend utilities, security-first
                  WordPress plugin blueprints, live GitHub Pages apps, and my
                  WordPress Core Trac enhancement proposal (#66548). Click{' '}
                  <strong className="text-[#12161F]">Interact in Sandbox</strong>{' '}
                  on any live app to test it directly in an interactive device
                  frame.
                </p>
              </div>

              <a
                href="https://github.com/abdulhameed-developer?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 self-start rounded-full border border-[#12161F]/15 bg-white px-5 py-2.5 text-xs font-semibold text-[#12161F] shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#C85A17] hover:text-[#A84308] lg:self-auto"
              >
                <GitHubOfficialIcon className="h-4 w-4 text-[#12161F]" />
                <span>All GitHub Repositories</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#A84308]" />
              </a>
            </div>
          </header>

          {/* Unified 3-Column Studio Cards Grid */}
          <section aria-labelledby="experiments-grid-heading">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2
                id="experiments-grid-heading"
                className="font-display text-xl font-bold text-[#12161F] sm:text-2xl"
              >
                Interactive Experiments &amp; Blueprints
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PLAYGROUND_EXPERIMENTS.map((item) => {
                return (
                  <article
                    key={item.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#12161F]/10 bg-white p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C85A17]/45 hover:shadow-[0_14px_32px_rgba(18,22,31,0.07)]"
                  >
                    <div>
                      {/* 16:10 Studio Visual Frame with 3D Layered Card Fan Hover Effect (Zero Overlaid Chips) */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-[#12161F] p-3">
                        {/* Radial Ambient Spotlight on Hover */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(200,90,23,0.28),transparent_70%)] opacity-45 transition-opacity duration-500 group-hover:opacity-100"
                        />

                        {/* Layered 3D Fan Deck Container */}
                        <div className="relative flex h-full w-full items-center justify-center [perspective:900px]">
                          {/* Left Peeking Fan Card (Fanned out on Hover) */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute h-[82%] w-[72%] -translate-x-4 translate-y-1.5 -rotate-3 scale-[0.92] overflow-hidden rounded-lg border border-white/15 bg-[#1B2230] opacity-65 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-10 group-hover:translate-y-1 group-hover:-rotate-7 group-hover:scale-[0.94] group-hover:opacity-90"
                          >
                            <Image
                              src={item.previewImage}
                              alt=""
                              fill
                              sizes="220px"
                              className="object-cover object-top opacity-65 brightness-75"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Right Peeking Fan Card (Fanned out on Hover) */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute h-[82%] w-[72%] translate-x-4 translate-y-1.5 rotate-3 scale-[0.92] overflow-hidden rounded-lg border border-white/15 bg-[#1B2230] opacity-65 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-10 group-hover:translate-y-1 group-hover:rotate-7 group-hover:scale-[0.94] group-hover:opacity-90"
                          >
                            <Image
                              src={item.previewImage}
                              alt=""
                              fill
                              sizes="220px"
                              className="object-cover object-bottom opacity-65 brightness-75"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Primary Center Card (Tilted slightly at rest, levels and elevates on Hover) */}
                          <div className="relative z-10 h-[92%] w-[86%] translate-x-1 -rotate-1 overflow-hidden rounded-lg border border-white/25 bg-[#0D111A] shadow-[0_18px_40px_rgba(0,0,0,0.65)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:-translate-y-0.5 group-hover:rotate-0 group-hover:scale-[1.03] group-hover:border-[#F59E6C]/60">
                            <Image
                              src={item.previewImage}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 95vw, 33vw"
                              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* Hover Quick-Action Overlay */}
                        <div className="absolute inset-0 z-30 flex items-center justify-center gap-2 bg-[#12161F]/45 p-3 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
                          {item.embedAllowed && (
                            <button
                              type="button"
                              onClick={() => handleOpenSandboxModal(item)}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#C85A17] px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-[#A84308]"
                            >
                              <Play className="h-3 w-3 fill-current" />
                              <span>Interact in Sandbox</span>
                            </button>
                          )}

                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#12161F]/90 px-3.5 py-2 text-xs font-semibold text-white shadow-lg transition-colors hover:border-[#C85A17]"
                            >
                              <span>
                                {item.id === 'wp-core-trac-66548'
                                  ? 'Open Trac #66548'
                                  : 'Visit Live'}
                              </span>
                              <ExternalLink className="h-3 w-3 text-[#F59E6C]" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Card Inner Content — Short Category Next to Action Icons, Full Tech Stack Inside Content Body */}
                      <div className="px-2 pt-3 pb-2">
                        {/* Row 1: Short Category Label on Left, Circular Action Icons on Right (32x32px Touch Targets) */}
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600">
                            {item.category}
                          </p>

                          <div className="flex shrink-0 items-center gap-1.5">
                            {item.embedAllowed && (
                              <button
                                type="button"
                                onClick={() => handleOpenSandboxModal(item)}
                                aria-label={`Open ${item.title} in interactive sandbox popup`}
                                title="Interact in Sandbox Popup"
                                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#C85A17]/30 bg-[#C85A17]/10 text-[#A84308] transition-colors hover:border-[#C85A17] hover:bg-[#C85A17] hover:text-white"
                              >
                                <Play className="h-3 w-3 fill-current" />
                              </button>
                            )}

                            {item.liveUrl && (
                              <a
                                href={item.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={
                                  item.id === 'wp-core-trac-66548'
                                    ? 'Open WordPress Core Trac Ticket #66548'
                                    : `Open ${item.title} live deployment`
                                }
                                title={
                                  item.id === 'wp-core-trac-66548'
                                    ? 'Open Trac #66548'
                                    : 'Visit Live App'
                                }
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200/90 bg-[#F8F6F1] text-stone-700 transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )}

                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={
                                item.id === 'wp-core-trac-66548'
                                  ? 'View WordPress.org Profile (@codian)'
                                  : `View ${item.title} repository on GitHub`
                              }
                              title={
                                item.id === 'wp-core-trac-66548'
                                  ? 'WordPress.org Profile'
                                  : 'GitHub Repository'
                              }
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200/90 bg-[#F8F6F1] text-stone-700 transition-colors hover:border-[#C85A17] hover:text-[#A84308]"
                            >
                              <GitBranch className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* Row 2: Full-Width Title & Technical Description */}
                        <h3 className="mt-1 font-display text-base font-bold leading-snug tracking-tight text-[#12161F]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#4B5262]">
                          {item.description}
                        </p>

                        {/* Row 3: Technology Stack Inside Inner Card Content (Not Forced Next to Action Buttons) */}
                        <p className="mt-3 border-t border-stone-100 pt-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A84308]">
                          {item.language}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Taskora-Style Minimal Multi-Device Sandbox Modal Popup (Desktop / Tablet / Mobile Bezels) */}
      {modalApp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sandbox-modal-title"
          data-testid="playground-sandbox-modal"
          className="fixed inset-0 z-[80] flex flex-col bg-[#080A0F]/96 text-[#F8F6F1] backdrop-blur-xl"
        >
          {/* Minimalist Top Bar: 3-Column Equal-Fr Grid Guarantees Device Switcher Icons Are 100% Centered From Screen Sides */}
          <div className="mx-auto grid w-full max-w-[1420px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6">
            {/* Left: App Title */}
            <div className="flex min-w-0 items-center gap-2.5 justify-self-start pr-2">
              <h2
                id="sandbox-modal-title"
                className="truncate font-display text-xs font-semibold text-white/90 sm:text-sm"
              >
                {modalApp.title}
              </h2>
            </div>

            {/* Center: Responsive Device Switcher (Desktop: all 3; Tablet: Tablet+Mobile; Mobile: hidden/locked to mobile) */}
            <div className="justify-self-center">
              {availableDeviceOptions.length > 0 && (
                <div
                  role="group"
                  aria-label="Select device frame"
                  className="flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-[#121621] p-1 shadow-inner"
                >
                  {availableDeviceOptions.map((item) => {
                    const Icon = item.icon;
                    const active = viewport === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-testid={`sandbox-device-${item.id}`}
                        aria-label={item.label}
                        aria-pressed={active}
                        title={item.label}
                        onClick={() => setViewport(item.id)}
                        className={`relative inline-flex h-8 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ${
                          active
                            ? 'bg-[#C85A17] text-white shadow-[0_0_14px_rgba(200,90,23,0.65)]'
                            : 'text-stone-400 hover:bg-white/8 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: 3 Compact Circular Icon Controls (Reload, External Link, Close) */}
            <div className="flex shrink-0 items-center gap-2 justify-self-end">
              <button
                type="button"
                onClick={handleReload}
                aria-label="Reload interactive app"
                title="Reload app"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-[#121621] text-stone-300 transition-colors hover:border-[#C85A17] hover:text-white"
              >
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              {modalApp.liveUrl && (
                <a
                  href={modalApp.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${modalApp.title} in new tab`}
                  title="Open live app in new tab"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-[#121621] text-stone-300 transition-colors hover:border-[#C85A17] hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}

              <button
                type="button"
                onClick={() => setModalApp(null)}
                aria-label="Close sandbox popup"
                data-testid="close-sandbox-modal"
                title="Close (Esc)"
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-[#C85A17]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Persistent Single-DOM Device Frame Stage — Morphs Bezel Without Reloading Iframe */}
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setModalApp(null);
              }
            }}
            className="flex flex-1 items-center justify-center overflow-hidden px-3 pb-4 pt-1 sm:px-6 sm:pb-6"
          >
            <div
              data-testid={`sandbox-frame-${viewport}`}
              className={sandboxWrapperClasses}
            >
              {viewport === 'tablet' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-1/2 z-30 -translate-x-1/2"
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-stone-600" />
                </div>
              )}

              {viewport === 'mobile' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 left-1/2 z-30 flex h-5 w-24 -translate-x-1/2 items-center justify-end rounded-full bg-[#07090E] px-2.5 shadow-md"
                >
                  <span className="h-2 w-2 rounded-full bg-[#182238] ring-1 ring-white/10" />
                </div>
              )}

              <div className={sandboxInnerScreenClasses}>
                {renderSandboxFrameContent(modalApp)}
              </div>

              {viewport === 'mobile' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-black/35"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
