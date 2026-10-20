# Lanzamiento de carmag.com.mx — pasos del propietario

Estos pasos se hacen fuera del código. El orden importa: el correo del dominio
sigue en NEUBOX y no debe interrumpirse.

## 0. Antes de publicar (bloqueos)

El sitio en producción oculta todo canal de contacto hasta que se confirme. Sin
estos puntos, el sitio publicado no tiene forma de pedir cotización:

1. Confirmar teléfono principal, secundario y número de WhatsApp para uso
   público (`contact-authorization` en `docs/content-verification.md`).
2. Confirmar el buzón de correo y quién lo atiende (`email-mailbox`).
3. Confirmar razón social y domicilio del responsable de datos personales
   (`legal-identity`). Sin esto no se publica el aviso de privacidad ni el
   formulario.

Cada confirmación es un cambio en `src/data/company.ts` (indicador `confirmed`
o el valor que hoy está en `null`), seguido de `npm run docs`.

## 1. Cuentas

1. Confirmar quién es titular de la cuenta de NEUBOX donde está registrado el
   dominio y que se tiene acceso.
2. Crear o confirmar la cuenta de Cloudflare de la empresa.

**No cambiar los servidores DNS (nameservers) hasta completar el paso 2.**

## 2. Inventario DNS actual (estado observado el 2026-10-19)

- Servidores DNS: `ns301`–`ns305.cloud-mx-ns.net` (NEUBOX).
- `A carmag.com.mx → 65.99.225.96` (página de estacionamiento de NEUBOX, sin HTTPS).
- `MX carmag.com.mx → carmag.com.mx` (prioridad 0): el correo apunta al mismo
  servidor de NEUBOX.

Antes de migrar, exportar **todos** los registros desde el panel de NEUBOX,
incluidos los que no se ven por consulta pública: `TXT` (SPF, verificaciones),
DKIM (`*._domainkey`), `_dmarc`, `mail`, `webmail`, `autodiscover` y cualquier
`CNAME`.

## 3. Migración a Cloudflare sin cortar el correo

1. Agregar el dominio en Cloudflare y revisar que importó todos los registros
   del paso 2. Agregar a mano los que falten.
2. El registro que usa el correo **no puede quedar detrás del proxy** de
   Cloudflare: como el MX apunta al dominio raíz, crear un registro dedicado
   (por ejemplo `mail.carmag.com.mx A 65.99.225.96`, nube gris / "DNS only") y
   cambiar el MX para que apunte a `mail.carmag.com.mx`. Confirmar con NEUBOX
   la IP correcta de su servidor de correo.
3. Conservar SPF, DKIM y DMARC exactamente como estaban.
4. Cambiar los nameservers en NEUBOX a los que indique Cloudflare.
5. Verificar envío y recepción de correo desde y hacia el dominio.

## 4. Publicar el sitio

1. En Cloudflare: Workers & Pages → Create → Workers → importar el repositorio.
   Build command `npm run build`, deploy command `npx wrangler deploy`.
   Workers Builds despliega en cada push a `main`.
2. Comprobar el sitio en la URL `*.workers.dev`.
3. Adjuntar el dominio **desde el panel**: Worker → Settings → Domains & Routes
   → Add → Custom domain → `carmag.com.mx`. Si Cloudflare pide reemplazar el
   registro `A` existente, aceptar. No declarar `routes` en `wrangler.jsonc`.
4. SSL/TLS → Edge Certificates → **Always Use HTTPS**: activado.
5. Rules → Redirect Rules: `www.carmag.com.mx/*` → `https://carmag.com.mx/${1}`
   con 301 (requiere un registro `www` con proxy activado).

## 5. Verificación en vivo

```
curl -sI http://carmag.com.mx/              # 301 → https://carmag.com.mx/
curl -sI https://www.carmag.com.mx/         # 301 → https://carmag.com.mx/
curl -sI https://carmag.com.mx/             # 200
curl -sI https://carmag.com.mx/caja-seca-53-pies/    # 200
curl -sI https://carmag.com.mx/plataforma-40-pies/   # 200
curl -sI https://carmag.com.mx/no-existe/   # 404
curl -s  https://carmag.com.mx/ | grep canonical
curl -s  https://carmag.com.mx/sitemap.xml
curl -s  https://carmag.com.mx/robots.txt
```

## 6. Medición y buscadores

1. Cloudflare → Web Analytics: activar para el sitio (sin cookies, sin código).
2. Opcional: Cloudflare Zaraz con el evento `cta_click` (el sitio ya lo envía
   si Zaraz está activo). Si se activa, actualizar el aviso de privacidad.
3. Google Search Console: propiedad de **dominio**, verificada con un registro
   `TXT` en Cloudflare DNS (no tocar los registros MX). Enviar
   `https://carmag.com.mx/sitemap.xml`.
4. Bing Webmaster Tools: importar desde Search Console.
5. Perfil de Empresa en Google con exactamente el mismo nombre (CARMAG
   TRANSPORTS), teléfono, correo y URL que el sitio; como empresa de área de
   servicio mientras no haya domicilio público.

## 7. Después del lanzamiento

- Al tener HTTPS en todos los subdominios, se puede agregar
  `includeSubDomains` al encabezado HSTS en `public/_headers`.
- Cuando exista `contacto@carmag.com.mx`, cambiar el correo en
  `src/data/company.ts`.
- Páginas por ruta (por ejemplo `/fletes-guadalajara-monterrey/`) solo con
  datos reales por ruta: tiempos de tránsito, frecuencia y carga típica.
