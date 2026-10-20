# Verificación de contenido — CARMAG TRANSPORTS

> **Generado automáticamente** por `npm run docs` a partir de
> `src/data/company.ts` (`pendingVerification`). No editar a mano: resuelva o
> agregue el punto en ese archivo y vuelva a generar.

Este documento lista **todo dato de negocio que el sitio NO afirma** porque no
ha sido confirmado por el propietario. La regla aplicada en todo el proyecto es:
un dato sin confirmar no se publica, no se sustituye por una suposición y no se
toma de la competencia. Los campos correspondientes en `src/data/company.ts`
están en `null` y la interfaz oculta lo que no puede sostener.

**Total de puntos pendientes: 14**

## Bloquea la publicación (1)

_El sitio no debe publicarse sin esto._

### ¿Cuál es la razón social registrada y el domicilio del responsable del tratamiento de datos personales?

- **Por qué no se publica:** El aviso de privacidad (LFPDPPP) debe identificar al responsable con su nombre legal y domicilio. La marca comercial no sustituye la razón social.
- **Qué hace el sitio hoy:** No se genera la página de aviso de privacidad ni su enlace, y el formulario permanece oculto en producción.
- **Identificador interno:** `legal-identity`

## Limita el mensaje (5)

_El sitio funciona, pero no puede afirmarlo hasta que se confirme._

### ¿Existe el archivo maestro del logotipo (SVG con texto convertido a trazos)?

- **Por qué no se publica:** La tarjeta usa texto en vivo con la fuente Avenir Next; el sitio no puede depender de una fuente con licencia instalada en otra computadora.
- **Qué hace el sitio hoy:** Se generan versiones trazadas del logotipo con Montserrat (npm run brand). Al recibir el maestro, se sustituyen en scripts/build-brand.mjs.
- **Identificador interno:** `logo-master`

### ¿Puede enviar fotografías originales en alta resolución, idealmente con unidades rotuladas CARMAG (Freightliner Cascadia, caja seca 53', planas de 40' en adelante, maniobras de carga)?

- **Por qué no se publica:** Las fotos actuales son de la empresa (autorizadas el 2026-10-20), pero vienen de capturas de WhatsApp de unos 1,000 px y no muestran unidades rotuladas CARMAG. Fotos originales en alta resolución mejoran el hero en pantallas grandes.
- **Qué hace el sitio hoy:** Se publican 7 fotos; toda marca, emblema, rótulo de identificación y placa de la identidad anterior está fuera de cuadro o difuminada (scripts/photos.config.mjs). Al agregar fotos en photos/ y correr npm run images, se sustituyen sin cambiar el diseño.
- **Identificador interno:** `photos`

### ¿Qué evidencia comercial verificable puede publicarse: testimonios autorizados por escrito (nombre, empresa y permiso), años de operación documentados, número de unidades activas, horario de atención y fotos de unidades rotuladas CARMAG?

- **Por qué no se publica:** La sección de diferenciadores solo muestra hechos que el sitio ya respalda. No se inventan clientes, certificaciones, seguros, rastreo, tiempos de respuesta ni garantías.
- **Qué hace el sitio hoy:** Se muestran fotos de operación y cuatro diferenciadores verificables; sin testimonios ni cifras de desempeño.
- **Identificador interno:** `trust-evidence`

### ¿Qué configuración vehicular y número de ejes tiene cada unidad, y qué capacidad de carga autorizada conforme a la NOM-012-SCT-2?

- **Por qué no se publica:** El máximo legal depende de la configuración y del tipo de camino. La capacidad nominal de 40,000 kg de la plataforma Ferbus no es una carga útil autorizada.
- **Qué hace el sitio hoy:** No se publica ninguna cifra de peso. Se indica que la capacidad depende de la unidad, configuración, dimensiones, peso y ruta, y se confirma al cotizar.
- **Identificador interno:** `equipment-config`

### ¿Cuándo estarán operando el GPS y el seguimiento para clientes? ¿Hay póliza de seguro de carga, capacitación de operadores o certificaciones documentadas?

- **Por qué no se publica:** Ninguna de estas prácticas está verificada todavía.
- **Qué hace el sitio hoy:** No existe sección de seguridad de la carga ni se menciona GPS, seguro o certificaciones. El seguimiento de embarques queda como integración futura, desactivada.
- **Identificador interno:** `cargo-security`

