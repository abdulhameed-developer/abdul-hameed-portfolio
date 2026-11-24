import type { Metadata, Viewport } from 'next';
import './globals.css';
import {
  DEVELOPER_PROFILE,
  FEATURED_PROJECTS,
  GENERAL_SERVICES_FAQS,
  SERVICES_DATA,
} from '@/lib/portfolio-data';
import { resolvePublicSiteOrigin } from '@/lib/site-config';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import GsapScrollChoreography from '@/components/GsapScrollChoreography';

const siteUrl = resolvePublicSiteOrigin();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F8F6F1',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    'Abdul Hameed — Full-Stack Web Developer | Custom Websites, Plugins & Web Apps',
  description:
    'Abdul Hameed is a Full-Stack Web Developer in Lahore, Pakistan designing and engineering responsive websites, custom PHP WordPress plugins, Shopify storefronts, and Next.js applications.',
  keywords: [
    'Abdul Hameed',
    'Full-Stack Web Developer',
    'Web Developer Lahore',
    'WordPress Plugin Developer',
    'Shopify Developer Pakistan',
    'Next.js Full-Stack Developer',
    'AI-Assisted Web Engineering',
    'Technical SEO Specialist',
  ],
  authors: [{ name: DEVELOPER_PROFILE.name, url: siteUrl }],
  creator: DEVELOPER_PROFILE.name,
  publisher: DEVELOPER_PROFILE.name,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title:
      'Abdul Hameed — Full-Stack Web Developer | Custom Websites, Plugins & Web Apps',
    description:
      'Full-stack websites, custom PHP WordPress plugins, Shopify storefronts, and Next.js web applications engineered end to end by Abdul Hameed.',
    type: 'website',
    url: siteUrl,
    siteName: 'Abdul Hameed — Full-Stack Web Developer',
    locale: 'en_US',
    images: [
      {
        url: '/screenshots/shawn-desktop.png',
        width: 1440,
        height: 900,
        alt: 'Abdul Hameed — Full-Stack Web Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Abdul Hameed — Full-Stack Web Developer | Custom Websites, Plugins & Web Apps',
    description:
      'Full-stack websites, custom PHP WordPress plugins, Shopify storefronts, and Next.js web applications engineered end to end by Abdul Hameed.',
    images: ['/screenshots/shawn-desktop.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: DEVELOPER_PROFILE.name,
        jobTitle: DEVELOPER_PROFILE.role,
        description:
          'Full-Stack Web Developer in Lahore, Pakistan specializing in responsive business websites, custom PHP WordPress plugins, Shopify storefronts, and Next.js web applications powered by modern AI-assisted engineering workflows.',
        worksFor: {
          '@type': 'Organization',
          name: DEVELOPER_PROFILE.company,
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Virtual University of Pakistan',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lahore',
          addressCountry: 'PK',
        },
        email: DEVELOPER_PROFILE.email,
        telephone: DEVELOPER_PROFILE.whatsappDisplay,
        url: siteUrl,
        knowsAbout: [
          'Full-Stack Web Development',
          'WordPress Development',
          'Custom PHP WordPress Plugins',
          'Shopify Liquid Storefronts',
          'React',
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'WebAssembly Media Processing',
          'AI-Assisted Engineering (Cursor, Claude, Gemini, ChatGPT)',
          'Technical SEO',
          'Schema.org Structured Data',
        ],
        sameAs: [
          DEVELOPER_PROFILE.githubUrl,
          DEVELOPER_PROFILE.linkedinUrl,
          DEVELOPER_PROFILE.wordpressOrgUrl,
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: 'Abdul Hameed — Full-Stack Web Developer Portfolio',
        mainEntity: {
          '@id': `${siteUrl}/#person`,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '#main-content p'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Abdul Hameed — Full-Stack Web Developer',
        inLanguage: 'en',
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: 'Abdul Hameed — Full-Stack Web Development & Custom Plugin Engineering',
        url: `${siteUrl}/services`,
        provider: {
          '@id': `${siteUrl}/#person`,
        },
        areaServed: ['PK', 'Worldwide'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Development & Digital Services',
          itemListElement: SERVICES_DATA.map((service, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.benefitStatement,
              url: `${siteUrl}/services/${service.slug}`,
            },
          })),
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/#projects`,
        name: 'Verified Portfolio Case Studies by Abdul Hameed',
        numberOfItems: FEATURED_PROJECTS.length,
        itemListElement: FEATURED_PROJECTS.map((project, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${siteUrl}/projects/${project.slug}`,
          name: project.title,
          description: project.summary,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: GENERAL_SERVICES_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const safeJsonLd = JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c');

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="scroll-smooth"
    >
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLMs.txt — AI & Agentic Summary"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="LLMs-Full.txt — Complete Portfolio Specification"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/.well-known/agent.json"
          title="Agentic AI Capability Manifest"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="overflow-x-hidden bg-[#F8F6F1] font-sans text-[#12161F] antialiased selection:bg-[#12161F] selection:text-[#F8F6F1]"
      >
        {children}
        <GsapScrollChoreography />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
