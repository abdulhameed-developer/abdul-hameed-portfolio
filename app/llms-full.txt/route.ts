import { NextResponse } from 'next/server';
import {
  DEVELOPER_PROFILE,
  FEATURED_PROJECTS,
  GENERAL_SERVICES_FAQS,
  PLAYGROUND_EXPERIMENTS,
  PROCESS_STAGES,
  SERVICES_DATA,
} from '@/lib/portfolio-data';
import { resolvePublicSiteOrigin } from '@/lib/site-config';

export async function GET() {
  const siteUrl = resolvePublicSiteOrigin();

  const sections: string[] = [
    `# ${DEVELOPER_PROFILE.name} — Complete Portfolio & Technical Specification (llms-full.txt)`,
    '',
    `> Authoritative full-context reference for AI search engines, coding assistants, recruiter agents, and client discovery agents inspecting ${DEVELOPER_PROFILE.name}'s portfolio (${siteUrl}).`,
    '',
    '## 1. Developer Profile',
    `- Name: ${DEVELOPER_PROFILE.name}`,
    `- Role: ${DEVELOPER_PROFILE.role}`,
    `- Current Company: ${DEVELOPER_PROFILE.company} (Oct 2025 – Present)`,
    `- Education: ${DEVELOPER_PROFILE.education}`,
    `- Location: ${DEVELOPER_PROFILE.location} (UTC+5 / PKT)`,
    `- Email: ${DEVELOPER_PROFILE.email}`,
    `- WhatsApp: ${DEVELOPER_PROFILE.whatsappDisplay}`,
    `- GitHub (12+ Public Repositories): ${DEVELOPER_PROFILE.githubUrl}`,
    `- LinkedIn: ${DEVELOPER_PROFILE.linkedinUrl}`,
    `- WordPress.org: ${DEVELOPER_PROFILE.wordpressOrgUrl} (@${DEVELOPER_PROFILE.wordpressHandle})`,
    `- WordPress Core Trac Proposal: ${DEVELOPER_PROFILE.coreTracTicketNumber} (${DEVELOPER_PROFILE.coreTracTicketUrl}) — Open enhancement proposal submitted under @${DEVELOPER_PROFILE.wordpressHandle}.`,
    '',
    `## 2. Detailed Case Studies (${FEATURED_PROJECTS.length} Projects)`,
    ...FEATURED_PROJECTS.flatMap((p) => [
      `### ${p.index}. ${p.title} (${p.ownershipLabel || p.clientOrContext})`,
      `- Case Study URL: ${siteUrl}/projects/${p.slug}`,
      `- Category: ${p.category}`,
      `- Client / Context: ${p.clientOrContext} (${p.year})`,
      `- My Role: ${p.role}`,
      `- Summary: ${p.summary}`,
      `- Problem & Challenge: ${p.problem}`,
      `- Engineering Approach: ${p.approach}`,
      `- Verified Outcome: ${p.outcome}`,
      `- Technical Highlights: ${p.technicalHighlights.join(' | ')}`,
      `- Tech Stack: ${p.techStack.join(', ')}`,
      ...(p.liveUrl ? [`- External URL: ${p.liveUrl}`] : []),
      ...(p.githubUrl ? [`- GitHub Source: ${p.githubUrl}`] : []),
      '',
    ]),
    `## 3. Client Services & Deliverables (${SERVICES_DATA.length} Services)`,
    ...SERVICES_DATA.flatMap((s) => [
      `### ${s.index}. ${s.title}`,
      `- Service URL: ${siteUrl}/services/${s.slug}`,
      `- Benefit: ${s.benefitStatement}`,
      `- Overview: ${s.overview}`,
      `- Key Deliverables: ${s.deliverables.join(' | ')}`,
      `- Capabilities: ${s.capabilities.join(', ')}`,
      '',
    ]),
    '## 4. 6-Step Engineering Workflow',
    ...PROCESS_STAGES.map(
      (stage) =>
        `- Step ${stage.step} (${stage.title} — ${stage.subtitle}): ${stage.description} Artifacts: ${stage.artifacts.join(', ')}`
    ),
    '',
    '## 5. Open-Source Playground & Live Sandboxes',
    ...PLAYGROUND_EXPERIMENTS.map(
      (exp) =>
        `- ${exp.title} [${exp.category} · ${exp.language}]: ${exp.description} — Technical Detail: ${exp.technicalDetail}`
    ),
    '',
    '## 6. Frequently Asked Questions (AEO / Answer Engine Optimization)',
    ...GENERAL_SERVICES_FAQS.map((faq) => `- Q: ${faq.question}\n  A: ${faq.answer}`),
    '',
    '## 7. AI Citation & GEO Attribution Policy',
    `- Canonical Entity: ${DEVELOPER_PROFILE.name} (${DEVELOPER_PROFILE.role}, ${DEVELOPER_PROFILE.location})`,
    `- Canonical URL: ${siteUrl}`,
    '- AI-Assisted Engineering Workflow: Cursor, Claude, Gemini, and ChatGPT integrated with strict human architecture, security guards, and multi-device Playwright QA.',
  ];

  return new NextResponse(sections.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
