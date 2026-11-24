'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUp, Mail } from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/lib/portfolio-data';
import { SocialIconRow } from '@/components/FloatingWhatsAppButton';
import { BrandLogoMark } from '@/components/Navbar';

const FANNED_SHOWCASE_CARDS = [
  {
    id: 'mustafai',
    title: 'Mustafai Help Mission',
    domain: 'mustafaihelpmission.com',
    category: 'Organization Portal',
    image: '/screenshots/mustafai-desktop.png',
    href: '/projects/mustafai-help-mission',
    position: 'far-left',
    zIndex: 10,
    restingTransform:
      'translate(-112%, 20px) perspective(1050px) rotateY(22deg) rotateZ(-7deg) scale(0.75)',
    hoverTransform:
      'translate(-112%, 6px) perspective(1050px) rotateY(10deg) rotateZ(-3deg) scale(0.83)',
  },
  {
    id: 'tjs',
    title: 'TJS StudySteps Portal',
    domain: 'tjsstudysteps.com',
    category: 'Education & Custom Plugins',
    image: '/screenshots/tjs-home-desktop.png',
    href: '/projects/tjs-studysteps',
    position: 'inner-left',
    zIndex: 20,
    restingTransform:
      'translate(-81%, 10px) perspective(1050px) rotateY(13deg) rotateZ(-3.5deg) scale(0.87)',
    hoverTransform:
      'translate(-81%, -4px) perspective(1050px) rotateY(5deg) rotateZ(-1.5deg) scale(0.93)',
  },
  {
    id: 'shawn',
    title: 'Shawn Salon & Aesthetics',
    domain: 'shawnsalon.com',
    category: 'Flagship Production Build',
    image: '/screenshots/shawn-desktop.png',
    href: '/projects/shawn-salon',
    position: 'center',
    zIndex: 30,
    restingTransform:
      'translate(-50%, 0px) perspective(1050px) rotateY(0deg) rotateZ(0deg) scale(1)',
    hoverTransform:
      'translate(-50%, -8px) perspective(1050px) rotateY(0deg) rotateZ(0deg) scale(1.03)',
  },
  {
    id: 'kamdani',
    title: 'Kamdani by Rana',
    domain: 'kamdanibyrana.com',
    category: 'Luxury Shopify Store',
    image: '/screenshots/kamdani-desktop.png',
    href: '/projects/kamdani-by-rana',
    position: 'inner-right',
    zIndex: 20,
    restingTransform:
      'translate(-19%, 10px) perspective(1050px) rotateY(-13deg) rotateZ(3.5deg) scale(0.87)',
    hoverTransform:
      'translate(-19%, -4px) perspective(1050px) rotateY(-5deg) rotateZ(1.5deg) scale(0.93)',
  },
  {
    id: 'pakseo',
    title: 'PakSEO AI Toolkit',
    domain: 'pakseo-ai.vercel.app',
    category: 'Next.js SEO Suite',
    image: '/screenshots/pakseo-desktop.png',
    href: '/projects/pakseo-ai',
    position: 'far-right',
    zIndex: 10,
    restingTransform:
      'translate(12%, 20px) perspective(1050px) rotateY(-22deg) rotateZ(7deg) scale(0.75)',
    hoverTransform:
      'translate(12%, 6px) perspective(1050px) rotateY(-10deg) rotateZ(3deg) scale(0.83)',
  },
] as const;

const WORDMARK_CHARS = [
  'A',
  'b',
  'd',
  'u',
  'l',
  'H',
  'a',
  'm',
  'e',
  'e',
  'd',
] as const;

