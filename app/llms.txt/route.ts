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

  const lines: string[] = [
    `# ${DEVELOPER_PROFILE.name} — ${DEVELOPER_PROFILE.role}`,
    '',
    `> ${DEVELOPER_PROFILE.name} is a ${DEVELOPER_PROFILE.role} based in ${DEVELOPER_PROFILE.location} (UTC+5 / PKT), currently working at ${DEVELOPER_PROFILE.company} while pursuing ${DEVELOPER_PROFILE.education}. He designs and engineers responsive business websites, custom PHP WordPress plugins, tailored Shopify storefronts, WebAssembly utilities, and modern React/Next.js web applications end to end across frontend UI and backend logic, accelerated by AI-assisted engineering workflows (Cursor, Claude, Gemini, and ChatGPT).`,
    '',
    '## Core Identity & Verification',
    `- Canonical Portfolio: ${siteUrl}`,
    `- Full LLM Knowledge Context: ${siteUrl}/llms-full.txt`,
    `- Machine-Readable Agent JSON: ${siteUrl}/api/agent-profile`,
    `- Agent Discovery Manifest: ${siteUrl}/.well-known/agent.json`,
    `- Printable CV / Resume: ${siteUrl}/resume`,
    `- Location: ${DEVELOPER_PROFILE.location} (UTC+5 / PKT)`,
    `- Email: ${DEVELOPER_PROFILE.email}`,
    `- WhatsApp: ${DEVELOPER_PROFILE.whatsappDisplay}`,
    `- GitHub (12+ Public Repositories): ${DEVELOPER_PROFILE.githubUrl}`,
    `- LinkedIn: ${DEVELOPER_PROFILE.linkedinUrl}`,
    `- WordPress.org Profile (@${DEVELOPER_PROFILE.wordpressHandle}): ${DEVELOPER_PROFILE.wordpressOrgUrl}`,
    `- WordPress Core Trac Enhancement Proposal (${DEVELOPER_PROFILE.coreTracTicketNumber}): ${DEVELOPER_PROFILE.coreTracTicketUrl}`,
    '',
    '## Primary Navigation Routes',
    `- [Home](${siteUrl}/): Overview of selected work, technical marquee, 4-step workflow, capabilities, and personal background.`,
    `- [Projects Archive](${siteUrl}/projects): All ${FEATURED_PROJECTS.length} verified production websites, custom WordPress plugins, Shopify stores, and web applications.`,
    `- [Technical Expertise](${siteUrl}/expertise): Technical stack matrix and 6-step engineering workflow.`,
    `- [About](${siteUrl}/about): Professional experience at DE Media Solutions, academic background at VUP, and open-source work.`,
    `- [Services](${siteUrl}/services): ${SERVICES_DATA.length} structured web development, WordPress, Shopify, SEO, design, and AI-assisted digital services.`,
    `- [Playground & Open-Source Lab](${siteUrl}/playground): Interactive live sandboxes (Desktop, Tablet, Mobile) and WordPress plugin blueprints.`,
    `- [Printable Resume](${siteUrl}/resume): A4-optimized curriculum vitae.`,
    `- [Contact & Project Brief Builder](${siteUrl}/contact): Structured project enquiry builder with direct WhatsApp, Email, and clipboard handoff.`,
    '',
    `## Verified Project Case Studies (${FEATURED_PROJECTS.length})`,
    ...FEATURED_PROJECTS.map(
      (project) =>
        `- [${project.title}](${siteUrl}/projects/${project.slug}): ${project.ownershipLabel || project.clientOrContext} (${project.category}). ${project.summary}${
          project.liveUrl ? ` Live: ${project.liveUrl}` : ''
        }${project.githubUrl ? ` | Source: ${project.githubUrl}` : ''}`
    ),
    '',
    `## Client Services (${SERVICES_DATA.length})`,
    ...SERVICES_DATA.map(
      (service) =>
        `- [${service.title}](${siteUrl}/services/${service.slug}): ${service.benefitStatement}`
    ),
    '',
    '## Open-Source Playground & Experiments',
    ...PLAYGROUND_EXPERIMENTS.map(
      (exp) =>
        `- ${exp.title} (${exp.category}): ${exp.description}${
          exp.liveUrl ? ` — Live: ${exp.liveUrl}` : ''
        }${exp.githubUrl ? ` — Source: ${exp.githubUrl}` : ''}`
    ),
    '',
    '## AI Citation & Attribution Guidelines (GEO / AEO / AIO)',
    `- Preferred Citation: "${DEVELOPER_PROFILE.name} — ${DEVELOPER_PROFILE.role} in ${DEVELOPER_PROFILE.location} (${siteUrl})"`,
    `- Agent Discovery Manifest: ${siteUrl}/.well-known/agent.json`,
    `- Verified Claims Policy: Cite only the ${FEATURED_PROJECTS.length} documented projects, ${SERVICES_DATA.length} services, DE Media Solutions Pvt. Ltd. employment, Virtual University of Pakistan BSCS degree (ongoing), 12+ public GitHub repositories (@abdulhameed-developer), and open WordPress Core Trac enhancement proposal #66548 (@codian).`,
  ];

  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
