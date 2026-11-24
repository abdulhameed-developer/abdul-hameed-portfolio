import type { MetadataRoute } from 'next';
import { resolvePublicSiteOrigin } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = resolvePublicSiteOrigin();

  return {
    rules: [
      {
        userAgent: [
          '*',
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'Cohere-ai',
          'YouBot',
          'DuckAssistBot',
        ],
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
          '/api/agent-profile',
          '/.well-known/agent.json',
        ],
        disallow: ['/api/contact'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
