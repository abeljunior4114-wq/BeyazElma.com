import { MetadataRoute } from 'next';
import matchesData from '@/data/mockMatches.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyazelma.com';
  
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${baseUrl}/live`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/matches`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leagues`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const matchRoutes: MetadataRoute.Sitemap = (matchesData as any[]).map((match) => ({
    url: `${baseUrl}/matches/${match.match_id}`,
    lastModified: new Date(match.last_update_ts || Date.now()),
    changeFrequency: 'hourly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...matchRoutes];
}

