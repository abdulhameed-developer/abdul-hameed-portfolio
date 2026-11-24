'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/lib/portfolio-data';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !heroRef.current) return;

    let ctx: gsap.Context | null = null;
    const rafId = window.requestAnimationFrame(() => {
      if (!heroRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          '[data-hero-animate]',
          { y: 12 },
          {
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'transform',
          }
        );
      }, heroRef);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Personal Introduction"
      className="relative z-10 bg-transparent pb-12 pt-28 sm:pb-20 sm:pt-36 lg:pt-40"
    >
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Single-Line Unboxed Typographic Kicker */}
          <p
            data-hero-animate
            className="mb-3.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#A84308] sm:mb-4 sm:text-sm"
          >
            Full-Stack Web Developer
          </p>

          {/* Expressive Centered Personal Headline */}
          <h1
            data-hero-animate
            className="max-w-4xl font-display text-[1.9rem] font-bold leading-[1.1] tracking-tight text-[#12161F] sm:text-[clamp(2.6rem,5vw,4.65rem)] sm:leading-[1.06]"
          >
            <span className="block">Hi, I’m {DEVELOPER_PROFILE.name}.</span>
            <span className="block text-stone-600">
              I build websites, plugins
            </span>
            <span className="block">&amp; modern web apps.</span>
          </h1>

          {/* Centered Personal Lead — Natural Senior Full-Stack Copy */}
          <p
            data-hero-animate
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-600 sm:mt-6 sm:text-lg"
          >
            I design and engineer complete web products from frontend interfaces
            to backend logic—crafting responsive business websites, custom PHP
            WordPress plugins, tailored Shopify storefronts, and Next.js
            applications with modern AI-assisted workflows.
          </p>

          {/* Centered Primary CTA ("Explore My Work") + "More About Me" */}
          <div
            data-hero-animate
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-9"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-[#12161F] px-5 py-2.5 text-xs font-semibold text-[#F8F6F1] transition-all duration-200 hover:bg-[#C85A17] sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 py-1.5 text-xs font-semibold text-stone-700 underline decoration-stone-300 underline-offset-8 transition-colors hover:text-[#12161F] hover:decoration-[#12161F] sm:text-sm"
            >
              More About Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
