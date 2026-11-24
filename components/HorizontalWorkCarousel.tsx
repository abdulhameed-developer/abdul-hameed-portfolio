'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/portfolio-data';
import { BrandLogoMark } from '@/components/Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_DECK_THEMES = [
  {
    gradient: 'from-[#17375E] via-[#122A49] to-[#0C1D33] border-[#5B9BD5]/35',
    glow: 'rgba(91, 155, 213, 0.34)',
  },
  {
    gradient: 'from-[#7C3A16] via-[#5C2B10] to-[#3B1B0A] border-[#F59E6C]/35',
    glow: 'rgba(245, 158, 108, 0.34)',
  },
  {
    gradient: 'from-[#184D40] via-[#123A30] to-[#0B241E] border-[#52B79A]/35',
    glow: 'rgba(82, 183, 154, 0.34)',
  },
  {
    gradient: 'from-[#3B2667] via-[#2C1C4E] to-[#1B1132] border-[#9B7EDE]/35',
    glow: 'rgba(155, 126, 222, 0.34)',
  },
  {
    gradient: 'from-[#3E2F23] via-[#2B2018] to-[#1A130E] border-[#E09F67]/35',
    glow: 'rgba(224, 159, 103, 0.34)',
  },
  {
    gradient: 'from-[#16425B] via-[#103043] to-[#0A1E2B] border-[#6BA8C9]/35',
    glow: 'rgba(107, 168, 201, 0.34)',
  },
  {
    gradient: 'from-[#4A2511] via-[#33190B] to-[#1F0F06] border-[#D97941]/35',
    glow: 'rgba(217, 121, 65, 0.34)',
  },
];

