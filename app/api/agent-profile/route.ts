import { NextResponse } from 'next/server';
import {
  DEVELOPER_PROFILE,
  FEATURED_PROJECTS,
  PLAYGROUND_EXPERIMENTS,
  SERVICES_DATA,
} from '@/lib/portfolio-data';
import { resolvePublicSiteOrigin } from '@/lib/site-config';

export async function GET() {
  const siteUrl = resolvePublicSiteOrigin();

  return NextResponse.json(
    {
      schemaVersion: '1.0',
      generatedFor: 'agentic-ai-discovery',
      canonicalOrigin: siteUrl,
      discoveryEndpoints: {
        llmsTxt: `${siteUrl}/llms.txt`,
        llmsFullTxt: `${siteUrl}/llms-full.txt`,
        sitemapXml: `${siteUrl}/sitemap.xml`,
        contactPage: `${siteUrl}/contact`,
        resumePage: `${siteUrl}/resume`,
      },
      developer: {
        name: DEVELOPER_PROFILE.name,
        title: DEVELOPER_PROFILE.role,
        role: DEVELOPER_PROFILE.role,
        company: DEVELOPER_PROFILE.company,
        education: DEVELOPER_PROFILE.education,
        location: DEVELOPER_PROFILE.location,
        timezone: 'UTC+5 (PKT)',
        aiAssistedWorkflow: ['Cursor', 'Claude', 'Gemini', 'ChatGPT'],
        contact: {
          email: DEVELOPER_PROFILE.email,
          whatsapp: DEVELOPER_PROFILE.whatsappDisplay,
          contactFormUrl: `${siteUrl}/contact`,
          deliveryMode: 'client_side_brief_builder_with_external_handoff',
        },
        verifiedProfiles: {
          github: DEVELOPER_PROFILE.githubUrl,
          publicRepositories: '12+ Public Repositories',
          linkedin: DEVELOPER_PROFILE.linkedinUrl,
          wordpressOrg: DEVELOPER_PROFILE.wordpressOrgUrl,
          wordpressCoreTracProposal: {
            ticket: DEVELOPER_PROFILE.coreTracTicketNumber,
            status: 'Open Enhancement Proposal',
            url: DEVELOPER_PROFILE.coreTracTicketUrl,
          },
        },
      },
      projects: FEATURED_PROJECTS.map((project) => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        contextLabel: project.ownershipLabel || project.clientOrContext,
        role: project.role,
        summary: project.summary,
        techStack: project.techStack,
        caseStudyUrl: `${siteUrl}/projects/${project.slug}`,
        liveUrl: project.liveUrl || null,
        githubUrl: project.githubUrl || null,
      })),
      services: SERVICES_DATA.map((service) => ({
        slug: service.slug,
        title: service.title,
        benefitStatement: service.benefitStatement,
        overview: service.overview,
        capabilities: service.capabilities,
        serviceUrl: `${siteUrl}/services/${service.slug}`,
        enquiryUrl: `${siteUrl}/contact?service=${service.slug}`,
      })),
      playground: PLAYGROUND_EXPERIMENTS.map((exp) => ({
        id: exp.id,
        title: exp.title,
        category: exp.category,
        language: exp.language,
        description: exp.description,
        liveUrl: exp.liveUrl || null,
        githubUrl: exp.githubUrl || null,
      })),
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
