import { getToken } from '@/lib/auth';
import { MARCAS_DEMO, PRODUCTOS_DEMO } from '@/lib/mockData';

// URL base del backend FastAPI. Configúrala en .env.local
// (ver .env.local.example en la raíz del proyecto).
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, isFormData = false } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  if (!response.ok) {
    let detail = 'Ocurrió un error inesperado. Intenta nuevamente.';
    try {
      const data = await response.json();
      detail = data.detail || data.message || detail;
    } catch {
      // la respuesta no tenía JSON, se mantiene el mensaje genérico
    }
    throw new ApiError(detail, response.status);
  }

  if (response.status === 204) return null;
  return response.json();
}

// ---------- Autenticación (passwordless por WhatsApp) ----------

// modo: 'login' | 'registro'. En registro, datosNegocio trae el formulario completo.
export function solicitarCodigoOtp({ telefono, modo, datosNegocio }) {
  return request(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp/solicitar`, { //`${process.env.NEXT_PUBLIC_API_URL}/events/search`
    method: 'POST',
    body: { telefono, modo, datos_negocio: datosNegocio },
  });
}

export function verificarCodigoOtp({ telefono, codigo }) {
  return request('/auth/otp/verificar', {
    method: 'POST',
    body: { telefono, codigo },
  });
}

// ---------- Catálogo (marcas y productos precargados por KAPO) ----------

export async function obtenerMarcas() {
  try {
    return await request('/catalogo/marcas');
  } catch (error) {
    console.warn('[KAPO] No se pudo conectar al backend, usando marcas demo.', error.message);
    return MARCAS_DEMO;
  }
}

export async function obtenerProductosPorMarca(marcaId) {
  try {
    return await request(`/catalogo/marcas/${marcaId}/productos`);
  } catch (error) {
    console.warn('[KUENTA] No se pudo conectar al backend, usando productos demo.', error.message);
    return PRODUCTOS_DEMO[marcaId] || [];
  }
}

// ---------- Productos del negocio ----------

// items: [{ marcaId, marcaNombre, productoId, productoNombre, stockInicial }]
export function registrarProductos(items) {
  return request('/negocio/productos/registro-manual', {
    method: 'POST',
    body: { items },
  });
}

export function subirExcelProductos(file) {
  const formData = new FormData();
  formData.append('archivo', file);
  return request('/negocio/productos/cargar-excel', {
    method: 'POST',
    body: formData,
    isFormData: true,
  });
}

export { ApiError, API_URL };
