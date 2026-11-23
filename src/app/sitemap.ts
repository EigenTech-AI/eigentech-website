import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({
    url: `${site.url}/en${path}`,
    lastModified: now,
    priority,
    alternates: { languages: { en: `${site.url}/en${path}`, ar: `${site.url}/ar${path}` } },
  });
  return [
    page('/', 1), { ...page('/', 1), url: `${site.url}/ar/` },
    ...(['ar', 'en'] as const).map((l) => ({
      url: `${site.url}/warraq/${l}/`,
      lastModified: now,
      priority: 0.9,
      alternates: { languages: { ar: `${site.url}/warraq/ar/`, en: `${site.url}/warraq/en/` } },
    })),
    page('/privacy/', 0.3), { ...page('/privacy/', 0.3), url: `${site.url}/ar/privacy/` },
  ];
}
