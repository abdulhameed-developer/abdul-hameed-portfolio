'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export interface TechLogoItem {
  id: string;
  name: string;
  category: 'Frontend' | 'CMS & E-Commerce' | 'Backend & Data' | 'Workflow';
  tier: 'Core' | 'Working' | 'Familiar';
  renderLogo: () => React.ReactNode;
}

/**
 * 20 Verified Technologies used by Abdul Hameed across production client projects,
 * custom WordPress plugins, Shopify storefronts, and React/Next.js web applications.
 * All logos use authentic brand geometry and official brand colors in optically
 * balanced 32x32 SVG viewports.
 */
export const TECH_STACK_LOGOS: TechLogoItem[] = [
  {
    id: 'html5',
    name: 'HTML',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path fill="#E34F26" d="M5 3l2 22.8L16 29l9-3.2L27 3H5z" />
        <path fill="#EF652A" d="M16 5v21.8l7.3-2.6L24.9 5H16z" />
        <path
          fill="#FFF"
          d="M16 13.2h-3.7l-.3-3.1H16V7.1H8.9l.8 9.1H16v-3zm0 7.9l-3.4-.9-.2-2.5H9.4l.4 4.8 6.2 1.7v-3.1zm0-7.9v3h3.6l-.4 3.9-3.2.9v3.1l6.2-1.7.6-6.2H16zm0-6.1v3h7.1l.3-3H16z"
        />
      </svg>
    ),
  },
  {
    id: 'css3',
    name: 'CSS',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path fill="#1572B6" d="M5 3l2 22.8L16 29l9-3.2L27 3H5z" />
        <path fill="#33A9DC" d="M16 5v21.8l7.3-2.6L24.9 5H16z" />
        <path
          fill="#FFF"
          d="M16 13.1h3.8l.3-3H16V7.1h7.1l-.7 9h-6.4v-3zm0 8l-3.4-.9-.2-2.5H9.4l.4 4.8 6.2 1.7v-3.1zm3.6-4.9l-.4 3.9-3.2.9v3.1l6.2-1.7.5-6.2h-3.1zm-3.6-3.1v3H9.7l-.3-3H16z"
        />
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="4" fill="#F7DF1E" />
        <path
          fill="#12161F"
          d="M17.2 22.4c.5.9 1.2 1.5 2.4 1.5 1 0 1.7-.5 1.7-1.2 0-.8-.7-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.7-3-3.8 0-1.9 1.4-3.3 3.7-3.3 1.6 0 2.7.6 3.5 2l-1.9 1.2c-.4-.8-.9-1.1-1.6-1.1-.7 0-1.2.5-1.2 1.1 0 .8.5 1.1 1.6 1.6l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.2-1.8 3.5-4.1 3.5-2.3 0-3.8-1.1-4.5-2.6l1.9-1.2zm-8.5.2c.4.7.7 1.3 1.5 1.3.8 0 1.3-.3 1.3-1.5v-8.5h2.4v8.6c0 2.6-1.5 3.8-3.7 3.8-2 0-3.1-1-3.7-2.3l2.2-1.4z"
        />
      </svg>
    ),
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="4" fill="#3178C6" />
        <path
          fill="#FFF"
          d="M17.8 22.7v2.1c.6.3 1.4.5 2.4.5 2.4 0 4-1.2 4-3.3 0-1.9-1.1-2.7-3.1-3.5l-.6-.2c-1-.4-1.5-.7-1.5-1.4 0-.6.5-1 1.3-1 .8 0 1.6.3 2.2.7v-2c-.6-.3-1.4-.5-2.3-.5-2.2 0-3.7 1.2-3.7 3.2 0 1.8 1.1 2.7 2.9 3.4l.6.3c1.1.4 1.7.8 1.7 1.5 0 .7-.6 1.1-1.6 1.1-1 0-1.8-.4-2.3-.9zm-3.6-8.4H6.8v2h2.5v8.8h2.4v-8.8h2.5v-2z"
        />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <circle cx="16" cy="16" r="2.5" fill="#087EA4" />
        <g fill="none" stroke="#087EA4" strokeWidth="1.6">
          <ellipse cx="16" cy="16" rx="12" ry="4.6" />
          <ellipse cx="16" cy="16" rx="12" ry="4.6" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="4.6" transform="rotate(120 16 16)" />
        </g>
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="#12161F" />
        <path
          fill="#F8F6F1"
          d="M11.2 10.5h2.1l8.9 11.6h-2.1l-6.8-8.9v8.3h-2.1V10.5zm8.5 0h2v7.2l-2-2.6v-4.6z"
        />
      </svg>
    ),
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'CMS & E-Commerce',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="#21759B" />
        <path
          fill="#FFF"
          d="M5.5 16c0 4.2 2.4 7.8 6 9.5L6.4 11.7C5.8 13 5.5 14.5 5.5 16zm17.6-.5c0-1.3-.5-2.2-.9-2.9-.5-.9-1.1-1.6-1.1-2.5 0-1 .7-1.9 1.8-1.9h.1C21.1 6.5 18.7 5.5 16 5.5c-3.7 0-6.9 1.9-8.8 4.8h1.5c1.1 0 2.7-.1 2.7-.1.5 0 .6.8.1.8 0 0-.6.1-1.2.1l3.7 11.1 2.2-6.7-1.6-4.4c-.5 0-1.1-.1-1.1-.1-.5 0-.5-.8.1-.8 0 0 1.7.1 2.6.1 1.1 0 2.7-.1 2.7-.1.5 0 .6.8.1.8 0 0-.6.1-1.2.1l3.7 11 1-3.4c.5-1.5.6-2.5.6-3.2zM16.2 17l-3.1 8.9c.9.3 1.9.5 2.9.5 1.2 0 2.3-.2 3.4-.6-.1-.1-.1-.2-.2-.3L16.2 17zm8.9-5.9c.1.5.1 1.1.1 1.7 0 1.6-.3 3.5-1.2 5.8l-3.2 9.2c3.3-1.9 5.5-5.5 5.5-9.6 0-2.6-.9-5-2.2-7.1z"
        />
      </svg>
    ),
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'Backend & Data',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <ellipse cx="16" cy="16" rx="14" ry="8.5" fill="#777BB4" />
        <path
          fill="#FFF"
          d="M7.6 18.8l1.2-6.1h2.9c1.3 0 2.1.7 1.9 2-.2 1.5-1.2 2.2-2.7 2.2H9.6l-.4 1.9H7.6zm2.3-3.1h.9c.6 0 1.1-.3 1.2-.9.1-.6-.2-.9-.8-.9h-.9l-.4 1.8zm4.3 3.1l1.5-7.6h1.6l-.5 2.6h1.4c1.2 0 1.7.6 1.5 1.7l-.6 3.3h-1.6l.6-2.9c.1-.5-.1-.7-.6-.7h-1.1l-.7 3.6h-1.5zm6.1 0l1.2-6.1h2.9c1.3 0 2.1.7 1.9 2-.2 1.5-1.2 2.2-2.7 2.2h-1.3l-.4 1.9h-1.6zm2.3-3.1h.9c.6 0 1.1-.3 1.2-.9.1-.6-.2-.9-.8-.9h-.9l-.4 1.8z"
        />
      </svg>
    ),
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Backend & Data',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="6" fill="#00758F" />
        <path
          fill="#F29111"
          d="M22.8 18.8c-1.4-.1-2.5-.8-3.3-1.8-.7-.9-1.3-2-1.8-3.1-.5-1.1-1.3-2.2-2.4-2.8-1-.5-2.2-.6-3.1.1-.7.5-1 1.4-.9 2.3.1.9.6 1.7 1.2 2.4.7.8 1.5 1.5 2 2.5.4.8.5 1.8.2 2.6-.3.7-1 1.2-1.8 1.2-.7 0-1.4-.4-1.9-.9-.6-.6-.9-1.4-1.1-2.2-.4.7-.5 1.6-.2 2.4.3.9 1.1 1.6 2 1.9 1.1.3 2.3.1 3.2-.6.8-.6 1.3-1.6 1.3-2.6 0-.7-.2-1.4-.6-2 .8.9 1.7 1.7 2.8 2.2 1.1.5 2.4.6 3.5.2.6-.2 1.1-.6 1.5-1.1-.4.2-1 .3-1.6.3z"
        />
        <circle cx="13.5" cy="12.5" r="1" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'shopify',
    name: 'Shopify',
    category: 'CMS & E-Commerce',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path
          fill="#95BF47"
          d="M24.2 8.7c-.1-.2-.2-.3-.4-.3s-3.1-.2-3.1-.2-2.1-2-2.3-2.2c-.2-.2-.6-.1-.8-.1l-1.1.3c-.7-1.9-1.8-3.6-3.9-3.6h-.2C11.9 2 11.2 1.8 10.6 1.8c-3.2 0-4.7 4-5.2 6l-2.3.7c-.7.2-.7.3-.8.9L.5 26.8 18.8 30l9.7-2.1S24.3 8.9 24.2 8.7zM16.9 6.7l-2.5.8c.3-1.3.9-2.6 2-3.1.2.6.4 1.5.5 2.3zm-3.8-2.9c.2 0 .4.1.6.2-1.2.6-2.1 2.1-2.5 3.9l-2 .6c.4-2.1 1.7-4.7 3.9-4.7z"
        />
        <path
          fill="#5E8E3E"
          d="M23.8 8.4s-3.1-.2-3.1-.2-2.1-2-2.3-2.2c-.1-.1-.2-.1-.3-.1v24.1l9.7-2.1S24.3 8.9 24.2 8.7c-.1-.2-.2-.3-.4-.3z"
        />
        <path
          fill="#FFF"
          d="M15.1 12.6l-.9 2.8s-1-.5-2.2-.5c-1.8 0-1.9 1.1-1.9 1.4 0 1.5 4 2.1 4 5.7 0 2.8-1.8 4.6-4.2 4.6-2.9 0-4.4-1.8-4.4-1.8l.8-2.6s1.5 1.3 2.8 1.3c.8 0 1.2-.7 1.2-1.2 0-2-3.3-2.1-3.3-5.4 0-2.8 2-5.5 6-5.5 1.5 0 2.1.4 2.1.4z"
        />
      </svg>
    ),
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'CMS & E-Commerce',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <rect x="2" y="5" width="28" height="19" rx="5" fill="#7F54B3" />
        <path fill="#7F54B3" d="M18 23l5 5v-5h-5z" />
        <path
          fill="#FFF"
          d="M6.2 11.2h2.1l1.2 5.4 1.5-5.4h1.8l1.4 5.4 1.3-5.4h2.1l-2.3 8.1h-2l-1.4-5-1.5 5h-2l-2.2-8.1zm14.3 2.1c1.7 0 2.9 1.2 2.9 3s-1.2 3-2.9 3-2.9-1.2-2.9-3 1.2-3 2.9-3zm0 1.7c-.7 0-1.2.5-1.2 1.3s.5 1.3 1.2 1.3 1.2-.5 1.2-1.3-.5-1.3-1.2-1.3z"
        />
      </svg>
    ),
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path
          fill="#06B6D4"
          d="M16 9c-3.7 0-6 1.8-6.9 5.5 1.4-1.8 3-2.5 4.8-2.1 1 .2 1.8 1 2.6 1.8 1.3 1.4 2.9 3 6.3 3 3.7 0 6-1.8 6.9-5.5-1.4 1.8-3 2.5-4.8 2.1-1-.2-1.8-1-2.6-1.8C21 10.6 19.4 9 16 9zM9.1 17.2c-3.7 0-6 1.8-6.9 5.5 1.4-1.8 3-2.5 4.8-2.1 1 .2 1.8 1 2.6 1.8 1.3 1.4 2.9 3 6.3 3 3.7 0 6-1.8 6.9-5.5-1.4 1.8-3 2.5-4.8 2.1-1-.2-1.8-1-2.6-1.8-1.3-1.4-2.9-3-6.3-3z"
        />
      </svg>
    ),
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <rect x="3" y="4" width="26" height="24" rx="5" fill="#7952B3" />
        <path
          fill="#FFF"
          d="M11 9.5h5.4c2.4 0 3.9 1.1 3.9 2.9 0 1.3-.8 2.3-2 2.6v.1c1.5.3 2.5 1.3 2.5 2.9 0 2.1-1.7 3.5-4.4 3.5H11v-12zm2.5 4.9h2.5c1.2 0 1.9-.6 1.9-1.6 0-1-.7-1.5-1.9-1.5h-2.5v3.1zm0 5.3h2.8c1.4 0 2.2-.6 2.2-1.7 0-1.1-.8-1.7-2.2-1.7h-2.8v3.4z"
        />
      </svg>
    ),
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'Frontend',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="6" fill="#12161F" />
        <path
          fill="#0AE448"
          d="M16.5 7.5L9.5 17h6l-1.2 7.5L22.5 15h-6l1.2-7.5z"
        />
      </svg>
    ),
  },
  {
    id: 'elementor',
    name: 'Elementor',
    category: 'CMS & E-Commerce',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="#92003B" />
        <rect x="10" y="10" width="2.6" height="12" rx="0.6" fill="#FFF" />
        <rect x="14.6" y="10" width="7.4" height="2.6" rx="0.6" fill="#FFF" />
        <rect x="14.6" y="14.7" width="7.4" height="2.6" rx="0.6" fill="#FFF" />
        <rect x="14.6" y="19.4" width="7.4" height="2.6" rx="0.6" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'Backend & Data',
    tier: 'Familiar',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path
          fill="none"
          stroke="#FF2D20"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.5 10.2L12 7l5.5 3.2v6.4L12 19.8l-5.5-3.2v-6.4zm11 6.4l5.5-3.2 4.5 2.6v5.8L22 25l-4.5-2.6v-5.8zM12 19.8V26l10-1v-5.6M6.5 10.2L12 13.4l5.5-3.2"
        />
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Workflow',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path
          fill="#F05032"
          d="M28.4 14.7L17.3 3.6c-.7-.7-1.9-.7-2.6 0l-2.3 2.3 2.9 2.9c.7-.2 1.5 0 2 .5.5.6.7 1.4.5 2.1l2.8 2.8c.7-.2 1.5 0 2.1.5.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.5-.4-2.2l-2.6-2.6v6.8c.2.1.4.2.5.4.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.8-.8-.8-2 0-2.8.2-.2.4-.3.7-.4v-6.9c-.3-.1-.5-.2-.7-.4-.6-.6-.7-1.4-.4-2.1l-2.9-2.9-7.7 7.7c-.7.7-.7 1.9 0 2.6l11.1 11.1c.7.7 1.9.7 2.6 0l11.1-11.1c.7-.7.7-1.9 0-2.6z"
        />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Workflow',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path
          fill="#181717"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 3C8.8 3 3 8.8 3 16c0 5.7 3.7 10.6 8.9 12.3.6.1.9-.3.9-.6v-2.2c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3 1.4 3.8 1.1.1-.8.4-1.4.8-1.7-2.9-.3-5.9-1.4-5.9-6.4 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.3 3.6 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.2 3.2.1 3.5.8.9 1.3 2.1 1.3 3.5 0 5-3 6.1-5.9 6.4.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.9.6C25.3 26.6 29 21.7 29 16c0-7.2-5.8-13-13-13z"
        />
      </svg>
    ),
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Workflow',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path fill="#12161F" d="M16 5L29 27H3L16 5z" />
      </svg>
    ),
  },
  {
    id: 'rest-api',
    name: 'REST APIs',
    category: 'Backend & Data',
    tier: 'Core',
    renderLogo: () => (
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="6" fill="#C85A17" />
        <path
          fill="none"
          stroke="#FFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 11l-4 5 4 5m10-10l4 5-4 5m-6.5 1l3-12"
        />
      </svg>
    ),
  },
];

