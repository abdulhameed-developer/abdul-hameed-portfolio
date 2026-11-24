import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Projects & Case Studies — Abdul Hameed | Full-Stack Web Developer',
  description:
    'Explore verified production case studies by Full-Stack Web Developer Abdul Hameed—including custom WordPress platforms, modular PHP plugins, Shopify couture stores, WebAssembly media tools, and Next.js web applications.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects & Case Studies — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Explore verified production case studies by Full-Stack Web Developer Abdul Hameed across WordPress, PHP plugins, Shopify, WebAssembly, and Next.js.',
    url: '/projects',
    siteName: 'Abdul Hameed Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/screenshots/shawn-desktop.png',
        width: 1440,
        height: 900,
        alt: 'Projects & Case Studies — Abdul Hameed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects & Case Studies — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Explore verified production case studies by Full-Stack Web Developer Abdul Hameed across WordPress, PHP plugins, Shopify, WebAssembly, and Next.js.',
    images: ['/screenshots/shawn-desktop.png'],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
