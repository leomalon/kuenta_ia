# Flujos funcionales

## 1. Registro de ingreso por WhatsApp

Ejemplo de mensaje:

```text
Ingresaron 10 aceites Primor por 90 soles
```

Flujo:

1. WhatsApp envía el evento a Evolution API.
2. Evolution API llama al webhook del backend.
3. `backend/routes/webhook.py` extrae el mensaje.
4. `analizar_mensaje` envía el texto a OpenAI.
5. OpenAI responde JSON con `accion = INGRESO`.
6. `router_de_acciones` llama a `registrar_ingreso`.
7. Se busca el producto por nombre con coincidencia parcial.
8. Se crea un registro en `lotes_inventario`.
9. Se responde al usuario por WhatsApp.

Respuesta esperada:

```text
Listo, Registrado con éxito en tu almacén!
```

## 2. Registro de venta por WhatsApp

Ejemplo:

```text
Vendí 3 leches Gloria
```

Flujo:

1. El webhook recibe el mensaje.
2. OpenAI clasifica la acción como `VENTA`.
3. Se crea una cabecera en `ventas`.
4. Se crean registros en `ventas_items`.
5. Se responde al usuario por WhatsApp.

Respuesta esperada:

```text
Listo, Registrado con éxito en ventas!
```

## 3. Preguntas

Si el usuario hace una pregunta, el prompt clasifica la acción como `PREGUNTA`.

Estado actual:

- El endpoint devuelve `status: ok` y `type: question`.
- La generación de consultas SQL o respuesta natural todavía no está implementada.

## 4. Audio de WhatsApp

Estado actual:

- Hay funciones para descargar audio desde Evolution API.
- Hay función para guardar base64 como archivo.
- Hay función para convertir audio OGG a MP3 con `ffmpeg`.
- Hay función `transcribir` en el cliente OpenAI.
- El bloque completo está comentado dentro de `webhook.py`.

Para habilitarlo, se debe descomentar el flujo, asegurar `ffmpeg` instalado y manejar rutas temporales compatibles con Windows/Linux.

## 5. Login y registro web

Flujo frontend:

1. Usuario elige iniciar sesión o crear cuenta.
2. Ingresa número de WhatsApp.
3. Frontend llama a `POST /auth/otp/solicitar`.
4. Backend imprime/genera un OTP fijo.
5. Usuario ingresa el código.
6. Frontend llama a `POST /auth/otp/verificar`.
7. Si el código es correcto, guarda sesión en `localStorage`.
8. Redirige a `/dashboard`.

Estado actual:

- El OTP válido es fijo: `893428`.
- No existe persistencia real de OTP.
- No se emite token real desde el backend actual, aunque el frontend espera `token` y `negocio`.

## 6. Registro de productos en frontend

El módulo de productos permite:

- Subir archivo `.xlsx`, `.xls` o `.csv`.
- Descargar una plantilla CSV.
- Seleccionar marca y productos de un catálogo.
- Asignar stock inicial.
- Confirmar lista temporal.

Estado actual:

- El frontend consume endpoints de catálogo y registro.
- Si el catálogo no responde, usa datos demo en `frontend/src/lib/mockData.js`.
- Los endpoints de catálogo y registro de productos todavía no están implementados en el backend actual.