## Mejora opcional (8)

_No bloquea nada; mejora el resultado si se resuelve._

### ¿Cuándo estará disponible contacto@carmag.com.mx?

- **Por qué no se publica:** Un buzón con el dominio propio da más confianza a compradores B2B que una cuenta de Gmail.
- **Qué hace el sitio hoy:** Se publica contacto.carmag@gmail.com (autorizado). El cambio es un solo valor en src/data/company.ts; los registros MX deben conservarse al migrar el DNS.
- **Identificador interno:** `email-domain`

### La foto de los dos tractocamiones (WhatsApp 2026-10-17 15.39.11) muestra en la puerta del tractocamión morado el emblema de la identidad anterior y el número de unidad «003». ¿Puede enviar una versión sin ese emblema u otra toma de los dos tractocamiones?

- **Por qué no se publica:** Recortar el emblema deja un solo tractocamión y se pierde el sujeto de la foto. No se publica una imagen con referencias a la identidad anterior ni se cubre con logotipos.
- **Qué hace el sitio hoy:** La foto está copiada en photos/ sin publicar. La sección de operación usa las demás fotos.
- **Identificador interno:** `photo-two-tractors`

### ¿Hay cajas secas de 48 pies disponibles actualmente?

- **Por qué no se publica:** Aparecieron en descripciones anteriores, pero no se confirmó disponibilidad ni propiedad.
- **Qué hace el sitio hoy:** Solo se publica la caja seca de 53 pies.
- **Identificador interno:** `equipment-48`

### ¿Se puede documentar la continuidad entre la operación previa (desde 2010) y CARMAG TRANSPORTS?

- **Por qué no se publica:** El año 2010 aparece en materiales anteriores con otra identidad comercial; no es el año de fundación de CARMAG.
- **Qué hace el sitio hoy:** No se publica año de fundación ni años de experiencia.
- **Identificador interno:** `experience-history`

### ¿Cuáles de los destinos por corredor son frecuentes, con qué tiempos de tránsito típicos y qué carga suele moverse?

- **Por qué no se publica:** Los destinos son cobertura sujeta a disponibilidad, no salidas programadas. Las páginas por ruta necesitan datos reales para no ser contenido vacío.
- **Qué hace el sitio hoy:** Mapa y lista presentan "corredores de servicio" sujetos a disponibilidad. No hay páginas por ruta.
- **Identificador interno:** `routes-frequency`

### ¿Desea publicar un domicilio de operaciones y un horario de atención?

- **Por qué no se publica:** Sin domicilio no se usa LocalBusiness y el perfil de Google sería de área de servicio.
- **Qué hace el sitio hoy:** Solo se publica Guadalajara, Jalisco, como ubicación. Sin horario.
- **Identificador interno:** `address-hours`

### ¿Ya existen Perfil de Empresa en Google, página de Facebook o LinkedIn oficiales?

- **Por qué no se publica:** No se enlazan perfiles que no existen.
- **Qué hace el sitio hoy:** No hay enlaces a redes ni `sameAs` en los datos estructurados.
- **Identificador interno:** `social-profiles`

### ¿Confirma Cloudflare Web Analytics (sin cookies) como única medición?

- **Por qué no se publica:** Es la propuesta; el aviso de privacidad debe describir exactamente lo que se mide.
- **Qué hace el sitio hoy:** El sitio no carga ningún script de terceros. Los botones emiten el evento `carmag:cta` y `cta_click` a Cloudflare Zaraz solo si se activa.
- **Identificador interno:** `analytics`

## Cómo se activa un dato confirmado

Cada dato pendiente vive en `src/data/company.ts`. Los canales de contacto
tienen un indicador `confirmed`: al cambiarlo a `true` y reconstruir, el sitio
muestra ese canal en todas sus ubicaciones. Los datos en `null` (razón social,
domicilio, horario, año, flotilla) se llenan con el valor confirmado.

Para revisar el diseño completo con los datos candidatos, sin publicarlos:

```
NEXT_PUBLIC_CARMAG_REVIEW=1 npm run build
```

Esa compilación lleva `noindex` en todas las páginas y un aviso visible. Nunca
debe ser la que se despliega en producción.
