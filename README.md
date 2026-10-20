# carmag.com.mx — CARMAG TRANSPORTS

Sitio estático (Next.js `output: 'export'`) para CARMAG TRANSPORTS, transporte
de carga y fletes desde Guadalajara. Se publica como Worker de activos
estáticos en Cloudflare (`wrangler.jsonc`, que ejecuta `npm run build` antes de
desplegar).

Identidad visual: la tarjeta de presentación es la fuente (verde petróleo
`#123C3D`, cobre `#C8794B`, grises `#6B7779` / `#B9C4C4`); tokens en
`src/app/globals.css`, auditados con `npm run brand`.

## Regla de datos

Todo dato de negocio vive en `src/data/company.ts`. Un dato sin confirmar está
en `null` o con `confirmed: false`, y la interfaz lo oculta: nunca se muestra
un marcador, un número de ejemplo ni una suposición. Lo pendiente está en
`docs/content-verification.md` (generado con `npm run docs`).

Llamadas, WhatsApp y correo están autorizados y publicados. El aviso de
privacidad sigue oculto hasta confirmar razón social y domicilio. Para una
compilación de revisión (con `noindex`):

```bash
NEXT_PUBLIC_CARMAG_REVIEW=1 npm run build
```

Esa versión lleva `noindex` y un aviso visible. No debe desplegarse.

## Comandos

| Comando | Qué hace |
| :-- | :-- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Exporta a `out/` y elimina rutas soft-404 |
| `npm run qa` | lint, tipos, pruebas, contraste, build y revisión del sitio |
| `npm run check` | Revisa `out/`: un H1, canonical propio, JSON-LD, enlaces, sitemap |
| `npm run brand` | Logotipo trazado, íconos, imagen OG y auditoría de contraste WCAG |
| `npm run images` | Renditions AVIF/WebP/JPEG desde `photos/` (ver `scripts/photos.config.mjs`) |
| `npm run map` | Mapa de cobertura desde Natural Earth |
| `npm run docs` | Genera `docs/content-verification.md` |

## Fotografías

Solo fotos propiedad de la empresa. Se colocan en `photos/` (no se versiona),
se describen en `scripts/photos.config.mjs` —con recorte (`region`) y
difuminado de emblemas, rótulos y placas (`redact`)— y se procesan con
`npm run images`.
Cada sección tiene un espacio (`hero`, `hero-mobile`, `caja-seca`,
`plataforma`, `operacion`, `gallery`); sin foto, muestra su versión sin foto.

## Formulario

No hay backend. El formulario de `#cotizar` valida en el navegador, arma un
mensaje y abre WhatsApp; el visitante lo envía. No pide nombre, correo ni
teléfono, y no guarda nada en almacenamiento, URL ni analítica. Solo la unidad
viaja en la URL (`/?unidad=caja-seca-53#cotizar`, `/?unidad=planas-40#cotizar`)
desde las páginas de equipo. Lógica y pruebas: `src/lib/quote.ts` y
`src/lib/quote.test.ts` (`npm test`).

Analítica: los clics en `[data-cta]` y la apertura de WhatsApp desde el
formulario (`whatsapp-formulario`) emiten `carmag:cta` y `cta_click` en
Cloudflare Zaraz si está activo. Solo nombre y ubicación del botón; el sitio no
puede saber si el mensaje se envió.

## Lanzamiento

Ver `docs/lanzamiento.md`: cuentas, DNS sin cortar el correo, dominio, HTTPS,
redirecciones y buscadores.
