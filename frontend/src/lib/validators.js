// Validaciones simples y explícitas, sin librerías externas.
// Cada función devuelve un string con el mensaje de error, o null si es válido.

export function validateRequired(value, fieldLabel) {
  if (!value || !String(value).trim()) {
    return `${fieldLabel} es obligatorio.`;
  }
  return null;
}

export function validateNombreNegocio(value) {
  const required = validateRequired(value, 'El nombre del negocio');
  if (required) return required;
  if (value.trim().length < 2) {
    return 'El nombre del negocio es muy corto.';
  }
  return null;
}

export function validateNombreDueno(value) {
  return validateRequired(value, 'El nombre del dueño');
}

export function validateDireccion(value) {
  return validateRequired(value, 'La dirección del negocio');
}

// El RUC en Perú son 11 dígitos. Es opcional: solo se valida el formato si se llenó.
export function validateRuc(value) {
  if (!value) return null;
  const onlyDigits = /^\d{11}$/;
  if (!onlyDigits.test(value.trim())) {
    return 'El RUC debe tener 11 dígitos.';
  }
  return null;
}

// El email es opcional, pero si se llena debe tener formato válido.
export function validateEmail(value) {
  if (!value) return null;
  const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmail.test(value.trim())) {
    return 'Ingresa un email válido.';
  }
  return null;
}

// Celular peruano: 9 dígitos, empieza en 9. El input ya separa el +51.
export function validateCelular(value) {
  const required = validateRequired(value, 'El número de WhatsApp');
  if (required) return required;
  const onlyDigits = /^9\d{8}$/;
  if (!onlyDigits.test(value.trim())) {
    return 'Ingresa un número de WhatsApp válido (9 dígitos).';
  }
  return null;
}

export function validateOtp(value, length = 6) {
  if (!value || value.length !== length) {
    return `Ingresa el código de ${length} dígitos.`;
  }
  if (!/^\d+$/.test(value)) {
    return 'El código solo debe tener números.';
  }
  return null;
}
