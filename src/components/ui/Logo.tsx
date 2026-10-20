import { DESCRIPTOR_PATH, LOGO_VIEWBOX, MARK_A, MARK_B, MARK_TRANSFORM, WORDMARK_PATH } from '@/data/logoPaths';

/** Inks per background, exactly as on the business card (back = dark, front = light). */
const INKS = {
  dark: { markA: '#ffffff', markB: '#c8794b', word: '#ffffff', descriptor: '#b9c4c4' },
  light: { markA: '#123c3d', markB: '#c8794b', word: '#123c3d', descriptor: '#6b7779' },
} as const;

/**
 * @description CARMAG TRANSPORTS lockup, inline SVG. Geometry and colours from
 * the business card; wordmark traced in Montserrat (scripts/build-brand.mjs).
 * @param tone `dark` on teal backgrounds, `light` on white/paper.
 * @param className Size classes (set a height; width follows).
 * @param title Accessible name; omit when a parent link already names it.
 */
export function Logo({ tone = 'dark', className = 'h-9 w-auto', title }: { tone?: 'dark' | 'light'; className?: string; title?: string }) {
  const ink = INKS[tone];
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <g strokeWidth="12" strokeLinejoin="round" transform={MARK_TRANSFORM}>
        <polygon points={MARK_A} fill={ink.markA} stroke={ink.markA} />
        <polygon points={MARK_B} fill={ink.markB} stroke={ink.markB} />
      </g>
      <path d={WORDMARK_PATH} fill={ink.word} />
      <path d={DESCRIPTOR_PATH} fill={ink.descriptor} />
    </svg>
  );
}
