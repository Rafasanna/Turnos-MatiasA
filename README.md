# Katena - Next.js

Web de turnos para Katena hecha con Next.js y React.

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

La app está configurada con `output: "export"` para poder publicarla como sitio estático.

## Conectar la web con Google Sheets

Crear un archivo `.env.local` con:

```bash
NEXT_PUBLIC_SHEET_API_URL="URL_DE_TU_APPS_SCRIPT"
```

## Conectar con Google Sheets

1. Crear una planilla con dos hojas: `Horarios` y `Reservas`.
2. Copiar el contenido de `horarios.csv` en `Horarios`.
3. Copiar el contenido de `reservas.csv` en `Reservas`.
4. En la planilla ir a `Extensiones > Apps Script`.
5. Pegar completo el contenido de `google-apps-script.js`.
6. Implementar como `Aplicacion web`.
7. Permitir acceso a `Cualquier persona`.
8. Copiar la URL publicada y usarla como `NEXT_PUBLIC_SHEET_API_URL`.

## Manejo de turnos desde Sheets

- Para dar de baja un horario completo, cambiar `Activo` a `FALSE` en la hoja `Horarios`.
- Para cambiar cupos simultaneos, editar `Capacidad`.
- Para cancelar una reserva, cambiar `Estado` de `CONFIRMADO` a `CANCELADO` en `Reservas`.
- La web no muestra cupos restantes. Solo oculta el horario cuando llega a cero.
- Cada reserva envia un email automatico a `katenapostural@gmail.com`. Para cambiarlo, editar `PROFESSIONAL_EMAIL` en `google-apps-script.js`.

Nota: la web usa JSONP para comunicarse con Apps Script desde cualquier hosting estatico. Para un sitio definitivo con datos sensibles conviene reemplazarlo por un backend propio o una funcion serverless con CORS configurado.
