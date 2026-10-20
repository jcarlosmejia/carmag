import type { Equipment } from '@/data/equipment';

/**
 * @description Side-profile pictogram with a length dimension, drawn in the
 * style of the truck on the CARMAG business card. Shown where no real photo of
 * the unit exists yet; it describes the equipment type, not a specific unit.
 * @param item Equipment entry.
 * @param tone `dark` for teal bands, `light` for paper bands.
 */
export function EquipmentDiagram({ item, tone = 'light', className = '' }: { item: Equipment; tone?: 'dark' | 'light'; className?: string }) {
  const ink = tone === 'dark' ? '#ffffff' : '#123c3d';
  const bg = tone === 'dark' ? '#1a4748' : '#f3f6f6';
  const van = item.slug === 'caja-seca-53-pies';
  return (
    <svg viewBox="0 0 340 150" className={className} role="img" aria-label={`Diagrama de ${item.name}: ${item.lengthLabel}`}>
      <g transform="translate(-490 -330)">
        {van ? (
          <rect x="500" y="346" width="230" height="74" rx="3" fill="#c8794b" />
        ) : (
          <>
            <rect x="500" y="404" width="230" height="14" rx="2" fill="#c8794b" />
            <rect x="722" y="372" width="8" height="34" fill="#c8794b" />
          </>
        )}
        <rect x="514" y="420" width="64" height="9" fill={ink} />
        <rect x="640" y="420" width="5" height="18" fill={ink} />
        <rect x="688" y="421" width="132" height="10" fill={ink} />
        <path d="M736,352 L782,352 L800,384 L816,390 Q820,391 820,395 L820,431 L736,431 Z" fill={ink} />
        <path d="M766,360 L781.5,360 L792.5,380 L766,380 Z" fill={bg} />
        {[535, 563, 712, 740, 802].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="436" r="12" fill={ink} stroke={bg} strokeWidth="3" />
            <circle cx={cx} cy="436" r="3.6" fill={bg} />
          </g>
        ))}
        <g stroke={ink} strokeWidth="1.5" opacity="0.75">
          <line x1="500" y1="462" x2="730" y2="462" />
          <line x1="500" y1="455" x2="500" y2="469" />
          <line x1="730" y1="455" x2="730" y2="469" />
        </g>
        <text
          x="615"
          y="476"
          textAnchor="middle"
          fontFamily="var(--font-montserrat), Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill={ink}
          stroke={bg}
          strokeWidth="6"
          paintOrder="stroke"
        >
          {item.lengthLabel}
        </text>
      </g>
    </svg>
  );
}
