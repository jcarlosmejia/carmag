import { corridors } from '@/data/content';
import { corridorPaths, MAP_HEIGHT, MAP_WIDTH, MEXICO_OUTLINE, mapPoints, type MapPointId } from '@/data/mapGeometry';

/**
 * Hand-placed label anchors, checked against a rendered PNG for overlaps.
 * Silao, Irapuato and Celaya share one label: their dots sit ~8px apart.
 * Ramos Arizpe shares Saltillo's.
 */
const LABELS: readonly { text: string; x: number; y: number; anchor: 'start' | 'middle' | 'end' }[] = [
  { text: 'Tepic', x: 398, y: 376, anchor: 'end' },
  { text: 'Colima', x: 461, y: 463, anchor: 'start' },
  { text: 'Manzanillo', x: 420, y: 486, anchor: 'end' },
  { text: 'Mazatlán', x: 352, y: 329, anchor: 'end' },
  { text: 'Culiacán', x: 322, y: 278, anchor: 'end' },
  { text: 'Los Mochis', x: 274, y: 245, anchor: 'end' },
  { text: 'Cd. Obregón', x: 274, y: 190, anchor: 'start' },
  { text: 'Hermosillo', x: 244, y: 136, anchor: 'start' },
  { text: 'Chihuahua', x: 390, y: 151, anchor: 'start' },
  { text: 'Torreón', x: 442, y: 254, anchor: 'end' },
  { text: 'Monterrey', x: 563, y: 241, anchor: 'start' },
  { text: 'Saltillo · Ramos Arizpe', x: 512, y: 281, anchor: 'start' },
  { text: 'Aguascalientes', x: 504, y: 362, anchor: 'start' },
  { text: 'León', x: 522, y: 389, anchor: 'start' },
  { text: 'Querétaro', x: 561, y: 417, anchor: 'start' },
  { text: 'Silao · Irapuato · Celaya', x: 488, y: 440, anchor: 'start' },
];

const stops = corridors.flatMap((c) => c.stops.map((s) => s.id)) as MapPointId[];
const hub = mapPoints.guadalajara;

/**
 * @description Coverage map generated from Natural Earth (scripts/build-map.mjs).
 * Guadalajara is the dominant hub; each corridor is one dashed path through its
 * listed destinations. Static, no animation. Labels hide below 640px, where the
 * HTML corridor list carries the names.
 */
export function MexicoMap({ className = '' }: { className?: string }) {
  const description = `Mapa de México con Guadalajara como base operativa y tres corredores de servicio: ${corridors
    .map((c) => `${c.name} (${c.stops.map((s) => s.name).join(', ')})`)
    .join('; ')}. Cobertura nacional bajo cotización.`;

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className={className}
      role="img"
      aria-labelledby="mapa-titulo mapa-descripcion"
    >
      <title id="mapa-titulo">Corredores de servicio de CARMAG TRANSPORTS desde Guadalajara</title>
      <desc id="mapa-descripcion">{description}</desc>

      <path d={MEXICO_OUTLINE} fill="#1a4748" stroke="#b9c4c4" strokeWidth="2" strokeLinejoin="round" />

      <g fill="none" stroke="#e3a781" strokeWidth="4" strokeDasharray="10 7" strokeLinecap="round" strokeLinejoin="round">
        {Object.values(corridorPaths).map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g fill="#ffffff" stroke="#123c3d" strokeWidth="2.5">
        {stops.map((id) => (
          <circle key={id} cx={mapPoints[id].x} cy={mapPoints[id].y} r="6" />
        ))}
      </g>

      <circle cx={hub.x} cy={hub.y} r="21" fill="none" stroke="#c8794b" strokeWidth="3" opacity="0.7" />
      <circle cx={hub.x} cy={hub.y} r="11" fill="#c8794b" stroke="#ffffff" strokeWidth="3" />

      <g
        className="hidden sm:inline"
        fontFamily="var(--font-montserrat), Arial, sans-serif"
        fontWeight="600"
        fontSize="18"
        fill="#e6eded"
        stroke="#123c3d"
        strokeWidth="5"
        strokeLinejoin="round"
        paintOrder="stroke"
      >
        <text x="444" y="430" textAnchor="end" fontSize="26" fontWeight="800" fill="#ffffff">
          Guadalajara
        </text>
        {LABELS.map((l) => (
          <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor}>
            {l.text}
          </text>
        ))}
      </g>
    </svg>
  );
}
