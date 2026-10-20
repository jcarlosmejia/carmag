import type { ImageAsset } from '@/data/imageManifest';

const srcSet = (asset: ImageAsset, kind: 'avif' | 'webp' | 'jpg') =>
  asset.renditions.map((r) => `${r[kind]} ${r.width}w`).join(', ');

/**
 * @description Native `<picture>` over pre-built AVIF/WebP/JPEG renditions.
 * `next/image` is unoptimized under static export (single `src`), so this keeps
 * real `srcset` selection. `width`/`height` reserve the box (no CLS).
 * @param asset Manifest entry.
 * @param sizes Real rendered width per breakpoint.
 * @param priority Eager, high-priority fetch — LCP image only.
 * @param className Classes for the `<img>`.
 */
export function Photo({
  asset,
  sizes,
  priority = false,
  className = '',
}: {
  asset: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const largest = asset.renditions[asset.renditions.length - 1]!;
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(asset, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(asset, 'webp')} sizes={sizes} />
      <img
        src={largest.jpg}
        srcSet={srcSet(asset, 'jpg')}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  );
}

/**
 * @description Hero with separate desktop and mobile crops (art direction).
 * @param desktop ~16:10 crop, shown from 768px.
 * @param mobile 4:3 crop, shown below 768px.
 */
export function ArtDirectedPhoto({ desktop, mobile, className = '' }: { desktop: ImageAsset; mobile: ImageAsset; className?: string }) {
  const sizes = '(min-width: 1024px) 40rem, 100vw';
  const largest = mobile.renditions[mobile.renditions.length - 1]!;
  return (
    <picture>
      <source media="(min-width: 768px)" type="image/avif" srcSet={srcSet(desktop, 'avif')} sizes={sizes} />
      <source media="(min-width: 768px)" type="image/webp" srcSet={srcSet(desktop, 'webp')} sizes={sizes} />
      <source media="(min-width: 768px)" srcSet={srcSet(desktop, 'jpg')} sizes={sizes} />
      <source type="image/avif" srcSet={srcSet(mobile, 'avif')} sizes="100vw" />
      <source type="image/webp" srcSet={srcSet(mobile, 'webp')} sizes="100vw" />
      <img
        src={largest.jpg}
        srcSet={srcSet(mobile, 'jpg')}
        sizes="100vw"
        width={mobile.width}
        height={mobile.height}
        alt={desktop.alt}
        className={`aspect-[4/3] w-full object-cover md:aspect-[16/10] ${className}`}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
    </picture>
  );
}

/**
 * @description Preloads the hero crop matching each breakpoint, so the LCP
 * image starts before the `<picture>` is parsed.
 */
export function HeroPreload({ desktop, mobile }: { desktop: ImageAsset; mobile: ImageAsset }) {
  return (
    <>
      <link rel="preload" as="image" type="image/avif" media="(min-width: 768px)" imageSrcSet={srcSet(desktop, 'avif')} imageSizes="(min-width: 1024px) 40rem, 100vw" fetchPriority="high" />
      <link rel="preload" as="image" type="image/avif" media="(max-width: 767.98px)" imageSrcSet={srcSet(mobile, 'avif')} imageSizes="100vw" fetchPriority="high" />
    </>
  );
}
