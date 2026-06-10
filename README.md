# Katena - Next.js

Web institucional para Katena, el espacio profesional de entrenamiento postural y fuerza de Matias Aramburu.

## Alcance actual

- Portfolio profesional / institucional.
- Presentacion de Katena y Prof. Matias Aramburu desde el inicio.
- Sobre Katena, FAQ, actividades, K-Stretch® y contacto.
- Reserva externa mediante CrossfyApp.
- Contacto por WhatsApp, Instagram y correo.

No incluye panel de administracion, Google Sheets, base de datos, login, pagos ni sistema propio de turnos.

## Desarrollo

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Build

```bash
npm run build
```

La app esta configurada con `output: "export"` y `vercel.json` apunta a la carpeta `out`.

## Editar contenido

El contenido principal esta centralizado en:

```text
src/data/site.js
```

Desde ahi se pueden modificar:

- Link de CrossfyApp.
- Link de Google Maps.
- WhatsApp, Instagram, email y ubicacion.
- Actividades y links de reserva.
- Preguntas frecuentes.
- Mensaje prearmado de WhatsApp.

Cuando este el link definitivo de CrossfyApp, reemplazar `contact.crossfyUrl`.
La ubicacion real de Google Maps ya esta centralizada en `contact.mapsUrl`.
