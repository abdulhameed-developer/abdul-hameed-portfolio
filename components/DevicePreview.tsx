'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  AlertCircle,
  ExternalLink,
  Monitor,
  Play,
  RotateCw,
  Smartphone,
  Tablet,
  X,
} from 'lucide-react';
import { GitHubOfficialIcon } from '@/components/FloatingWhatsAppButton';
import { ProjectItem } from '@/lib/portfolio-data';

interface DevicePreviewProps {
  project?: ProjectItem;
  title?: string;
  liveUrl?: string;
  embedUrl?: string;
  githubUrl?: string;
  embedAllowed?: boolean;
  desktopScreenshot?: string;
  mobileScreenshot?: string;
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export default function DevicePreview(props: DevicePreviewProps) {
  const title = props.project?.title ?? props.title ?? 'Project Preview';
  const liveUrl = props.project?.liveUrl ?? props.liveUrl;
  const iframeSrc = props.project?.embedUrl ?? props.embedUrl ?? liveUrl;
  const githubUrl = props.project?.githubUrl ?? props.githubUrl;
  const embedAllowed = Boolean(props.project?.embedAllowed ?? props.embedAllowed);
  const desktopScreenshot =
    props.project?.desktopScreenshot ??
    props.desktopScreenshot ??
    '/screenshots/shawn-desktop.png';
  const mobileScreenshot =
    props.project?.mobileScreenshot ??
    props.mobileScreenshot ??
    desktopScreenshot;
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [screenTier, setScreenTier] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [modalOpen, setModalOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeTimedOut, setIframeTimedOut] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const canEmbedLive = Boolean(embedAllowed && iframeSrc);
  const hasDistinctMobileShot =
    Boolean(mobileScreenshot) && mobileScreenshot !== desktopScreenshot;

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

  const openInteractiveModal = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const defaultMode: ViewportMode =
      w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
    setViewport(defaultMode);
    if (canEmbedLive) {
      setIframeLoaded(false);
      setIframeTimedOut(false);
      setIframeKey((k) => k + 1);
    }
    setModalOpen(true);
  };

