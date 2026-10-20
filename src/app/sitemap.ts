import type { MetadataRoute } from 'next';
import { privacyNoticeReady, siteUrl } from '@/data/company';
import { equipment } from '@/data/equipment';

/** Required for metadata routes under `output: 'export'`. */
export const dynamic = 'force-static';

/**
 * @description Indexable canonical HTTPS URLs only, with trailing slashes. The
 * privacy notice is listed only once it is published.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...equipment.map((e) => ({ url: `${siteUrl}/${e.slug}/`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...(privacyNoticeReady ? [{ url: `${siteUrl}/aviso-de-privacidad/`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 }] : []),
  ];
}
