# Variables de entorno

Esta documentación lista las variables que el código usa actualmente. No incluye valores secretos.

## Raíz del proyecto `.env`

| Variable | Uso | Archivo |
| --- | --- | --- |
| `OPENAI_API_KEY` | API key para llamar a OpenAI. | `backend/services/ai_interprete.py`, `backend/routes/webhook.py` |
| `API_KEY_EVOLUTION` | API key para Evolution API. | `backend/services/enviar_respuesta.py`, `backend/routes/webhook.py` |
| `ENVIRON` | Define si se usa URL local o productiva de Evolution API. Valor esperado para local: `DEV`. | `backend/services/enviar_respuesta.py` |
| `EVOLUTION_LOCAL_API` | URL local de Evolution API. Ejemplo: `http://localhost:8080`. | `backend/services/enviar_respuesta.py` |
| `EVOLUTION_PROD_API` | URL productiva de Evolution API. | `backend/services/enviar_respuesta.py` |
| `DB_PASSWORD` | Leída en `database.py`, aunque actualmente no se usa para construir `DATABASE_URL`. | `backend/core/database.py` |

## Frontend `frontend/.env.local`

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL base del backend FastAPI. Ejemplo: `http://localhost:8000`. |

## Evolution API `evolution_api/.env_evolution`

Este archivo es consumido por el contenedor `evolution-api` desde `docker-compose.yml`. Debe incluir la configuración requerida por Evolution API para instancia, autenticación, base de datos, Redis y proveedor de eventos/webhook.

## Observaciones

- `backend/core/database.py` tiene la URL de PostgreSQL hardcodeada:

```text
postgresql://kato_user:admin@localhost:5432/kato_db
```

- Recomendación: mover `DATABASE_URL` al `.env`.
- No documentar ni commitear valores reales de tokens, passwords o API keys.

