# API

Base local recomendada:

```text
http://localhost:8000
```

## Backend implementado

### POST `/webhook`

Recibe eventos de Evolution API.

Entrada esperada, simplificada:

```json
{
  "data": {
    "messageTimestamp": 1710000000,
    "message": {
      "conversation": "Vendí 3 leches Gloria"
    },
    "key": {
      "remoteJid": "51999999999@s.whatsapp.net"
    }
  }
}
```

Comportamiento:

- Ignora mensajes con más de 2 minutos de antigüedad.
- Extrae `conversation`.
- Recorta el número a los primeros 11 caracteres.
- Actualmente solo procesa el número `51940241398`.
- Clasifica el mensaje con OpenAI.
- Registra ingreso o venta.
- Envía respuesta por Evolution API si el resultado fue exitoso.

Respuestas posibles:

```json
{ "status": "ok" }
```

```json
{ "status": "ignored" }
```

```json
{ "error": "no message found" }
```

### POST `/auth/otp/solicitar`

Solicita un código OTP.

Entrada esperada por el frontend:

```json
{
  "telefono": "999999999",
  "modo": "login",
  "datos_negocio": null
}
```

Respuesta actual:

```json
{
  "success": true,
  "message": "Código OTP enviado",
  "telefono": "999999999"
}
```

Nota técnica: la ruta actualmente no define un modelo Pydantic para el payload. Conviene crear esquemas explícitos para que FastAPI reciba y valide el body correctamente.

### POST `/auth/otp/verificar`

Verifica un OTP.

Entrada esperada:

```json
{
  "telefono": "999999999",
  "codigo": "893428"
}
```

Respuesta actual:

```json
{
  "success": true,
  "message": "Código verificado correctamente",
  "telefono": "999999999"
}
```

OTP válido actual:

```text
893428
```

## Endpoints esperados por el frontend, pendientes en backend

El archivo `frontend/src/lib/api.js` consume estos endpoints:

| Método | Ruta | Estado |
| --- | --- | --- |
| `GET` | `/catalogo/marcas` | Pendiente |
| `GET` | `/catalogo/marcas/{marcaId}/productos` | Pendiente |
| `POST` | `/negocio/productos/registro-manual` | Pendiente |
| `POST` | `/negocio/productos/cargar-excel` | Pendiente |

Mientras los endpoints de catálogo no existan, el frontend usa datos demo.

## Evolution API usada por backend

### Enviar texto por WhatsApp

```text
POST {EVOLUTION_API_URL}/message/sendText/Kapo_IA
```

Headers:

```json
{
  "apikey": "API_KEY_EVOLUTION",
  "Content-Type": "application/json"
}
```

Body:

```json
{
  "number": "51999999999",
  "text": "Mensaje de respuesta"
}
```

### Descargar audio desde mensaje multimedia

Existe función preparada para:

```text
POST {api_url}/chat/getBase64FromMediaMessage/Kapo_IA
```

El flujo está comentado en el webhook.

