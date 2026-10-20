import type { MetadataRoute } from 'next';
import { isReviewBuild, siteUrl } from '@/data/company';

/** Required for metadata routes under `output: 'export'`. */
export const dynamic = 'force-static';

/** @description `Allow: /` plus the sitemap; review builds disallow everything. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', ...(isReviewBuild ? { disallow: '/' } : { allow: '/' }) }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
