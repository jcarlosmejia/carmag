/** Glyphs available to `Icon`. */
export type IconName = 'flatbed' | 'dryvan' | 'route' | 'check' | 'quote' | 'whatsapp' | 'phone' | 'mail' | 'arrow';

/**
 * @description Inline line icons; they inherit `currentColor`. Kept inline
 * rather than adding an icon package for nine glyphs.
 * @param name Glyph to render.
 * @param className Size and colour classes.
 */
export function Icon({ name, className = 'h-6 w-6' }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  flatbed: (
    <>
      <path d="M2 15h20" />
      <path d="M4.5 15V9.8M9 15V9.8M13.5 15V9.8M18 15V9.8" />
      <path d="M2.8 15v2.2h18.4V15" />
      <circle cx="6.4" cy="18.6" r="1.6" />
      <circle cx="10.4" cy="18.6" r="1.6" />
      <circle cx="17.6" cy="18.6" r="1.6" />
    </>
  ),
  dryvan: (
    <>
      <rect x="2.5" y="6.5" width="19" height="9.5" rx="1" />
      <path d="M12 6.5V16" />
      <path d="M9.4 11.2h1.4M13.2 11.2h1.4" />
      <circle cx="7" cy="18.6" r="1.6" />
      <circle cx="17" cy="18.6" r="1.6" />
    </>
  ),
  route: (
    <>
      <circle cx="5.2" cy="5.6" r="2.4" />
      <circle cx="18.8" cy="18.4" r="2.4" />
      <path d="M5.2 8v4.2a3.4 3.4 0 0 0 3.4 3.4h6.8" strokeDasharray="0.1 3.2" />
      <path d="M16.4 18.4h-1.2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M8.4 12.2 11 14.8l4.7-5.2" />
    </>
  ),
  quote: (
    <>
      <path d="M14.6 3.4H6.8a1.4 1.4 0 0 0-1.4 1.4v14.4a1.4 1.4 0 0 0 1.4 1.4h10.4a1.4 1.4 0 0 0 1.4-1.4V7.6z" />
      <path d="M14.6 3.4v4.2h4" />
      <path d="M8.6 12.4h6.8M8.6 15.8h4.4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.3 11.6a8.3 8.3 0 0 1-12.2 7.3L3.7 20.3l1.4-4.4A8.3 8.3 0 1 1 20.3 11.6z" />
      <path d="M9.1 8.6c-.3.6-.3 1.6.4 2.6a8 8 0 0 0 3.3 3.3c1 .7 2 .7 2.6.4l.5-1.1-2-.9-.7.7a6 6 0 0 1-2.3-2.3l.7-.7-.9-2z" />
    </>
  ),
  phone: (
    <path d="M6.3 3.6h2.6l1.5 3.8-1.9 1.4a10.6 10.6 0 0 0 5.3 5.3l1.4-1.9 3.8 1.5v2.6a2 2 0 0 1-2.2 2A15.3 15.3 0 0 1 4.3 5.8a2 2 0 0 1 2-2.2z" />
  ),
  mail: (
    <>
      <rect x="2.9" y="5.4" width="18.2" height="13.2" rx="1.6" />
      <path d="M3.4 6.6 12 13l8.6-6.4" />
    </>
  ),
  arrow: <path d="M4.5 12h14.2M13.4 6.8 18.7 12l-5.3 5.2" />,
};
