# Pendientes técnicos

## Backend

- Crear `requirements.txt` o `pyproject.toml`.
- Mover `DATABASE_URL` a variables de entorno.
- Crear migraciones con Alembic.
- Crear endpoints faltantes para catálogo y registro de productos.
- Definir esquemas Pydantic para payloads de auth, webhook y productos.
- Corregir `Marca.nombre`, actualmente definido como `Integer`.
- Reemplazar el `business_id` fijo por negocio real.
- Quitar el filtro hardcodeado del número de WhatsApp o moverlo a configuración.
- Implementar autenticación real con JWT o sesión.
- Persistir y expirar OTP en base de datos o Redis.
- Implementar flujo de preguntas con consultas seguras o capa de reportes.
- Manejar errores de OpenAI, JSON inválido y productos no encontrados.
- Agregar pruebas unitarias para clasificación, ingresos y ventas.

## Frontend

- Adaptar login a la respuesta real del backend.
- Consumir endpoints reales de catálogo y productos.
- Validar estado de sesión con backend, no solo `localStorage`.
- Mostrar feedback cuando el backend usa datos demo.
- Completar navegación de módulos futuros.
- Revisar textos con caracteres mal codificados.

## Integración WhatsApp

- Documentar configuración completa de instancia `Kapo_IA`.
- Activar y probar webhooks de Evolution API.
- Habilitar audio si forma parte del alcance final.
- Instalar y documentar `ffmpeg` para transcripción.
- Validar formato de `remoteJid` para números de distintos países.

## Seguridad

- No usar `allow_origins=["*"]` en producción.
- No imprimir OTP en logs productivos.
- No guardar tokens sensibles en el cliente sin expiración.
- No exponer API keys en archivos versionados.
- Sanitizar entradas antes de operaciones de base de datos.

