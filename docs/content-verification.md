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

## Bloquea la publicación (3)

_El sitio no debe publicarse sin esto._

### ¿Qué teléfono es el principal, cuál el secundario y cuál tiene WhatsApp, y está autorizado publicar cada uno en el sitio?

- **Por qué no se publica:** Los números de la tarjeta de presentación no están confirmados para uso público. Además, son los mismos que publica el sitio de Romo's Transportes: hay que confirmar que deben aparecer también en CARMAG TRANSPORTS.
- **Qué hace el sitio hoy:** No se muestra ningún teléfono ni botón de WhatsApp. Al confirmar, se activan en encabezado, menú móvil, contacto, pie de página, botón flotante y datos estructurados, siempre en el mismo orden.
- **Identificador interno:** `contact-authorization`

### ¿El buzón contacto.carmag@gmail.com es de la empresa, quién lo atiende y con qué frecuencia? ¿Cuándo estará contacto@carmag.com.mx?

- **Por qué no se publica:** El correo es el destino del formulario de cotización. Publicar un buzón que nadie revisa pierde solicitudes.
- **Qué hace el sitio hoy:** No se muestra correo y el formulario de cotización está oculto. El cambio a contacto@carmag.com.mx es un solo valor en src/data/company.ts.
- **Identificador interno:** `email-mailbox`

### ¿Cuál es la razón social registrada y el domicilio del responsable del tratamiento de datos personales?

- **Por qué no se publica:** El aviso de privacidad (LFPDPPP) debe identificar al responsable con su nombre legal y domicilio. La marca comercial no sustituye la razón social.
- **Qué hace el sitio hoy:** No se genera la página de aviso de privacidad ni su enlace, y el formulario permanece oculto en producción.
- **Identificador interno:** `legal-identity`

## Limita el mensaje (5)

_El sitio funciona, pero no puede afirmarlo hasta que se confirme._

### La tarjeta usa el logotipo en verde petróleo (#123C3D) y cobre (#C8794B), pero la paleta indicada es azul marino (#071B2E), rojo (#D71920) y gris (#697580). ¿Cuál es la oficial?

- **Por qué no se publica:** No se debe recolorear ni rediseñar el logotipo sin aprobación, y las dos referencias no coinciden.
- **Qué hace el sitio hoy:** El sitio usa la paleta azul marino / rojo / gris. El logotipo conserva la geometría exacta de la tarjeta, en un solo color (blanco sobre fondo oscuro, azul marino sobre fondo claro). El texto del logotipo se trazó en Montserrat. Cambiar la paleta es editar los tokens en src/app/globals.css.
- **Identificador interno:** `logo-palette`

### ¿Existe el archivo maestro del logotipo (SVG con texto convertido a trazos)?

- **Por qué no se publica:** La tarjeta usa texto en vivo con la fuente Avenir Next; el sitio no puede depender de una fuente con licencia instalada en otra computadora.
- **Qué hace el sitio hoy:** Se generan versiones trazadas del logotipo con Montserrat (npm run brand). Al recibir el maestro, se sustituyen en scripts/build-brand.mjs.
- **Identificador interno:** `logo-master`

### ¿Puede enviar de 8 a 15 fotografías reales de unidades CARMAG (Freightliner Cascadia, caja seca 53', plataforma 40', maniobras de carga)?

- **Por qué no se publica:** Solo se publican fotos reales de la empresa. No se usan fotos de stock, imágenes generadas ni fotos de Romo's Transportes.
- **Qué hace el sitio hoy:** Las secciones muestran fichas técnicas y diagramas de medidas en lugar de fotos; la galería no se muestra. Al agregar fotos en photos/ y correr npm run images, aparecen sin cambiar el diseño.
- **Identificador interno:** `photos`

### ¿Qué configuración vehicular y número de ejes tiene cada unidad, y qué capacidad de carga autorizada conforme a la NOM-012-SCT-2?

- **Por qué no se publica:** El máximo legal depende de la configuración y del tipo de camino. La capacidad nominal de 40,000 kg de la plataforma Ferbus no es una carga útil autorizada.
- **Qué hace el sitio hoy:** No se publica ninguna cifra de peso. Se indica que la capacidad depende de la unidad, configuración, dimensiones, peso y ruta, y se confirma al cotizar.
- **Identificador interno:** `equipment-config`

### ¿Cuándo estarán operando el GPS y el seguimiento para clientes? ¿Hay póliza de seguro de carga, capacitación de operadores o certificaciones documentadas?

- **Por qué no se publica:** Ninguna de estas prácticas está verificada todavía.
- **Qué hace el sitio hoy:** No existe sección de seguridad de la carga ni se menciona GPS, seguro o certificaciones. El seguimiento de embarques queda como integración futura, desactivada.
- **Identificador interno:** `cargo-security`

## Mejora opcional (6)

_No bloquea nada; mejora el resultado si se resuelve._

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
