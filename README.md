# Katena - demo de turnos

Abrir `index.html` en el navegador para ver la demo.

## Conectar con Google Sheets

1. Crear una planilla con dos hojas: `Horarios` y `Reservas`.
2. Copiar el contenido de `horarios.csv` en `Horarios`.
3. Copiar el contenido de `reservas.csv` en `Reservas`.
4. En la planilla ir a `Extensiones > Apps Script`.
5. Pegar completo el contenido de `google-apps-script.js`.
6. Implementar como `Aplicacion web`.
7. Permitir acceso a `Cualquier persona`.
8. Copiar la URL publicada.
9. En `app.js`, reemplazar:

```js
const SHEET_API_URL = "";
```

por:

```js
const SHEET_API_URL = "URL_DE_TU_APPS_SCRIPT";
```

## Manejo de turnos desde Sheets

- Para dar de baja un horario completo, cambiar `Activo` a `FALSE` en la hoja `Horarios`.
- Para cambiar cupos simultaneos, editar `Capacidad`.
- Para cancelar una reserva, cambiar `Estado` de `CONFIRMADO` a `CANCELADO` en `Reservas`.
- La web no muestra cupos restantes. Solo oculta el horario cuando llega a cero.
- Cada reserva envia un email automatico a `katenapostural@gmail.com`. Para cambiarlo, editar `PROFESSIONAL_EMAIL` en `google-apps-script.js`.

Nota: la web usa JSONP para comunicarse con Apps Script desde cualquier hosting estatico. Para un sitio definitivo con datos sensibles conviene reemplazarlo por un backend propio o una funcion serverless con CORS configurado.
