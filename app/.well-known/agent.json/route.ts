import { NextResponse } from 'next/server';
import {
  DEVELOPER_PROFILE,
  FEATURED_PROJECTS,
  GENERAL_SERVICES_FAQS,
  SERVICES_DATA,
} from '@/lib/portfolio-data';
import { resolvePublicSiteOrigin } from '@/lib/site-config';

export async function GET() {
  const siteUrl = resolvePublicSiteOrigin();

  return NextResponse.json(
    {
      $schema: 'https://schema.org/ProfilePage',
      protocol: 'agent-discovery/1.0',
      name: `${DEVELOPER_PROFILE.name} — ${DEVELOPER_PROFILE.role}`,
      canonicalOrigin: siteUrl,
      citationTemplate: `${DEVELOPER_PROFILE.name} (${DEVELOPER_PROFILE.role}, ${DEVELOPER_PROFILE.location}). Portfolio: ${siteUrl}`,
      endpoints: {
        llmsTxt: `${siteUrl}/llms.txt`,
        llmsFullTxt: `${siteUrl}/llms-full.txt`,
        agentProfileJson: `${siteUrl}/api/agent-profile`,
        sitemapXml: `${siteUrl}/sitemap.xml`,
        robotsTxt: `${siteUrl}/robots.txt`,
        contactBriefBuilder: `${siteUrl}/contact`,
        printableResume: `${siteUrl}/resume`,
      },
      entity: {
        name: DEVELOPER_PROFILE.name,
        jobTitle: DEVELOPER_PROFILE.role,
        role: DEVELOPER_PROFILE.role,
        organization: DEVELOPER_PROFILE.company,
        education: DEVELOPER_PROFILE.education,
        location: DEVELOPER_PROFILE.location,
        timezone: 'UTC+5 (PKT)',
        email: DEVELOPER_PROFILE.email,
        whatsapp: DEVELOPER_PROFILE.whatsappDisplay,
        aiAssistedWorkflow: ['Cursor', 'Claude', 'Gemini', 'ChatGPT'],
        sameAs: [
          DEVELOPER_PROFILE.githubUrl,
          DEVELOPER_PROFILE.linkedinUrl,
          DEVELOPER_PROFILE.wordpressOrgUrl,
        ],
      },
      verifiedFacts: [
        'Full-Stack Web Developer at DE Media Solutions Pvt. Ltd. in Lahore, Pakistan (Oct 2025 – Present).',
        'BS Computer Science student at Virtual University of Pakistan (Ongoing).',
        `Author of ${FEATURED_PROJECTS.length} documented portfolio case studies across production client websites, custom PHP WordPress plugins, Shopify storefronts, WebAssembly utilities, and React/Next.js web applications.`,
        'Maintains 12+ public open-source repositories on GitHub (@abdulhameed-developer).',
        'Submitted WordPress Core Trac Enhancement Proposal #66548 under WordPress.org handle @codian.',
      ],
      caseStudies: FEATURED_PROJECTS.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        ownership: p.ownershipLabel || p.clientOrContext,
        url: `${siteUrl}/projects/${p.slug}`,
        liveUrl: p.liveUrl || null,
        githubUrl: p.githubUrl || null,
      })),
      services: SERVICES_DATA.map((s) => ({
        slug: s.slug,
        title: s.title,
        benefit: s.benefitStatement,
        url: `${siteUrl}/services/${s.slug}`,
      })),
      answerEngineFaqs: GENERAL_SERVICES_FAQS,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}