export default function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkStageRef = useRef<HTMLDivElement>(null);
  const [activeFanId, setActiveFanId] = useState<string>('shawn');

  // Smooth interactive horizontal spotlight coordinate (0..100%) across the ABDULHAMEED wordmark
  const [spotlightX, setSpotlightX] = useState<number>(50);
  const [isWordmarkHovered, setIsWordmarkHovered] = useState<boolean>(false);
  const [hoveredCharIdx, setHoveredCharIdx] = useState<number | null>(null);
  const targetSpotlightRef = useRef<number>(50);
  const currentSpotlightRef = useRef<number>(50);

  // Smooth 60fps lerp for the horizon & wordmark spotlight so mouse/touch motion feels liquid-smooth
  useEffect(() => {
    let rafId: number;
    const animateSpotlight = () => {
      const diff = targetSpotlightRef.current - currentSpotlightRef.current;
      if (Math.abs(diff) > 0.08) {
        currentSpotlightRef.current += diff * 0.12;
        setSpotlightX(Number(currentSpotlightRef.current.toFixed(2)));
      }
      rafId = window.requestAnimationFrame(animateSpotlight);
    };
    rafId = window.requestAnimationFrame(animateSpotlight);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleWordmarkPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width <= 0) return;
      const relX = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      const pct = relX * 100;
      targetSpotlightRef.current = Math.max(8, Math.min(92, pct));
      const charIdx = Math.min(
        WORDMARK_CHARS.length - 1,
        Math.max(0, Math.floor(relX * WORDMARK_CHARS.length))
      );
      setHoveredCharIdx(charIdx);
    },
    []
  );

  const handleWordmarkPointerLeave = useCallback(() => {
    setIsWordmarkHovered(false);
    setHoveredCharIdx(null);
    targetSpotlightRef.current = 50;
  }, []);

  return (
    <footer
      ref={footerRef}
      data-gsap-ignore="true"
      className="relative overflow-hidden border-t border-stone-200/90 bg-[#F8F6F1] text-[#12161F] print:hidden"
    >
      {/* Pre-Footer Showcase Banner — Editorial Copy on Left + 5-Card 3D Fanned Project Deck with Concentric Orbit Rings on Right */}
      <div className="mx-auto max-w-[1360px] px-5 pt-12 sm:px-8 sm:pt-16">
        <div
          data-testid="footer-showcase-banner"
          className="relative overflow-hidden rounded-3xl border border-[#12161F]/12 bg-[#EFECE4]/90 p-6 pb-8 shadow-[0_20px_54px_rgba(18,22,31,0.06)] sm:p-10 lg:p-12"
        >
          {/* Ambient Warm Radial Spotlight Behind Right 3D Fan */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-20 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,90,23,0.18)_0%,transparent_70%)] blur-2xl"
          />

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
            {/* Left Copy & Direct Contact Pills (5 Cols on Desktop — Clean Editorial Heading Without Top Chip) */}
            <div className="relative z-20 lg:col-span-5 lg:pr-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#12161F] sm:text-4xl lg:text-[2.5rem] leading-[1.08]">
                Full-stack web products built with{' '}
                <span className="font-serif font-normal italic text-[#A84308]">
                  clean code.
                </span>
              </h2>

              <p className="mt-3.5 max-w-md text-xs leading-relaxed text-stone-700 sm:text-sm">
                Every website, custom PHP WordPress plugin, Shopify storefront,
                and Next.js application in this portfolio is engineered across
                frontend and backend—supported by modern AI workflows (
                <span className="font-semibold text-[#12161F]">
                  Cursor, Claude, Gemini, and ChatGPT
                </span>
                ) and thorough multi-device verification.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#12161F]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#12161F] shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#C85A17] hover:text-[#A84308]"
                >
                  <Mail className="h-3.5 w-3.5 text-[#A84308]" aria-hidden="true" />
                  <span>{DEVELOPER_PROFILE.email}</span>
                </a>

                <Link
                  href="/contact"
                  prefetch={true}
                  className="inline-flex items-center gap-2 rounded-full bg-[#12161F] px-5 py-2.5 text-xs font-semibold text-[#F8F6F1] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-[#C85A17]"
                >
                  <span>Start a Conversation</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Column: Concentric Orbit Rings + Glowing Orbital Node + 5-Card 3D Curved Project Fan */}
            <div className="relative flex min-h-[215px] items-center justify-center py-4 sm:min-h-[265px] lg:col-span-7 lg:min-h-[285px]">
              {/* Concentric Radar / Orbit Rings Behind the 5 Fanned Screens */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                {/* Outer Ring */}
                <div className="absolute h-[290px] w-[290px] rounded-full border border-[#12161F]/[0.09] sm:h-[420px] sm:w-[420px] lg:h-[460px] lg:w-[460px]" />
                {/* Middle Ring with Glowing Orbital Node */}
                <div className="relative h-[220px] w-[220px] rounded-full border border-[#12161F]/[0.12] sm:h-[320px] sm:w-[320px] lg:h-[350px] lg:w-[350px]">
                  <span className="absolute -top-1.5 left-1/2 flex h-3.5 w-3.5 -translate-x-1/2 items-center justify-center lg:top-[12%] lg:left-[18%]">
                    <span className="absolute h-7 w-7 rounded-full bg-[#C85A17]/35 blur-[5px]" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-[#C85A17] ring-2 ring-white shadow-[0_0_12px_#C85A17]" />
                  </span>
                </div>
                {/* Inner Ring */}
                <div className="absolute h-[150px] w-[150px] rounded-full border border-[#12161F]/[0.14] sm:h-[220px] sm:w-[220px] lg:h-[240px] lg:w-[240px]" />
              </div>

              {/* 5-Card 3D Fanned Project Showcase Stage */}
              <div
                data-testid="footer-fanned-cards-stage"
                onMouseLeave={() => setActiveFanId('shawn')}
                className="relative z-10 flex h-[175px] w-full max-w-[680px] items-center justify-center sm:h-[225px] lg:h-[245px]"
              >
                {FANNED_SHOWCASE_CARDS.map((card) => {
                  const isActive = activeFanId === card.id;
                  const isCenter = card.position === 'center';

                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      prefetch={true}
                      data-footer-fan-card={card.id}
                      onMouseEnter={() => setActiveFanId(card.id)}
                      aria-label={`Inspect ${card.title} (${card.domain}) case study`}
                      style={{
                        left: '50%',
                        zIndex: isActive ? 45 : card.zIndex,
                        transform: isActive
                          ? card.hoverTransform
                          : card.restingTransform,
                      }}
                      className={`group absolute top-2 flex flex-col overflow-hidden rounded-xl border bg-[#12161F] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCenter
                          ? 'h-[145px] w-[180px] sm:h-[196px] sm:w-[265px] lg:h-[212px] lg:w-[295px]'
                          : 'h-[135px] w-[165px] sm:h-[184px] sm:w-[245px] lg:h-[198px] lg:w-[270px]'
                      } ${
                        isActive
                          ? 'border-[#C85A17] shadow-[0_24px_52px_rgba(18,22,31,0.42),0_0_24px_rgba(200,90,23,0.34)]'
                          : 'border-white/25 opacity-95 shadow-[0_16px_36px_rgba(18,22,31,0.28)] hover:opacity-100'
                      }`}
                    >
                      {/* Mini Browser Chrome Bar */}
                      <div className="flex h-5 shrink-0 items-center justify-between border-b border-white/10 bg-[#181E2C] px-2.5 sm:h-6">
                        <div className="flex items-center gap-1" aria-hidden="true">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C85A17]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="truncate font-mono text-[8px] font-medium text-stone-300 sm:text-[9px]">
                          {card.domain}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>

                      {/* Project Screenshot Viewport */}
                      <div className="relative flex-1 w-full overflow-hidden bg-[#0D111A]">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-width: 640px) 190px, 300px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                          referrerPolicy="no-referrer"
                        />
                        {/* Bottom Caption Overlay */}
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-[#0D111A]/95 via-[#0D111A]/70 to-transparent px-2.5 pt-4 pb-1.5">
                          <span className="truncate font-display text-[10px] font-bold text-white sm:text-xs">
                            {card.title}
                          </span>
                          <span className="shrink-0 rounded-full bg-[#C85A17] px-1.5 py-0.5 font-mono text-[8px] font-semibold text-white">
                            Case Study
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Structured Footer Columns (Constrained to max-w-[1360px] px-5 sm:px-8) */}
      <div className="mx-auto max-w-[1360px] px-5 pt-12 pb-2 sm:px-8 sm:pt-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Personal Brand Identity + Icon-Only Social Links */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Abdul Hameed — Home"
              className="group inline-flex items-center gap-2.5"
            >
              <BrandLogoMark className="h-7 w-7 transition-transform duration-300 group-hover:scale-105" />
              <span className="font-display text-lg font-bold tracking-tight text-[#12161F]">
                {DEVELOPER_PROFILE.name}
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-xs leading-relaxed text-stone-600 sm:text-sm">
              Full-Stack Web Developer designing and engineering responsive
              business websites, custom PHP WordPress plugins, Shopify
              storefronts, and Next.js applications.
            </p>

            {/* Clean Circular Icon-Only Profile Links (GitHub, LinkedIn, WordPress, WhatsApp, Mail) */}
            <SocialIconRow className="mt-5" />
          </div>

          {/* Column 2: Portfolio Navigation */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-600">
              Portfolio
            </p>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-stone-700 sm:text-sm">
              <li>
                <Link
                  href="/projects"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Projects &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Services &amp; Capabilities
                </Link>
              </li>
              <li>
                <Link
                  href="/expertise"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Technical Expertise
                </Link>
              </li>
              <li>
                <Link
                  href="/playground"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Interactive Playground
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Selected Case Studies */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-600">
              Selected Case Studies
            </p>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-stone-700 sm:text-sm">
              <li>
                <Link
                  href="/projects/shawn-salon"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Shawn Salon &amp; Aesthetics
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/tjs-studysteps"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  TJS StudySteps Education Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/kamdani-by-rana"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Kamdani by Rana Luxury Store
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/mustafai-help-mission"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Mustafai Help Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/pakseo-ai"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  PakSEO AI Analyzer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & AI Discovery */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-600">
              Resources &amp; AI
            </p>
            <ul className="mt-4 space-y-2.5 text-xs font-medium text-stone-700 sm:text-sm">
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Project Brief Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  prefetch={true}
                  className="transition-colors hover:text-[#A84308]"
                >
                  Printable Résumé (A4)
                </Link>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="font-mono text-xs text-stone-600 transition-colors hover:text-[#A84308]"
                >
                  sitemap.xml
                </a>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  aria-label="LLMs.txt — Structured portfolio index for AI agents"
                  className="font-mono text-xs text-stone-600 transition-colors hover:text-[#A84308]"
                >
                  llms.txt
                </a>
              </li>
              <li>
                <a
                  href="/llms-full.txt"
                  className="font-mono text-xs text-stone-600 transition-colors hover:text-[#A84308]"
                >
                  llms-full.txt
                </a>
              </li>
              <li>
                <a
                  href="/.well-known/agent.json"
                  className="font-mono text-xs text-stone-600 transition-colors hover:text-[#A84308]"
                >
                  agent.json
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FYNITEKITS-STYLE GIANT ARCHITECTURAL WORDMARK & 3D PLANETARY HORIZON STAGE:
          - 100% unified #F8F6F1 background above and below the horizon curve
          - Single soft, faded monochrome wordmark at rest + interactive magnetic per-letter hover wave & cursor-tracking horizon spotlight
          - Pronounced 3D planetary horizon curve touching both left & right screen ends and curving gracefully across the lower base of ABDULHAMEED */}
      <div
        ref={wordmarkStageRef}
        onPointerEnter={() => setIsWordmarkHovered(true)}
        onPointerMove={handleWordmarkPointerMove}
        onPointerLeave={handleWordmarkPointerLeave}
        className="group/wordmark relative mt-4 w-full select-none bg-[#F8F6F1] pt-6 sm:pt-10"
      >
        <div
          data-testid="footer-giant-wordmark"
          className="relative w-full overflow-hidden bg-[#F8F6F1]"
        >
          {/* Upward Planetary Atmospheric Glow Behind the Wordmark (Smoothly Tracks Cursor on Hover Like FyniteKits) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[92%] transition-opacity duration-500"
            style={{
              background: `radial-gradient(46% 78% at ${spotlightX}% 88%, rgba(200, 90, 23, ${
                isWordmarkHovered ? 0.22 : 0.11
              }) 0%, rgba(18, 22, 31, ${
                isWordmarkHovered ? 0.06 : 0.03
              }) 48%, transparent 80%)`,
            }}
          />

          {/* Interactive Per-Character Monumental Wordmark Row (Centered & Aligned Exactly to Site Width max-w-[1360px] px-5 sm:px-8) */}
          <div
            role="img"
            aria-label="AbdulHameed"
            data-testid="footer-wordmark-row"
            className="relative z-0 mx-auto flex w-full max-w-[1360px] translate-y-[3.5%] items-baseline justify-between px-5 pt-3 pb-0 sm:translate-y-[2.5%] sm:px-8 sm:pt-5 lg:translate-y-[1.5%]"
          >
            {WORDMARK_CHARS.map((char, idx) => {
              const dist =
                hoveredCharIdx !== null ? Math.abs(hoveredCharIdx - idx) : 99;
              const isDirectHover = isWordmarkHovered && dist === 0;
              const isNearHover = isWordmarkHovered && dist === 1;
              const isOuterHover = isWordmarkHovered && dist === 2;

              const liftClass = isDirectHover
                ? '-translate-y-2.5 sm:-translate-y-4 scale-[1.03]'
                : isNearHover
                  ? '-translate-y-1.5 sm:-translate-y-2.5 scale-[1.015]'
                  : isOuterHover
                    ? '-translate-y-0.5 sm:-translate-y-1'
                    : 'translate-y-0 scale-100';

              const colorClass = isDirectHover
                ? 'from-[#12161F]/48 via-[#12161F]/34 to-[#C85A17]/28'
                : isNearHover
                  ? 'from-[#12161F]/36 via-[#12161F]/24 to-[#C85A17]/18'
                  : 'from-[#12161F]/26 via-[#12161F]/18 to-[#12161F]/13';

              const edgeOpticalAlign =
                idx === 0
                  ? '-ml-[0.03em]'
                  : idx === WORDMARK_CHARS.length - 1
                    ? '-mr-[0.03em]'
                    : '';

              return (
                <span
                  key={`${char}-${idx}`}
                  data-wordmark-char-idx={idx}
                  onPointerEnter={() => {
                    setIsWordmarkHovered(true);
                    setHoveredCharIdx(idx);
                  }}
                  className={`inline-block shrink-0 cursor-pointer bg-gradient-to-b bg-clip-text font-display text-[13vw] leading-[0.82] font-extrabold tracking-[-0.03em] text-transparent transition-all duration-300 ease-out sm:text-[13.2vw] lg:text-[13.4vw] xl:text-[11.2rem] ${edgeOpticalAlign} ${liftClass} ${colorClass}`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Full-Bleed 3D Planetary Horizon Arch SVG (FyniteKits Reference Curvature):
              - Spans 100% viewport width (0 to 1440) touching both screen edges at y=92
              - First letter ('A') and last letter ('d') just touch the curved horizon line at their bottom feet across all devices */}
          <svg
            aria-hidden="true"
            data-testid="footer-horizon-svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 block h-[41%] w-full overflow-visible sm:h-[42%]"
          >
            <defs>
              <linearGradient
                id="footer-horizon-stroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#C85A17" stopOpacity="0.38" />
                <stop offset="18%" stopColor="#C85A17" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#A84308" stopOpacity="1" />
                <stop offset="82%" stopColor="#C85A17" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#C85A17" stopOpacity="0.38" />
              </linearGradient>

              <linearGradient
                id="footer-horizon-rim-glow"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#C85A17"
                  stopOpacity={isWordmarkHovered ? '0.24' : '0.15'}
                />
                <stop offset="48%" stopColor="#C85A17" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#F8F6F1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Exact #F8F6F1 Planetary Dome Fill Gently Masking the Lower Base of the Wordmark Along the Sweeping Arc */}
            <path
              d="M -10,92 Q 720,-6 1450,92 L 1450,104 L -10,104 Z"
              fill="#F8F6F1"
            />

            {/* 3D Planetary Inner Horizon Rim Glow Fading Seamlessly Into #F8F6F1 */}
            <path
              d="M -10,92 Q 720,-6 1450,92 L 1450,104 L -10,104 Z"
              fill="url(#footer-horizon-rim-glow)"
            />

            {/* Soft Atmospheric Outer Halo Along the Planetary Curve */}
            <path
              d="M -10,92 Q 720,-6 1450,92"
              fill="none"
              stroke="#C85A17"
              strokeOpacity={isWordmarkHovered ? '0.28' : '0.18'}
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Crisp Continuous Sweeping Planetary Horizon Line Touching Left & Right Screen Ends */}
            <path
              d="M -10,92 Q 720,-6 1450,92"
              fill="none"
              stroke="url(#footer-horizon-stroke)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom Legal & Back-to-Top Bar (Identical #F8F6F1 Background, Clean Without Bottom Sitemap Link) */}
        <div className="relative z-20 mx-auto max-w-[1360px] bg-[#F8F6F1] px-5 pt-4 pb-7 sm:px-8 sm:pt-5">
          <div className="grid grid-cols-1 items-center gap-3.5 text-xs text-stone-600 lg:grid-cols-3">
            <p className="text-center lg:justify-self-start lg:text-left">
              © 2026 {DEVELOPER_PROFILE.name}. All rights reserved.
            </p>

            <div className="flex justify-center lg:justify-self-center">
              <a
                href="#main-content"
                aria-label="Scroll back to top of page"
                data-testid="footer-back-to-top"
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-300/90 bg-white px-4 py-1.5 text-xs font-semibold text-[#12161F] shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#C85A17] hover:text-[#A84308]"
              >
                <span>Back to top</span>
                <ArrowUp
                  className="h-3.5 w-3.5 text-[#A84308]"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </div>
    </footer>
  );
}
