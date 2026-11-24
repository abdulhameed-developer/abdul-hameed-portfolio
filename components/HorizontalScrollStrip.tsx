'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollStripProps {
  children: React.ReactNode;
  ariaLabel: string;
  role?: 'tablist' | 'group' | 'region';
  className?: string;
  stripClassName?: string;
  fadeColorFrom?: string;
  showArrowControls?: boolean;
}

/**
 * Reusable Horizontal Scroll Strip for filter bars, category tabs,
 * stage selectors, and sandbox toolbars.
 * - Supports horizontal overflow with hidden native scrollbar
 * - Supports mouse-wheel horizontal scrolling when overflowing
 * - Supports desktop pointer drag-to-scroll (with 6px threshold to preserve button clicks)
 * - Supports touch swipe on mobile/tablet
 * - Shows subtle edge fade masks and desktop chevron controls ONLY when overflowing
 * - Automatically scrolls `[data-active="true"]` or `[aria-selected="true"]` items into view
 */
export default function HorizontalScrollStrip({
  children,
  ariaLabel,
  role = 'tablist',
  className = '',
  stripClassName = '',
  fadeColorFrom = 'from-[#F8F6F1]',
  showArrowControls = true,
}: HorizontalScrollStripProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragState = useRef({
    pointerDown: false,
    startX: 0,
    startScrollLeft: 0,
    dragged: false,
  });

  const updateScrollMetrics = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(maxScrollLeft - el.scrollLeft > 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollMetrics();

    const handleScroll = () => updateScrollMetrics();
    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollMetrics);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => updateScrollMetrics());
      observer.observe(el);
    }

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollMetrics);
      observer?.disconnect();
    };
  }, [updateScrollMetrics, children]);

  // Keep active tab centered inside the strip without jumping the window vertically
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const activeChild = el.querySelector<HTMLElement>(
      '[data-active="true"], [aria-selected="true"], [aria-pressed="true"]'
    );
    if (!activeChild) return;

    const elRect = el.getBoundingClientRect();
    const childRect = activeChild.getBoundingClientRect();

    if (childRect.left < elRect.left + 24 || childRect.right > elRect.right - 24) {
      const targetLeft =
        activeChild.offsetLeft - el.clientWidth / 2 + activeChild.clientWidth / 2;
      el.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    }
  }, [children]);

  // Translate vertical wheel events into horizontal scroll when the strip overflows
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (maxScrollLeft <= 2) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.ctrlKey && !e.metaKey) {
        const atStart = el.scrollLeft <= 1 && e.deltaY < 0;
        const atEnd = el.scrollLeft >= maxScrollLeft - 1 && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;

    dragState.current = {
      pointerDown: true,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      dragged: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.pointerDown) return;
    const el = scrollerRef.current;
    if (!el) return;

    const deltaX = e.clientX - dragState.current.startX;
    if (Math.abs(deltaX) > 6) {
      if (!dragState.current.dragged) {
        dragState.current.dragged = true;
        setIsDragging(true);
      }
      el.scrollLeft = dragState.current.startScrollLeft - deltaX;
    }
  };

  const endPointerDrag = () => {
    if (!dragState.current.pointerDown) return;
    dragState.current.pointerDown = false;
    setIsDragging(false);
    window.setTimeout(() => {
      dragState.current.dragged = false;
    }, 40);
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current.dragged) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.dragged = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      e.key !== 'ArrowRight' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'Home' &&
      e.key !== 'End'
    ) {
      return;
    }

    const el = scrollerRef.current;
    if (!el) return;

    const buttons = Array.from(
      el.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
    );
    if (!buttons.length) return;

    const currentIndex = buttons.findIndex(
      (btn) => btn === document.activeElement
    );
    if (currentIndex === -1) return;

    e.preventDefault();
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = buttons.length - 1;
    }

    const targetBtn = buttons[nextIndex];
    targetBtn?.focus();
    targetBtn?.click();
  };

  const scrollByStep = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(180, Math.round(el.clientWidth * 0.55));
    el.scrollBy({
      left: direction * step,
      behavior: 'smooth',
    });
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <div className={`relative flex max-w-full min-w-0 items-center gap-1.5 ${className}`}>
      {showArrowControls && hasOverflow && (
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          disabled={!canScrollLeft}
          aria-label={`Scroll ${ariaLabel} left`}
          className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-200/90 bg-white text-[#12161F] transition-all sm:inline-flex ${
            canScrollLeft
              ? 'opacity-100 hover:border-[#C85A17] hover:text-[#C85A17]'
              : 'pointer-events-none opacity-30'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      <div className="relative min-w-0 flex-1 overflow-hidden">
        {/* Left Fade Mask */}
        {canScrollLeft && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-7 bg-gradient-to-r ${fadeColorFrom} to-transparent`}
          />
        )}

        {/* Right Fade Mask */}
        {canScrollRight && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-7 bg-gradient-to-l ${fadeColorFrom} to-transparent`}
          />
        )}

        <div
          ref={scrollerRef}
          role={role}
          aria-label={ariaLabel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointerDrag}
          onPointerCancel={endPointerDrag}
          onPointerLeave={endPointerDrag}
          onClickCapture={handleClickCapture}
          onKeyDown={handleKeyDown}
          className={`flex flex-nowrap items-center overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab sm:cursor-auto'
          } ${stripClassName}`}
        >
          {children}
        </div>
      </div>

      {showArrowControls && hasOverflow && (
        <button
          type="button"
          onClick={() => scrollByStep(1)}
          disabled={!canScrollRight}
          aria-label={`Scroll ${ariaLabel} right`}
          className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-stone-200/90 bg-white text-[#12161F] transition-all sm:inline-flex ${
            canScrollRight
              ? 'opacity-100 hover:border-[#C85A17] hover:text-[#C85A17]'
              : 'pointer-events-none opacity-30'
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
