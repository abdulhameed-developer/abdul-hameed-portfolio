'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/lib/portfolio-data';

const NAV_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Playground', href: '/playground' },
];

const PREFETCH_ROUTES = [
  '/',
  '/projects',
  '/expertise',
  '/about',
  '/services',
  '/playground',
  '/contact',
  '/projects/shawn-salon',
  '/projects/tjs-studysteps',
  '/services/website-development',
  '/resume',
];

let hasPrefetchedCoreRoutes = false;

export function BrandLogoMark({
  className = 'h-7 w-7',
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Architectural Monogram Frame */}
      <rect
        x="2"
        y="2"
        width="32"
        height="32"
        rx="9"
        fill={inverted ? '#12161F' : '#EFECE4'}
        stroke={inverted ? '#F59E6C' : '#12161F'}
        strokeOpacity={inverted ? '0.45' : '0.18'}
        strokeWidth="1.75"
      />
      {/* Left Geometric Code Chevron '<' */}
      <path
        d="M13.5 12.2L8.2 18L13.5 23.8"
        stroke={inverted ? '#F8F6F1' : '#12161F'}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Geometric Code Chevron '>' */}
      <path
        d="M22.5 12.2L27.8 18L22.5 23.8"
        stroke={inverted ? '#F8F6F1' : '#12161F'}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Warm Terracotta Architectural Slash '/' */}
      <path
        d="M19.8 10.8L16.2 25.2"
        stroke="#C85A17"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [past200vh, setPast200vh] = useState(false);
  const [expandedFromLogo, setExpandedFromLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [optimisticNav, setOptimisticNav] = useState<{
    fromPathname: string;
    targetHref: string;
  } | null>(null);

  const markPendingHref = (targetHref: string) => {
    setOptimisticNav({ fromPathname: pathname, targetHref });
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 900;
      const isScrolled = y > 16;
      const isDeepScroll = y > vh;

      setScrolled(isScrolled);
      setPast200vh(isDeepScroll);

      if (isDeepScroll && Math.abs(y - lastScrollY) > 65) {
        setExpandedFromLogo(false);
        lastScrollY = y;
      } else if (!isDeepScroll) {
        setExpandedFromLogo(false);
        lastScrollY = y;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Proactively prefetch primary routes once after initial idle so internal navigation is near-instant
  useEffect(() => {
    if (hasPrefetchedCoreRoutes) return;
    hasPrefetchedCoreRoutes = true;

    const timers: number[] = [];
    PREFETCH_ROUTES.forEach((route, idx) => {
      const timer = window.setTimeout(() => {
        try {
          router.prefetch(route);
        } catch {
          // Ignore prefetch errors
        }
      }, 200 + idx * 120);
      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [router]);

  const activePathname =
    optimisticNav && optimisticNav.fromPathname === pathname
      ? optimisticNav.targetHref
      : pathname;

  const isRouteActive = (href: string) => {
    return activePathname === href || activePathname.startsWith(`${href}/`);
  };

  const isContactActive = isRouteActive('/contact');
  const isLogoOnlyMode = past200vh && !expandedFromLogo && !mobileMenuOpen;

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? 'top-2.5 px-3 sm:top-3.5 sm:px-6' : 'top-0 px-0'
      }`}
    >
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-[#12161F] focus:px-4 focus:py-2.5 focus:font-sans focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      {/* Stage 3 (> 200vh Scroll): Compact Centered Custom Brand Logo Badge (Expands to Full Pill Dock on Click) */}
      {isLogoOnlyMode ? (
        <div className="mx-auto flex justify-center">
          <button
            type="button"
            data-testid="navbar-logo-compact-pill"
            aria-label="Expand navigation bar"
            title="Click to expand navigation"
            onClick={() => setExpandedFromLogo(true)}
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/80 bg-[#F8F6F1]/65 p-1.5 ring-1 ring-[#12161F]/12 shadow-[0_14px_34px_rgba(18,22,31,0.18),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:scale-105 hover:border-[#C85A17]"
          >
            <BrandLogoMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" inverted />
          </button>
        </div>
      ) : (
        /* Stage 1 (Top Wide Bar) & Stage 2 (Floating Frosted-Glass Pill Dock on Scroll) */
        <div
          data-testid="navbar-morph-shell"
          data-scrolled={scrolled ? 'true' : 'false'}
          data-stage={scrolled ? 'pill' : 'top'}
          style={{
            maxWidth: scrolled ? '810px' : '1360px',
            backdropFilter: scrolled
              ? 'blur(20px) saturate(180%)'
              : pathname !== '/'
                ? 'blur(12px) saturate(140%)'
                : undefined,
            WebkitBackdropFilter: scrolled
              ? 'blur(20px) saturate(180%)'
              : pathname !== '/'
                ? 'blur(12px) saturate(140%)'
                : undefined,
          }}
          className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? 'h-14 rounded-full border border-white/80 bg-[#F8F6F1]/62 px-4 ring-1 ring-[#12161F]/10 shadow-[0_16px_40px_-12px_rgba(18,22,31,0.14),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl backdrop-saturate-150 sm:px-5'
              : pathname === '/'
                ? 'h-16 border-b border-transparent bg-transparent px-4 sm:h-20 sm:px-6 lg:px-8'
                : 'h-16 border-b border-stone-200/75 bg-[#F8F6F1]/75 px-4 backdrop-blur-md sm:h-20 sm:px-6 lg:px-8'
          }`}
        >
          {/* Zone 1: Personal Brand Logo + Wordmark (Navigates Home) */}
          <Link
            href="/"
            prefetch={true}
            aria-label="Abdul Hameed — Home"
            onMouseEnter={() => router.prefetch('/')}
            onClick={() => {
              markPendingHref('/');
              setMobileMenuOpen(false);
            }}
            className="group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12161F]"
          >
            <BrandLogoMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
            <span
              className={`font-display font-bold tracking-tight text-[#12161F] transition-all duration-300 ${
                scrolled ? 'text-base' : 'text-base sm:text-lg'
              }`}
            >
              {DEVELOPER_PROFILE.name}
            </span>
          </Link>

          {/* Zone 2: Primary Text Navigation with Refined Top Spotlight Lamp Indicator (Taskora-Style) */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden items-center transition-all duration-300 md:flex ${
              scrolled ? 'md:gap-0.5 lg:gap-1' : 'md:gap-0.5 lg:gap-1.5'
            }`}
          >
            {NAV_LINKS.map((link) => {
              const active = isRouteActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  aria-current={active ? 'page' : undefined}
                  onMouseEnter={() => router.prefetch(link.href)}
                  onClick={() => {
                    markPendingHref(link.href);
                  }}
                  className={`group relative overflow-hidden whitespace-nowrap shrink-0 rounded-full py-1.5 text-sm transition-all duration-200 md:px-2.5 lg:px-4 ${
                    active
                      ? 'bg-[#EFECE4] font-semibold text-[#12161F] shadow-[inset_0_1px_0_rgba(200,90,23,0.22)]'
                      : 'font-medium text-stone-600 hover:bg-[#EFECE4]/65 hover:text-[#12161F]'
                  }`}
                >
                  {/* Top Lamp Bar */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#C85A17] transition-all duration-300 ${
                      active
                        ? 'w-6 opacity-100 shadow-[0_1px_8px_rgba(200,90,23,0.75)]'
                        : 'w-2 opacity-0 group-hover:w-5 group-hover:opacity-100'
                    }`}
                  />
                  {/* Soft Top Radial Spotlight Wash */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-2 top-0 h-4 bg-[radial-gradient(ellipse_at_top,rgba(200,90,23,0.18),transparent_75%)] transition-opacity duration-300 ${
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-90'
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Single Restrained Contact Pill + Mobile Menu Toggle (Consistent Normal Button Color Before & After Scroll) */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              prefetch={true}
              aria-current={isContactActive ? 'page' : undefined}
              onMouseEnter={() => router.prefetch('/contact')}
              onClick={() => {
                markPendingHref('/contact');
                setMobileMenuOpen(false);
              }}
              className={`group relative overflow-hidden whitespace-nowrap shrink-0 rounded-full font-semibold transition-all duration-300 ${
                scrolled ? 'px-4 py-1.5 text-xs sm:text-sm' : 'px-4 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm'
              } ${
                isContactActive
                  ? 'bg-[#C85A17] text-white shadow-xs'
                  : 'border border-stone-300/90 bg-white/95 text-[#12161F] hover:border-[#12161F] hover:bg-[#12161F] hover:text-[#F8F6F1]'
              }`}
            >
              <span className="relative z-10">Contact</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300/80 text-[#12161F] transition-colors hover:bg-stone-200/50 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-[850px] rounded-2xl border border-stone-200 bg-[#F8F6F1] px-5 pb-6 pt-3 shadow-xl md:hidden">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col divide-y divide-stone-200/70"
          >
            {[...NAV_LINKS, { label: 'Contact', href: '/contact' }].map(
              (link) => {
                const active = isRouteActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => {
                      markPendingHref(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between py-3.5 text-base transition-colors ${
                      active
                        ? 'font-semibold text-[#12161F]'
                        : 'font-medium text-stone-600 hover:text-[#12161F]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="font-mono text-xs text-[#A84308]">
                        Current
                      </span>
                    )}
                  </Link>
                );
              }
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
