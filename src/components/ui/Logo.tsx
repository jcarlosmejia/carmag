import { DESCRIPTOR_PATH, LOGO_VIEWBOX, MARK_A, MARK_B, MARK_TRANSFORM, WORDMARK_PATH } from '@/data/logoPaths';

/**
 * @description CARMAG TRANSPORTS lockup, inline SVG in a single ink
 * (`currentColor`). Geometry from the business card; see scripts/build-brand.mjs.
 * @param className Size and colour classes (set a height; width follows).
 * @param title Accessible name; omit when a parent link already names it.
 */
export function Logo({ className = 'h-9 w-auto', title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="currentColor"
    >
      <g stroke="currentColor" strokeWidth="12" strokeLinejoin="round" transform={MARK_TRANSFORM}>
        <polygon points={MARK_A} />
        <polygon points={MARK_B} />
      </g>
      <path d={WORDMARK_PATH} />
      <path d={DESCRIPTOR_PATH} />
    </svg>
  );
}
