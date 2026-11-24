'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function isInsideStickyOrMarquee(el: HTMLElement): boolean {
  let curr: HTMLElement | null = el;
  while (curr && curr.tagName !== 'MAIN') {
    const cls = typeof curr.className === 'string' ? curr.className : '';
    if (
      cls.includes('sticky') ||
      curr.getAttribute('role') === 'tablist' ||
      curr.dataset.testid === 'home-visual-carousel-track' ||
      curr.dataset.testid === 'tech-logo-marquee-track' ||
      curr.dataset.testid === 'tech-marquee-track' ||
      curr.hasAttribute('data-gsap-ignore')
    ) {
      return true;
    }
    curr = curr.parentElement;
  }
  return false;
}

export default function GsapScrollChoreography() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const triggers: ScrollTrigger[] = [];
    let hasUserScrolled = false;

    const onFirstScroll = () => {
      hasUserScrolled = true;
    };
    window.addEventListener('scroll', onFirstScroll, { passive: true });

    const timerId = window.setTimeout(() => {
      const main = document.querySelector('main');
      if (!main) return;

      const sections = Array.from(
        main.querySelectorAll<HTMLElement>('header, section')
      ).filter(
        (el) =>
          !el.hasAttribute('data-gsap-ignore') &&
          el.id !== 'hero' &&
          !el.closest('[data-gsap-ignore]')
      );

      sections.forEach((section) => {
        const rawTargets = Array.from(
          section.querySelectorAll<HTMLElement>(
            'h1, h2, article, [data-project-card]'
          )
        );

        const targets = rawTargets
          .filter((el) => {
            if (isInsideStickyOrMarquee(el)) return false;
            const parentArticle = el.parentElement?.closest('article');
            if (
              parentArticle &&
              rawTargets.includes(parentArticle as HTMLElement)
            ) {
              return false;
            }
            return true;
          })
          .slice(0, 12);

        const elementsToAnimate = targets.length > 0 ? targets : [section];
        if (isInsideStickyOrMarquee(section)) return;

        const playEnter = (fromY: number) => {
          if (!hasUserScrolled) return;
          gsap.fromTo(
            elementsToAnimate,
            { y: fromY, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.035,
              ease: 'power3.out',
              overwrite: 'auto',
              clearProps: 'transform,opacity',
            }
          );
        };

        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          onEnter: () => playEnter(18),
          onEnterBack: () => playEnter(-14),
        });

        triggers.push(st);
      });
    }, 250);

    return () => {
      window.removeEventListener('scroll', onFirstScroll);
      window.clearTimeout(timerId);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
