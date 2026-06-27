# Instalación local

Esta guía describe cómo levantar el prototipo en entorno local.

## Requisitos

- Python 3.10 o superior
- Node.js 18 o superior
- npm o pnpm
- Docker Desktop
- PostgreSQL disponible en `localhost:5432`
- Cuenta/API key de OpenAI
- Evolution API configurado para WhatsApp

## 1. Variables de entorno

Crear o revisar el archivo `.env` en la raíz del proyecto:

```env
OPENAI_API_KEY=...
API_KEY_EVOLUTION=...
ENVIRON=DEV
EVOLUTION_LOCAL_API=http://localhost:8080
EVOLUTION_PROD_API=...
DB_PASSWORD=...
```

Crear `frontend/.env.local` usando como referencia `frontend/.env.local.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

No subir archivos `.env` reales al repositorio.

## 2. Evolution API

Desde la carpeta `evolution_api`:

```bash
docker compose up -d
```

Servicios configurados:

- Evolution API: `http://localhost:8080`
- PostgreSQL de Evolution: puerto `5432`
- Redis: puerto `6379`

Importante: el backend también intenta conectarse a PostgreSQL en `localhost:5432` usando la URL hardcodeada `postgresql://kato_user:admin@localhost:5432/kato_db`. Si se usa el PostgreSQL del compose actual, se debe alinear usuario, password y base de datos o cambiar la URL en `backend/core/database.py`.

## 3. Backend

Desde la raíz del proyecto:

```bash
python -m venv .venv
```

En Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Instalar dependencias necesarias:

```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv requests openai
```

Ejecutar el backend:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Documentación Swagger:

```text
http://localhost:8000/docs
```

## 4. Frontend

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## 5. Prueba rápida

1. Abrir el frontend.
2. Ingresar celular y solicitar OTP.
3. Usar el código simulado `893428`.
4. Entrar al dashboard.
5. Probar registro de productos por Excel o manual.
6. Para probar WhatsApp, configurar Evolution API para enviar eventos al endpoint `POST /webhook`.

