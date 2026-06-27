'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import TextInput from '@/components/ui/TextInput';
import Alert from '@/components/ui/Alert';
import PhoneNumberInput from '@/components/auth/PhoneNumberInput';
import {
  validateNombreDueno,
  validateNombreNegocio,
  validateRuc,
  validateDireccion,
  validateCelular,
  validateEmail,
} from '@/lib/validators';

const initialForm = {
  nombreDueno: '',
  nombreNegocio: '',
  ruc: '',
  direccion: '',
  telefono: '',
  email: '',
};

export default function RegisterForm({ onCrearCuenta, loading, serverError }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validateAll() {
    const nextErrors = {
      nombreDueno: validateNombreDueno(form.nombreDueno),
      nombreNegocio: validateNombreNegocio(form.nombreNegocio),
      ruc: validateRuc(form.ruc),
      direccion: validateDireccion(form.direccion),
      telefono: validateCelular(form.telefono),
      email: validateEmail(form.email),
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateAll()) return;
    onCrearCuenta(form);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Crea tu cuenta</h2>
        <p className="mt-1 text-sm text-ink-500">
          Cuéntanos sobre tu negocio. Te tomará menos de un minuto.
        </p>
      </div>

      <FormField label="Nombre del dueño" htmlFor="nombreDueno" error={errors.nombreDueno}>
        <TextInput
          id="nombreDueno"
          placeholder="Ej. María Fernández"
          value={form.nombreDueno}
          onChange={(e) => updateField('nombreDueno', e.target.value)}
          error={Boolean(errors.nombreDueno)}
        />
      </FormField>

      <FormField label="Nombre del negocio" htmlFor="nombreNegocio" error={errors.nombreNegocio}>
        <TextInput
          id="nombreNegocio"
          placeholder="Ej. Bodega San José"
          value={form.nombreNegocio}
          onChange={(e) => updateField('nombreNegocio', e.target.value)}
          error={Boolean(errors.nombreNegocio)}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="RUC" htmlFor="ruc" optional error={errors.ruc}>
          <TextInput
            id="ruc"
            inputMode="numeric"
            placeholder="20XXXXXXXXX"
            value={form.ruc}
            onChange={(e) => updateField('ruc', e.target.value.replace(/\D/g, '').slice(0, 11))}
            error={Boolean(errors.ruc)}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" optional error={errors.email}>
          <TextInput
            id="email"
            type="email"
            placeholder="tu@negocio.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={Boolean(errors.email)}
          />
        </FormField>
      </div>

      <FormField label="Dirección del negocio" htmlFor="direccion" error={errors.direccion}>
        <TextInput
          id="direccion"
          placeholder="Av. Siempre Viva 123, Lima"
          value={form.direccion}
          onChange={(e) => updateField('direccion', e.target.value)}
          error={Boolean(errors.direccion)}
        />
      </FormField>

      <FormField label="Número de WhatsApp" htmlFor="telefono-registro" error={errors.telefono}>
        <PhoneNumberInput
          id="telefono-registro"
          value={form.telefono}
          onChange={(value) => updateField('telefono', value)}
          error={Boolean(errors.telefono)}
        />
      </FormField>

      <Alert type="error">{serverError}</Alert>

      <Button type="submit" loading={loading} className="mt-1 w-full">
        Crear cuenta
      </Button>
    </form>
  );
}
