import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Playground & Open-Source Lab — Abdul Hameed | Full-Stack Web Developer',
  description:
    'Interactive open-source utilities, live WebAssembly & Next.js web apps, security-first PHP WordPress plugin blueprints, and WordPress Core Trac #66548 by Full-Stack Web Developer Abdul Hameed.',
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    title: 'Playground & Open-Source Lab — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Interactive open-source utilities, live WebAssembly & Next.js web apps, and WordPress Core Trac #66548 by Abdul Hameed.',
    url: '/playground',
    siteName: 'Abdul Hameed Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/screenshots/filecompresser-desktop.png',
        width: 1440,
        height: 900,
        alt: 'Playground & Open-Source Lab — Abdul Hameed',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playground & Open-Source Lab — Abdul Hameed | Full-Stack Web Developer',
    description:
      'Interactive open-source utilities, live WebAssembly & Next.js web apps, and WordPress Core Trac #66548 by Abdul Hameed.',
    images: ['/screenshots/filecompresser-desktop.png'],
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
