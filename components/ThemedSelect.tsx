'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface ThemedSelectOption {
  value: string;
  label: string;
  badge?: string;
  description?: string;
}

interface ThemedSelectProps {
  id?: string;
  label?: string;
  value: string;
  options: ThemedSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  compact?: boolean;
  className?: string;
}

export default function ThemedSelect({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  compact = false,
  className = '',
}: ThemedSelectProps) {
  const generatedId = useId();
  const selectId = id || `themed-select-${generatedId}`;
  const listboxId = `${selectId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(() => {
    const idx = options.findIndex((o) => o.value === value);
    return idx >= 0 ? idx : 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isOpen]);

  // Scroll highlighted option into view when navigating via keyboard
  useEffect(() => {
    if (!isOpen) return;
    const node = optionRefs.current[highlightedIndex];
    if (node && typeof node.scrollIntoView === 'function') {
      node.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const openMenu = () => {
    const currentIdx = options.findIndex((o) => o.value === value);
    setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
    setIsOpen(true);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'Enter' ||
        e.key === ' '
      ) {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + options.length) % options.length
        );
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (options[highlightedIndex]) {
          handleSelect(options[highlightedIndex].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label
          id={`${selectId}-label`}
          htmlFor={selectId}
          className="mb-1.5 block text-xs font-semibold text-[#12161F]"
        >
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={label ? `${selectId}-label ${selectId}` : undefined}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`group flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-xl border text-left transition-all duration-150 ${
          compact ? 'px-3.5 py-2 text-xs' : 'px-4 py-2.5 text-sm'
        } ${
          isOpen
            ? 'border-[#C85A17] bg-white text-[#12161F] shadow-sm ring-2 ring-[#C85A17]/15'
            : 'border-[#12161F]/15 bg-white text-[#12161F] hover:border-[#12161F]/35'
        }`}
      >
        <span className="min-w-0 flex-1 truncate font-medium text-[#12161F]">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-stone-500 transition-transform duration-200 group-hover:text-[#A84308] ${
            isOpen ? 'rotate-180 text-[#A84308]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? `${selectId}-label` : selectId}
          className="absolute right-0 left-0 z-50 mt-1.5 max-h-[280px] min-w-[210px] overflow-y-auto rounded-xl border border-[#12161F]/12 bg-white p-1 shadow-[0_16px_38px_rgba(18,22,31,0.14)]"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isHighlighted = idx === highlightedIndex;

            return (
              <button
                key={opt.value}
                ref={(el) => {
                  optionRefs.current[idx] = el;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => handleSelect(opt.value)}
                className={`flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#12161F] font-semibold text-[#F8F6F1]'
                    : isHighlighted
                      ? 'bg-[#EFECE4] text-[#12161F]'
                      : 'bg-transparent text-[#12161F] hover:bg-[#F8F6F1]'
                }`}
              >
                <span className="truncate">{opt.label}</span>

                {isSelected && (
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-[#F59E6C]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
