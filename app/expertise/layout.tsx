import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Technical Expertise & Architecture — Abdul Hameed | Full-Stack Web Developer',
  description:
    'Full-stack technical architecture and 4-step engineering workflow of Abdul Hameed across custom PHP WordPress plugins, React, Next.js, TypeScript, Shopify Liquid, and Technical SEO.',
  alternates: {
    canonical: '/expertise',
  },
  openGraph: {
    title: 'Technical Expertise & Architecture — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Full-stack technical architecture and 4-step engineering workflow of Abdul Hameed across WordPress, React, Next.js, TypeScript, and Shopify.',
    url: '/expertise',
    siteName: 'Abdul Hameed Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/screenshots/shawn-desktop.png',
        width: 1440,
        height: 900,
        alt: 'Technical Expertise & Architecture — Abdul Hameed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Expertise & Architecture — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Full-stack technical architecture and 4-step engineering workflow of Abdul Hameed across WordPress, React, Next.js, TypeScript, and Shopify.',
    images: ['/screenshots/shawn-desktop.png'],
  },
};

export default function ExpertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
