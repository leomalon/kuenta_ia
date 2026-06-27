# KAPO IA

KAPO IA es un prototipo para digitalizar operaciones de inventario y ventas de pequeños negocios usando WhatsApp, inteligencia artificial y un panel web. El proyecto combina un backend en FastAPI, un frontend en Next.js y Evolution API para recibir y responder mensajes de WhatsApp.

## Propuesta

El usuario puede escribir mensajes naturales como:

- "Ingresaron 10 aceites Primor por 90 soles"
- "Vendí 3 leches Gloria"

El backend interpreta el texto con OpenAI, clasifica la intención como ingreso, venta, pregunta o desconocido, registra el movimiento en PostgreSQL y responde por WhatsApp mediante Evolution API.

## Módulos

| Módulo | Tecnología | Descripción |
| --- | --- | --- |
| `backend` | Python, FastAPI, SQLAlchemy | Webhook de WhatsApp, clasificación con IA, registro de ingresos y ventas. |
| `frontend` | Next.js 14, React, Tailwind CSS | Login/registro por OTP simulado, dashboard y carga/registro de productos. |
| `evolution_api` | Docker Compose | Evolution API, PostgreSQL y Redis para la integración con WhatsApp. |
| `docs` | Markdown | Documentación técnica y funcional del proyecto. |

## Estructura

```text
kapo_ia/
├── backend/
│   ├── core/              # Configuración de base de datos
│   ├── llm/               # Cliente OpenAI y prompts
│   ├── models/            # Modelos SQLAlchemy
│   ├── repositories/      # Acceso a datos
│   ├── routes/            # Rutas FastAPI
│   └── services/          # Lógica de negocio
├── evolution_api/
│   └── docker-compose.yml # Evolution API + Postgres + Redis
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/           # Rutas Next.js
│       ├── components/    # Componentes UI
│       └── lib/           # API client, auth, validaciones y mocks
└── docs/
```

## Documentación

- [Instalación local](docs/INSTALACION.md)
- [Arquitectura](docs/ARQUITECTURA.md)
- [Flujos funcionales](docs/FLUJOS.md)
- [API y endpoints](docs/API.md)
- [Variables de entorno](docs/VARIABLES_ENTORNO.md)
- [Modelo de datos](docs/MODELO_DATOS.md)
- [Pendientes técnicos](docs/PENDIENTES.md)

## Estado actual

El prototipo ya contiene el flujo principal de WhatsApp para texto, clasificación con IA y registro de movimientos. La autenticación OTP del frontend está simulada, algunos endpoints consumidos por el frontend todavía no existen en el backend y la transcripción de audio está preparada pero comentada.