export default function TechLogoMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const offsetRef = useRef(0);
  const singleSetWidthRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isInViewportRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const measureSingleSetWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const halfWidth = track.scrollWidth / 2;
    singleSetWidthRef.current = halfWidth;
    return halfWidth;
  }, []);

  const applyWrappedOffset = useCallback(
    (nextOffset: number) => {
      const track = trackRef.current;
      if (!track) return;
      const halfWidth = singleSetWidthRef.current || measureSingleSetWidth();
      if (halfWidth <= 0) return;

      const wrapped = ((nextOffset % halfWidth) + halfWidth) % halfWidth;
      offsetRef.current = wrapped;
      gsap.set(track, { x: -wrapped });
    },
    [measureSingleSetWidth]
  );

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Measure track on load, font load, and resize
  useEffect(() => {
    measureSingleSetWidth();

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        measureSingleSetWidth();
      });
    }

    const handleResize = () => {
      measureSingleSetWidth();
      applyWrappedOffset(offsetRef.current);
    };
    window.addEventListener('resize', handleResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      observer = new ResizeObserver(() => {
        measureSingleSetWidth();
      });
      observer.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
    };
  }, [applyWrappedOffset, measureSingleSetWidth]);

  // Pause when offscreen or when tab is hidden
  useEffect(() => {
    const section = sectionRef.current;
    let observer: IntersectionObserver | null = null;

    if (section && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInViewportRef.current = entry.isIntersecting;
          });
        },
        { threshold: 0.01 }
      );
      observer.observe(section);
    }

    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Continuous, calm right-to-left GSAP ticker loop
  useEffect(() => {
    if (reducedMotion) {
      if (trackRef.current) {
        gsap.set(trackRef.current, { x: 0 });
      }
      return;
    }

    const speedPerFrameAt60Hz = 0.52;

    const tick = () => {
      if (
        isHoveredRef.current ||
        isFocusedRef.current ||
        isDraggingRef.current ||
        !isInViewportRef.current ||
        !isDocumentVisibleRef.current
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
    };
  }, [applyWrappedOffset, measureSingleSetWidth, reducedMotion]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDraggingRef.current = true;
    isHoveredRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore pointer capture issues
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || reducedMotion) return;
    const dx = dragStartXRef.current - e.clientX;
    applyWrappedOffset(dragStartOffsetRef.current + dx);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    if (e.pointerType !== 'mouse') {
      isHoveredRef.current = false;
    }
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore pointer capture release issues
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    applyWrappedOffset(offsetRef.current + e.deltaX);
  };

  return (
    <section
      ref={sectionRef}
      data-gsap-ignore="true"
      aria-label="Technologies and development tools"
      className="relative z-10 bg-transparent pb-8 pt-4 sm:pb-11 sm:pt-6"
    >
      {/* Subtle Top Header Bridge — Strictly Single Line Across Mobile, Tablet & Desktop */}
      <div className="mx-auto mb-5 flex max-w-[1360px] items-center justify-between gap-2 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A84308]"
            aria-hidden="true"
          />
          <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600 sm:text-[11px] sm:tracking-[0.18em]">
            Technologies &amp; Tools
          </p>
        </div>

        <Link
          href="/expertise"
          className="group inline-flex shrink-0 items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-700 transition-colors hover:text-[#A84308] sm:gap-1.5 sm:text-[11px] sm:tracking-[0.14em]"
        >
          <span>Full Stack</span>
          <ArrowRight
            className="h-3 w-3 text-[#A84308] transition-transform duration-200 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Interactive Draggable / Touch-Movable Marquee Viewport with True Alpha Edge Mask */}
      <div
        role="region"
        aria-label="Interactive technology icons marquee. Hover or touch to pause, or drag horizontally to inspect technologies."
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
        onTouchStart={() => {
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onFocusCapture={() => {
          isFocusedRef.current = true;
        }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            isFocusedRef.current = false;
          }
        }}
        style={{
          touchAction: 'pan-y',
          ...(reducedMotion
            ? {}
            : {
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
              }),
        }}
        className={`relative mx-auto max-w-[1220px] select-none ${
          reducedMotion
            ? 'overflow-x-auto px-5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            : 'cursor-grab overflow-hidden active:cursor-grabbing'
        }`}
      >
        <div
          ref={trackRef}
          data-testid="tech-logo-marquee-track"
          className="flex w-max items-center"
        >
          {/* Primary Semantic List (100% WCAG valid <ul> -> <li> hierarchy) */}
          <ul
            aria-label="Core and working development technologies"
            className="flex items-center"
          >
            {TECH_STACK_LOGOS.map((tech) => (
              <li
                key={tech.id}
                className="flex shrink-0 items-center gap-3 px-5 py-2 sm:gap-3.5 sm:px-7"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
                  {tech.renderLogo()}
                </span>
                <span className="whitespace-nowrap font-display text-sm font-bold tracking-tight text-[#12161F] sm:text-base">
                  {tech.name}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-4 h-4 w-px bg-stone-300/70 sm:ml-6"
                />
              </li>
            ))}
          </ul>

          {/* Visual-Only Loop Duplicate (Outside <ul>, completely hidden from Accessibility Tree) */}
          {!reducedMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none flex select-none items-center"
            >
              {TECH_STACK_LOGOS.map((tech) => (
                <div
                  key={`${tech.id}-clone`}
                  className="flex shrink-0 items-center gap-3 px-5 py-2 sm:gap-3.5 sm:px-7"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
                    {tech.renderLogo()}
                  </span>
                  <span className="whitespace-nowrap font-display text-sm font-bold tracking-tight text-[#12161F] sm:text-base">
                    {tech.name}
                  </span>
                  <span className="ml-4 h-4 w-px bg-stone-300/70 sm:ml-6" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
