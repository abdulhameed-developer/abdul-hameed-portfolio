import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Abdul Hameed — Full-Stack Web Developer | Start a Project',
  description:
    'Reach Abdul Hameed, Full-Stack Web Developer in Lahore, Pakistan (UTC+5), for custom website development, PHP WordPress plugins, Shopify stores, Next.js applications, or full-time engineering roles.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Abdul Hameed — Full-Stack Web Developer | Start a Project',
    description:
      'Reach Abdul Hameed for custom website development, PHP WordPress plugins, Shopify stores, Next.js web apps, or engineering roles.',
    url: '/contact',
    siteName: 'Abdul Hameed Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/screenshots/shawn-desktop.png',
        width: 1440,
        height: 900,
        alt: 'Contact Abdul Hameed — Full-Stack Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Abdul Hameed — Full-Stack Web Developer | Start a Project',
    description:
      'Reach Abdul Hameed for custom website development, PHP WordPress plugins, Shopify stores, Next.js web apps, or engineering roles.',
    images: ['/screenshots/shawn-desktop.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