  useEffect(() => {
    if (!modalOpen || !canEmbedLive || iframeLoaded) return;
    const timer = window.setTimeout(() => {
      setIframeTimedOut(true);
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [modalOpen, canEmbedLive, iframeLoaded, iframeKey]);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [modalOpen]);

  const handleReload = () => {
    if (canEmbedLive) {
      setIframeLoaded(false);
      setIframeTimedOut(false);
      setIframeKey((k) => k + 1);
    }
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

  const renderDeviceContent = (activeMode: ViewportMode) => {
    if (canEmbedLive && iframeSrc && !iframeTimedOut) {
      return (
        <div className="relative h-full w-full bg-white">
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0D1017]/95 p-6 text-center text-[#F8F6F1]">
              <div className="mb-3 h-7 w-7 animate-spin rounded-full border-2 border-[#C85A17] border-t-transparent" />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#F59E6C]">
                Loading Interactive Preview
              </p>
              <p className="mt-1.5 text-xs text-stone-400">{liveUrl ?? iframeSrc}</p>
            </div>
          )}

          <iframe
            key={String(iframeKey)}
            src={iframeSrc}
            title={`Live preview of ${title}`}
            onLoad={() => setIframeLoaded(true)}
            className="h-full w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      );
    }

    const screenshotSrc =
      activeMode === 'mobile' && hasDistinctMobileShot
        ? mobileScreenshot
        : desktopScreenshot;

    return (
      <div className="relative h-full w-full overflow-y-auto bg-[#F8F6F1]">
        {canEmbedLive && iframeTimedOut && (
          <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 bg-[#EFECE4] px-4 py-2 text-xs text-[#12161F]">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-[#A84308]" />
              <span>
                Origin took longer than expected—showing verified production
                capture.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReload}
                className="cursor-pointer font-mono text-[11px] font-semibold text-[#A84308] underline"
              >
                Retry Live
              </button>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] font-semibold text-[#12161F] underline"
                >
                  Open Live Tab ↗
                </a>
              )}
            </div>
          </div>
        )}

        <div className="relative min-h-full w-full">
          <Image
            src={screenshotSrc}
            alt={`${title} ${activeMode} view`}
            fill
            sizes="(max-width: 1200px) 95vw, 1300px"
            className="object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  };

  const frameWrapperClasses =
    viewport === 'desktop'
      ? 'relative flex h-full w-full max-w-[1380px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.75)] transition-all duration-300'
      : viewport === 'tablet'
        ? 'relative flex h-full max-h-[920px] w-full max-w-[740px] flex-col overflow-hidden rounded-[32px] border-[12px] border-[#1D2230] bg-[#1D2230] shadow-[0_32px_95px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] transition-all duration-300'
        : 'relative flex h-full max-h-[820px] w-full max-w-[390px] flex-col overflow-hidden rounded-[48px] border-[11px] border-[#1D2230] bg-[#1D2230] shadow-[0_32px_95px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.14)] transition-all duration-300';

  const frameInnerScreenClasses =
    viewport === 'desktop'
      ? 'relative h-full w-full overflow-hidden bg-white'
      : viewport === 'tablet'
        ? 'relative h-full w-full overflow-hidden rounded-[20px] bg-white'
        : 'relative h-full w-full overflow-hidden rounded-[36px] bg-white';

  return (
    <>
      {/* 1. CLEAN HERO PREVIEW STAGE (Touch-ready on mobile, Hover Overlay on Desktop: "Interact with Site" + "Visit Live") */}
      <div className="group relative overflow-hidden rounded-2xl border border-[#12161F]/12 bg-white p-2.5 shadow-[0_14px_38px_rgba(18,22,31,0.06)] sm:p-3.5">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-stone-200/90 bg-[#F8F6F1]">
          <Image
            src={desktopScreenshot}
            alt={`${title} desktop preview`}
            fill
            priority
            sizes="(max-width: 1024px) 96vw, 880px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />

          {/* Mobile Inset Companion Card */}
          {hasDistinctMobileShot && (
            <div className="pointer-events-none absolute right-4 bottom-3 hidden h-[58%] w-[20%] max-w-[145px] overflow-hidden rounded-xl border-2 border-white bg-white shadow-[0_16px_36px_rgba(18,22,31,0.22)] transition-transform duration-500 group-hover:-translate-y-1 sm:block">
              <Image
                src={mobileScreenshot}
                alt={`${title} mobile preview`}
                fill
                sizes="150px"
                className="object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Center Hover Overlay on Desktop / Always-Tappable Action Overlay on Touch Devices */}
          <div className="absolute inset-0 z-20 flex flex-wrap items-end justify-center gap-2.5 bg-gradient-to-t from-[#12161F]/70 via-[#12161F]/15 to-transparent p-3 opacity-100 transition-all duration-300 sm:items-center sm:gap-3 sm:bg-[#12161F]/28 sm:px-4 sm:opacity-0 sm:backdrop-blur-[2px] sm:group-hover:opacity-100 sm:focus-within:opacity-100">
            <button
              type="button"
              data-testid="open-interactive-preview-btn"
              onClick={openInteractiveModal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#12161F] px-4 py-2 text-xs font-semibold text-[#F8F6F1] shadow-xl transition-all hover:scale-[1.02] hover:bg-[#C85A17] sm:px-6 sm:py-3 sm:text-sm"
            >
              <Play className="h-3.5 w-3.5 fill-current text-[#F59E6C]" />
              <span>Interact with Site</span>
            </button>

            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-[#12161F] shadow-xl transition-all hover:scale-[1.02] hover:border-[#C85A17] hover:text-[#A84308] sm:px-6 sm:py-3 sm:text-sm"
              >
                <span>Visit Live</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#A84308]" />
              </a>
            ) : githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-[#12161F] shadow-xl transition-all hover:scale-[1.02] hover:border-[#C85A17] hover:text-[#A84308] sm:px-6 sm:py-3 sm:text-sm"
              >
                <GitHubOfficialIcon className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* 2. TASKORA-STYLE MINIMAL FULLSCREEN MULTI-DEVICE INTERACTIVE STUDIO MODAL */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} Interactive Multi-Device Preview`}
          data-testid="interactive-preview-modal"
          className="fixed inset-0 z-[80] flex flex-col bg-[#080A0F]/96 text-[#F8F6F1] backdrop-blur-xl"
        >
          {/* Minimalist Top Bar: 3-Column Equal-Fr Grid Guarantees Device Switcher Icons Are 100% Centered From Screen Sides */}
          <div className="mx-auto grid w-full max-w-[1420px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6">
            {/* Left: Project Title */}
            <div className="flex min-w-0 items-center gap-2.5 justify-self-start pr-2">
              <p className="truncate font-display text-xs font-semibold text-white/90 sm:text-sm">
                {title}
              </p>
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
                        data-testid={`preview-device-${item.id}`}
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
              {canEmbedLive && (
                <button
                  type="button"
                  onClick={handleReload}
                  aria-label="Reload preview"
                  title="Reload preview"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-[#121621] text-stone-300 transition-colors hover:border-[#C85A17] hover:text-white"
                >
                  <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}

              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${title} in new tab`}
                  title="Open live website in new tab"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-[#121621] text-stone-300 transition-colors hover:border-[#C85A17] hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}

              <button
                type="button"
                data-testid="close-interactive-preview-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close interactive preview"
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
                setModalOpen(false);
              }
            }}
            className="flex flex-1 items-center justify-center overflow-hidden px-3 pb-4 pt-1 sm:px-6 sm:pb-6"
          >
            <div
              data-testid={`device-frame-${viewport}`}
              className={frameWrapperClasses}
            >
              {/* Tablet Top Camera Dot */}
              {viewport === 'tablet' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-1/2 z-30 -translate-x-1/2"
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-stone-600" />
                </div>
              )}

              {/* Mobile Top Dynamic Island Pill */}
              {viewport === 'mobile' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 left-1/2 z-30 flex h-5 w-24 -translate-x-1/2 items-center justify-end rounded-full bg-[#07090E] px-2.5 shadow-md"
                >
                  <span className="h-2 w-2 rounded-full bg-[#182238] ring-1 ring-white/10" />
                </div>
              )}

              <div className={frameInnerScreenClasses}>
                {renderDeviceContent(viewport)}
              </div>

              {/* Mobile Bottom Home Indicator Bar */}
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
    </>
  );
}
