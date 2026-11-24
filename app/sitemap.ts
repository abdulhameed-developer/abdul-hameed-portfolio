import type { MetadataRoute } from 'next';
import {
  FEATURED_PROJECTS,
  SERVICES_DATA,
} from '@/lib/portfolio-data';
import { resolvePublicSiteOrigin } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = resolvePublicSiteOrigin();
  const lastModified = new Date('2026-04-06T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.86,
    },
    {
      url: `${baseUrl}/playground`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.84,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.78,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = FEATURED_PROJECTS.map(
    (project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: project.featured ? 0.92 : 0.85,
    })
  );

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.86,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
