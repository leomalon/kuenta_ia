// Manejo de sesión muy simple en el cliente.
// El backend (FastAPI) es quien emite el token tras verificar el código OTP;
// aquí solo lo guardamos para mantener la sesión iniciada en el navegador.

const TOKEN_KEY = 'kapo_token';
const NEGOCIO_KEY = 'kapo_negocio';

export function saveSession({ token, negocio }) {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  if (negocio) window.localStorage.setItem(NEGOCIO_KEY, JSON.stringify(negocio));
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getNegocio() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(NEGOCIO_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(NEGOCIO_KEY);
}
