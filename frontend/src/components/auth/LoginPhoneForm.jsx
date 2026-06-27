'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import Alert from '@/components/ui/Alert';
import PhoneNumberInput from '@/components/auth/PhoneNumberInput';
import { validateCelular } from '@/lib/validators';

export default function LoginPhoneForm({ onEnviarCodigo, loading, serverError }) {
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validateCelular(telefono);
    setError(validationError);
    if (validationError) return;
    onEnviarCodigo(telefono);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Bienvenido de nuevo</h2>
        <p className="mt-1 text-sm text-ink-500">
          Ingresa tu WhatsApp y te enviaremos un código para entrar.
        </p>
      </div>

      <FormField label="Número de WhatsApp" htmlFor="telefono-login" error={error}>
        <PhoneNumberInput
          id="telefono-login"
          value={telefono}
          onChange={setTelefono}
          error={Boolean(error)}
        />
      </FormField>

      <Alert type="error">{serverError}</Alert>

      <Button type="submit" loading={loading} className="w-full">
        Enviar código
      </Button>
    </form>
  );
}