export default function HorizontalWorkCarousel() {
  const router = useRouter();
  const projects = getFeaturedProjects();
  // Duplicate items once for seamless infinite looping on Desktop & Tablet; second half is marked aria-hidden
  const loopItems = [...projects, ...projects];

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mobile scroll-driven 3D stacked deck refs
  const mobileRunwayRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileBackdropRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const offsetRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const activeIndexRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isInViewportRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isTweeningRef = useRef(false);
  const stepTweenRef = useRef<gsap.core.Tween | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const measureSingleSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const totalWidth = track.scrollWidth;
    const halfWidth = totalWidth / 2;
    singleSetWidthRef.current = halfWidth;
    return halfWidth;
  }, []);

  const syncActiveIndexFromOffset = useCallback(
    (wrappedOffset: number, halfWidth: number) => {
      if (halfWidth <= 0 || projects.length === 0) return;
      const itemSpan = halfWidth / projects.length;
      const idx = Math.round(wrappedOffset / itemSpan) % projects.length;
      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx;
        setActiveIndex(idx);
      }
    },
    [projects.length]
  );

  const applyWrappedOffset = useCallback(
    (nextOffset: number) => {
      const track = trackRef.current;
      if (!track) return;
      const halfWidth = singleSetWidthRef.current || measureSingleSetWidth();
      if (halfWidth <= 0) return;

      const wrapped = ((nextOffset % halfWidth) + halfWidth) % halfWidth;
      offsetRef.current = wrapped;
      gsap.set(track, { x: -wrapped, force3D: true });
      syncActiveIndexFromOffset(wrapped, halfWidth);
    },
    [measureSingleSetWidth, syncActiveIndexFromOffset]
  );

  const goToProjectIndex = useCallback(
    (targetIndex: number) => {
      const normalized =
        ((targetIndex % projects.length) + projects.length) % projects.length;
      activeIndexRef.current = normalized;
      setActiveIndex(normalized);

      const halfWidth = singleSetWidthRef.current || measureSingleSetWidth();
      if (halfWidth <= 0 || projects.length === 0) return;

      const itemSpan = halfWidth / projects.length;
      const targetOffset = normalized * itemSpan;

      if (reducedMotion && viewportRef.current) {
        viewportRef.current.scrollTo({
          left: targetOffset,
          behavior: 'smooth',
        });
        return;
      }

      if (stepTweenRef.current) {
        stepTweenRef.current.kill();
        stepTweenRef.current = null;
      }

      const startOffset = offsetRef.current;
      let delta = targetOffset - startOffset;
      if (delta > halfWidth / 2) delta -= halfWidth;
      if (delta < -halfWidth / 2) delta += halfWidth;

      const proxy = { value: startOffset };
      isTweeningRef.current = true;
      setIsPaused(true);

      stepTweenRef.current = gsap.to(proxy, {
        value: startOffset + delta,
        duration: 0.65,
        ease: 'power3.out',
        onUpdate: () => {
          applyWrappedOffset(proxy.value);
        },
        onComplete: () => {
          isTweeningRef.current = false;
          stepTweenRef.current = null;
          if (
            !isHoveredRef.current &&
            !isFocusedRef.current &&
            !isDraggingRef.current
          ) {
            setIsPaused(false);
          }
        },
      });
    },
    [applyWrappedOffset, measureSingleSetWidth, projects.length, reducedMotion]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () =>
      mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    measureSingleSetWidth();
    const handleResize = () => {
      measureSingleSetWidth();
      applyWrappedOffset(offsetRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [applyWrappedOffset, measureSingleSetWidth]);

  // Pause work only when carousel is far outside viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isInViewportRef.current = entry.isIntersecting;
        });
      },
      { rootMargin: '600px 0px', threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Continuous seamless GSAP ticker loop for Desktop & Tablet (>= 640px)
  useEffect(() => {
    if (reducedMotion) {
      if (trackRef.current) {
        gsap.set(trackRef.current, { x: 0 });
      }
      return;
    }

    const speedPerFrameAt60Hz = 0.82;

    const tick = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 640) {
        return;
      }
      if (
        isHoveredRef.current ||
        isFocusedRef.current ||
        isDraggingRef.current ||
        isTweeningRef.current ||
        !isInViewportRef.current
      ) {
        return;
      }

      const halfWidth = singleSetWidthRef.current || measureSingleSetWidth();
      if (halfWidth <= 0) return;

      const deltaRatio = Math.min(2.5, Math.max(0.5, gsap.ticker.deltaRatio(60)));
      applyWrappedOffset(offsetRef.current + speedPerFrameAt60Hz * deltaRatio);
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      if (stepTweenRef.current) {
        stepTweenRef.current.kill();
      }
    };
  }, [applyWrappedOffset, measureSingleSetWidth, reducedMotion]);

  // Mobile (< 640px) Scroll-Driven GSAP 3D Stacked Deck:
  // As the user scrolls down through the mobile runway, each card advances smoothly from 2nd backdrop slot into 1st foreground slot via GSAP
  useEffect(() => {
    const runway = mobileRunwayRef.current;
    if (!runway || projects.length === 0) return;

    const total = projects.length;

    const applyMobileStackAtProgress = (rawProgress: number) => {
      const clamped = Math.max(0, Math.min(1, rawProgress));
      const rawFloatIdx = clamped * (total - 1);
      const baseIdx = Math.floor(rawFloatIdx);
      const rawFrac = rawFloatIdx - baseIdx;
      // Hold each card centered for the first 42% of its scroll step, then smoothly transition over the remaining 58%
      const smoothFrac =
        rawFrac <= 0.42 ? 0 : (rawFrac - 0.42) / 0.58;
      const floatIdx = Math.min(total - 1, baseIdx + smoothFrac);
      const nearestIdx = Math.round(floatIdx);

      if (nearestIdx !== activeIndexRef.current) {
        activeIndexRef.current = nearestIdx;
        setActiveIndex(nearestIdx);
      }

      // Fractional step transition [0..1] between current card and next card
      const frac = floatIdx - Math.floor(floatIdx);

      // Animate the ambient backdrop card advancing from 2nd position into 1st position as the user scrolls
      if (mobileBackdropRef.current) {
        const nextThemeIdx = Math.min(total - 1, Math.floor(floatIdx) + 1);
        const backdropGlow =
          MOBILE_DECK_THEMES[nextThemeIdx % MOBILE_DECK_THEMES.length].glow;
        const bx = (1 - frac) * 22;
        const by = (1 - frac) * 12;
        const brot = (1 - frac) * 5.5;
        const bscale = 0.93 + frac * 0.07;

        gsap.set(mobileBackdropRef.current, {
          x: bx,
          y: by,
          rotation: brot,
          scale: bscale,
          background: `radial-gradient(circle at 50% 45%, ${backdropGlow}, rgba(18,22,31,0.14) 72%)`,
          force3D: true,
        });
      }

      mobileCardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const diff = idx - floatIdx; // 0 = front active card, +1 = 2nd card in backdrop, +2 = 3rd card, < 0 = scrolled past

        let x = 0;
        let y = 0;
        let rotation = 0;
        let scale = 1;
        let opacity = 1;
        // Strictly decreasing z-index by card index so card k is always above card k+1 (zero z-index ties)
        const zIndex = 50 - idx;

        if (diff < 0) {
          // Card scrolling out of 1st position (glides full-width left so it clears the incoming card before fading)
          const out = Math.min(1.2, -diff);
          x = -out * 330;
          y = -out * 44;
          rotation = -out * 14;
          scale = 1 - out * 0.05;
          opacity =
            out <= 0.55 ? 1 : Math.max(0, 1 - (out - 0.55) / 0.45);
        } else if (diff <= 1) {
          // Card advancing from 2nd backdrop slot (diff=1) into 1st foreground slot (diff=0)
          x = diff * 20;
          y = diff * 10;
          rotation = diff * 4.8;
          scale = 1 - diff * 0.07;
          opacity = 1;
        } else if (diff <= 2) {
          // Card advancing from 3rd slot (diff=2) into 2nd backdrop slot (diff=1)
          const t = diff - 1; // 0..1
          x = 20 + t * 15;
          y = 10 + t * 10;
          rotation = 4.8 + t * 3.5;
          scale = 0.93 - t * 0.07;
          opacity = 1;
        } else if (diff <= 3) {
          // Deep stack card waiting behind 3rd slot
          const t = diff - 2;
          x = 35 + t * 10;
          y = 20 + t * 10;
          rotation = 8.3 + t * 2;
          scale = 0.86 - t * 0.06;
          opacity = Math.max(0, 1 - t);
        } else {
          x = 45;
          y = 30;
          rotation = 10.3;
          scale = 0.8;
          opacity = 0;
        }

        cardEl.style.zIndex = String(zIndex);
        cardEl.style.pointerEvents =
          diff >= -0.35 && diff <= 0.45 ? 'auto' : 'none';

        gsap.set(cardEl, {
          x,
          y,
          rotation,
          scale,
          opacity,
          force3D: true,
        });
      });
    };

    const computeScrollProgress = () => {
      if (typeof window === 'undefined' || window.innerWidth >= 640) return;
      const rect = runway.getBoundingClientRect();
      const stickyStartOffset = 96; // top-24 sticky lock position
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight * 0.72);
      const scrolled = stickyStartOffset - rect.top;
      const progress = scrolled / scrollableDistance;
      applyMobileStackAtProgress(progress);
    };

    computeScrollProgress();

    const trigger = ScrollTrigger.create({
      trigger: runway,
      start: 'top 96px',
      end: 'bottom 75%',
      scrub: 0.25,
      onUpdate: (self) => {
        if (window.innerWidth < 640) {
          applyMobileStackAtProgress(self.progress);
        }
      },
    });

    window.addEventListener('scroll', computeScrollProgress, { passive: true });
    window.addEventListener('resize', computeScrollProgress);

    return () => {
      trigger.kill();
      window.removeEventListener('scroll', computeScrollProgress);
      window.removeEventListener('resize', computeScrollProgress);
    };
  }, [projects.length]);

  // Support trackpad horizontal wheel on Desktop & Tablet without trapping vertical scroll
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) {
        return;
      }
      e.preventDefault();
      applyWrappedOffset(offsetRef.current + e.deltaX);
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [applyWrappedOffset]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (stepTweenRef.current) {
      stepTweenRef.current.kill();
      stepTweenRef.current = null;
      isTweeningRef.current = false;
    }
    isDraggingRef.current = true;
    setIsPaused(true);
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = dragStartXRef.current - e.clientX;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(dx));
    applyWrappedOffset(dragStartOffsetRef.current + dx);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    if (!isHoveredRef.current && !isFocusedRef.current) {
      setIsPaused(false);
    }
  };

  const handleItemActivate = (
    e: React.MouseEvent<HTMLElement>,
    slug: string
  ) => {
    if (dragDistanceRef.current > 8) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    router.push(`/projects/${slug}`);
  };

  return (
    <section
      ref={sectionRef}
      id="selected-work-carousel"
      data-gsap-ignore="true"
      aria-labelledby="selected-work-heading"
      className="relative border-b border-stone-200/80 bg-[#EFECE4] py-14 sm:overflow-hidden sm:py-22"
    >
      {/* Section Header */}
      <div className="mx-auto mb-8 max-w-[1360px] px-5 sm:mb-10 sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#A84308]">
              Portfolio Showcase · Featured Production Builds
            </p>
            <h2
              id="selected-work-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-[#12161F] sm:text-5xl"
            >
              Selected Work
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-stone-700 sm:text-sm">
              Scroll through the stacked project deck on mobile, drag
              horizontally on desktop and tablet, or select any project to
              inspect its full case study.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-[#12161F] px-4 py-2.5 text-xs font-semibold text-[#F8F6F1] transition-colors hover:bg-[#A84308]"
            >
              <span>All Case Studies</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* 1. MOBILE VIEW ONLY (< 640px): Scroll-Driven GSAP 3D Stacked Card Deck
          - Pure scroll interaction: no dots, no arrows, no card numbers
          - Backdrop card smoothly advances from 2nd slot to 1st slot as the user scrolls */}
      <div
        ref={mobileRunwayRef}
        data-testid="mobile-stacked-work-deck"
        style={{ height: `${projects.length * 290 + 220}px` }}
        className="relative w-full sm:hidden"
      >
        <div className="sticky top-20 flex h-[435px] w-full items-center justify-center overflow-hidden px-4">
          <div className="relative flex h-[405px] w-full max-w-[345px] items-center justify-center [perspective:1200px]">
            {/* Ambient GSAP Backdrop Layer that Advances from 2nd Card to 1st Card on Scroll */}
            <div
              ref={mobileBackdropRef}
              aria-hidden="true"
              data-testid="mobile-deck-gsap-backdrop"
              className="pointer-events-none absolute h-[388px] w-[292px] rounded-[28px] border border-[#C85A17]/30 shadow-[0_24px_55px_rgba(18,22,31,0.25)] backdrop-blur-xs will-change-transform"
            />

            {projects.map((project, idx) => {
              const theme =
                MOBILE_DECK_THEMES[idx % MOBILE_DECK_THEMES.length];
              const domainLabel = project.liveUrl
                ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
                : project.slug;
              const isFront = activeIndex === idx;

              return (
                <article
                  key={`mobile-deck-${project.id}`}
                  ref={(el) => {
                    mobileCardRefs.current[idx] = el;
                  }}
                  data-mobile-deck-card={idx}
                  data-active={isFront ? 'true' : 'false'}
                  onClick={() => {
                    router.push(`/projects/${project.slug}`);
                  }}
                  className={`absolute flex h-[392px] w-[294px] cursor-pointer flex-col justify-between overflow-hidden rounded-[26px] border bg-gradient-to-b p-4 text-[#F8F6F1] shadow-[0_26px_60px_rgba(18,22,31,0.42)] will-change-transform ${theme.gradient}`}
                >
                  {/* Radial Metallic Shimmer Overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.16),transparent_65%)]"
                  />

                  {/* Top Header Row (Brand Monogram + Domain on Left, Category Tag on Right) */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <BrandLogoMark className="h-6 w-6 shrink-0" inverted />
                      <span className="truncate font-mono text-[11px] font-bold tracking-tight text-white/95">
                        {domainLabel}
                      </span>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-white/12 px-2.5 py-0.5 font-mono text-[9px] font-semibold text-white/85 backdrop-blur-xs">
                      {project.category}
                    </span>
                  </div>

                  {/* Center Framed Website Preview Window */}
                  <div className="relative z-10 my-2.5 h-[164px] w-full overflow-hidden rounded-2xl border border-white/20 bg-[#0B0F17] shadow-[0_14px_32px_rgba(0,0,0,0.45)]">
                    <Image
                      src={project.desktopScreenshot}
                      alt={`${project.title} preview`}
                      fill
                      sizes="280px"
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    {project.mobileScreenshot &&
                      project.mobileScreenshot !== project.desktopScreenshot && (
                        <div className="absolute right-2 bottom-1.5 h-[62%] w-[23%] overflow-hidden rounded-lg border border-white/40 bg-[#0B0F17] shadow-lg">
                          <Image
                            src={project.mobileScreenshot}
                            alt=""
                            fill
                            sizes="68px"
                            className="object-cover object-top"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                  </div>

                  {/* Center Editorial Title & Short Summary */}
                  <div className="relative z-10 text-center">
                    <h3 className="truncate font-display text-lg font-bold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-white/75">
                      {project.summary}
                    </p>
                  </div>

                  {/* Bottom Card Footer Metadata (Core Stack on Left, Case Study Action on Right — Zero Card Numbers) */}
                  <div className="relative z-10 mt-2 flex items-center justify-between gap-2 border-t border-white/15 pt-2.5">
                    <div className="min-w-0">
                      <p className="font-mono text-[8px] uppercase tracking-wider text-white/55">
                        Core Stack
                      </p>
                      <p className="truncate font-mono text-[10px] font-semibold text-white/90">
                        {project.techStack.slice(0, 2).join(' · ')}
                      </p>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/18 px-3 py-1 font-mono text-[10px] font-semibold text-white backdrop-blur-xs">
                      <span>Case Study</span>
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. DESKTOP & TABLET VIEW (>= 640px): Interactive Horizontal Track with 3D Layered Card Fan Hover Effect */}
      <div
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Selected Work project showcase. Drag horizontally, swipe on touch screens, or select a pagination dot to browse projects."
        onMouseEnter={() => {
          isHoveredRef.current = true;
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
          if (!isFocusedRef.current) setIsPaused(false);
        }}
        onFocusCapture={() => {
          isFocusedRef.current = true;
          setIsPaused(true);
        }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            isFocusedRef.current = false;
            if (!isHoveredRef.current) setIsPaused(false);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative hidden w-full select-none outline-none focus-visible:ring-2 focus-visible:ring-[#A84308] sm:block ${
          reducedMotion
            ? 'overflow-x-auto px-5 pb-3 sm:px-8'
            : 'cursor-grab overflow-hidden active:cursor-grabbing'
        }`}
      >
        {/* Left Screen Edge Gradient Fade Mask */}
        {!reducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#EFECE4] to-transparent md:w-24"
          />
        )}

        {/* Right Screen Edge Gradient Fade Mask */}
        {!reducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#EFECE4] to-transparent md:w-24"
          />
        )}

        <div
          ref={trackRef}
          data-testid="home-visual-carousel-track"
          data-paused={isPaused || reducedMotion ? 'true' : 'false'}
          className="flex w-max items-stretch gap-7 pl-8"
        >
          {(reducedMotion ? projects : loopItems).map((project, idx) => {
            const isClone = !reducedMotion && idx >= projects.length;
            const hasDistinctMobileShot =
              Boolean(project.mobileScreenshot) &&
              project.mobileScreenshot !== project.desktopScreenshot;

            const cardClasses =
              'group flex w-[460px] max-w-[500px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-stone-300/80 bg-[#12161F] p-5 shadow-[0_18px_45px_rgba(18,22,31,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C85A17]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#12161F] lg:w-[500px]';

            const cardContent = (
              <>
                {/* Device Preview Area with Video 1 3D Layered Fan Hover Effect */}
                <div className="relative h-[265px] w-full [perspective:1000px]">
                  {/* Ambient Radial Spotlight Behind Fan Cards on Hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(200,90,23,0.28),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Left Peeking Fan Screen on Hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-4 left-2 z-0 h-[82%] w-[70%] translate-x-2 rotate-0 scale-[0.92] overflow-hidden rounded-xl border border-white/15 bg-[#182030] opacity-0 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-3 group-hover:-rotate-4 group-hover:scale-[0.94] group-hover:opacity-80"
                  >
                    <Image
                      src={project.desktopScreenshot}
                      alt=""
                      fill
                      draggable={false}
                      sizes="320px"
                      className="object-cover object-bottom opacity-60 brightness-75"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Primary Desktop Website Preview Frame */}
                  <div
                    className={`relative z-10 h-full overflow-hidden rounded-xl border border-stone-700/80 bg-[#0B0F17] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:border-[#F59E6C]/50 ${
                      hasDistinctMobileShot ? 'w-[86%]' : 'w-full'
                    }`}
                  >
                    <div
                      className="flex h-6 items-center justify-between border-b border-stone-800 bg-[#161E2E] px-3"
                      aria-hidden="true"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                        <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="truncate font-mono text-[10px] text-stone-300">
                        {project.liveUrl
                          ? project.liveUrl.replace(/^https?:\/\//, '')
                          : project.slug}
                      </span>
                      <span className="w-4" />
                    </div>

                    <div className="relative h-[calc(100%-1.5rem)] w-full overflow-hidden">
                      <Image
                        src={project.desktopScreenshot}
                        alt={
                          isClone
                            ? ''
                            : `${project.title} desktop website preview`
                        }
                        fill
                        priority={idx < 2}
                        draggable={false}
                        sizes="480px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Overlapping Mobile Website Preview Frame — Fanned Out on Hover */}
                  {hasDistinctMobileShot && (
                    <div className="absolute right-2 bottom-2 z-20 h-[78%] w-[26%] min-w-[88px] max-w-[138px] overflow-hidden rounded-2xl border-2 border-stone-700 bg-[#0B0F17] shadow-[0_22px_50px_rgba(0,0,0,0.75)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-2 group-hover:rotate-3 group-hover:border-[#F59E6C]/60">
                      <div
                        className="flex h-4 items-center justify-center border-b border-stone-800 bg-[#161E2E]"
                        aria-hidden="true"
                      >
                        <span className="h-1 w-6 rounded-full bg-stone-500" />
                      </div>

                      <div className="relative h-[calc(100%-1rem)] w-full overflow-hidden">
                        <Image
                          src={project.mobileScreenshot}
                          alt={
                            isClone
                              ? ''
                              : `${project.title} mobile website preview`
                          }
                          fill
                          draggable={false}
                          sizes="144px"
                          className="object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Readable Project Title, Ownership Type & Case Study Cue (No Card Number Prefix) */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3.5 text-left">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F59E6C]">
                      {project.ownershipLabel || project.category}
                    </p>
                    <h3 className="mt-0.5 truncate font-display text-lg font-bold text-[#F8F6F1] group-hover:text-[#F59E6C]">
                      {project.title}
                    </h3>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#F8F6F1] transition-colors group-hover:border-[#A84308] group-hover:bg-[#A84308]">
                    <span>Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </>
            );

            if (isClone) {
              return (
                <div
                  key={`${project.id}-clone-${idx}`}
                  aria-hidden="true"
                  onClick={(e) => handleItemActivate(e, project.slug)}
                  className={cardClasses}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <a
                key={`${project.id}-${idx}`}
                href={`/projects/${project.slug}`}
                onMouseEnter={() => {
                  try {
                    router.prefetch(`/projects/${project.slug}`);
                  } catch {
                    // ignore prefetch errors
                  }
                }}
                onClick={(e) => handleItemActivate(e, project.slug)}
                aria-label={`${project.title} — ${project.ownershipLabel || project.category}. Open case study.`}
                draggable={false}
                className={cardClasses}
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>

      {/* Interactive Pagination Dots — Shown on Tablet & Desktop Only (Hidden on Mobile per User Requirement) */}
      <div
        role="tablist"
        aria-label="Selected Work slide indicators"
        className="mx-auto mt-6 hidden max-w-[1360px] items-center justify-center gap-2.5 px-5 sm:mt-9 sm:flex"
      >
        {projects.map((proj, idx) => {
          const isCurrent = activeIndex === idx;
          return (
            <button
              key={proj.slug}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Slide ${idx + 1}: ${proj.title}`}
              onClick={() => {
                goToProjectIndex(idx);
              }}
              className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-8 bg-[#A84308]'
                  : 'w-2.5 bg-stone-400/70 hover:bg-[#12161F]'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
}
