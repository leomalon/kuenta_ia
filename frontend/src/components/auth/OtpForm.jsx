'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { validateOtp } from '@/lib/validators';

const CODE_LENGTH = 6;
const RESEND_SECONDS = 45;

export default function OtpForm({ telefono, onVerificar, onReenviar, onVolver, loading, serverError }) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [error, setError] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function focusInput(index) {
    inputsRef.current[index]?.focus();
  }

  function handleDigitChange(index, rawValue) {
    const value = rawValue.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < CODE_LENGTH - 1) focusInput(index + 1);
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  }

  function handlePaste(event) {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;
    event.preventDefault();
    setDigits((prev) => {
      const next = [...prev];
      pasted.split('').forEach((char, i) => {
        next[i] = char;
      });
      return next;
    });
    focusInput(Math.min(pasted.length, CODE_LENGTH - 1));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const code = digits.join('');
    const validationError = validateOtp(code, CODE_LENGTH);
    setError(validationError);
    if (validationError) return;
    onVerificar(code);
  }

  function handleReenviar() {
    if (secondsLeft > 0) return;
    setDigits(Array(CODE_LENGTH).fill(''));
    setSecondsLeft(RESEND_SECONDS);
    onReenviar();
    focusInput(0);
  }

  const telefonoFormateado = telefono ? `+51 ${telefono}` : '';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-900">Verifica tu WhatsApp</h2>
        <p className="mt-1 text-sm text-ink-500">
          Enviamos un código de {CODE_LENGTH} dígitos a{' '}
          <span className="font-tabular font-medium text-ink-900">{telefonoFormateado}</span>.
        </p>
      </div>

      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Dígito ${index + 1} del código`}
            className={`h-12 w-11 rounded-xl border text-center font-tabular text-lg font-semibold text-ink-900
              focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100
              ${error ? 'border-danger' : 'border-line-200'}`}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}
      <Alert type="error">{serverError}</Alert>

      <Button type="submit" loading={loading} className="w-full">
        Verificar e ingresar
      </Button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onVolver}
          className="font-medium text-ink-500 hover:text-ink-900"
        >
          ← Volver
        </button>
        <button
          type="button"
          onClick={handleReenviar}
          disabled={secondsLeft > 0}
          className="font-medium text-accent-600 hover:text-accent-700 disabled:cursor-not-allowed disabled:text-ink-300"
        >
          {secondsLeft > 0 ? `Reenviar código (0:${String(secondsLeft).padStart(2, '0')})` : 'Reenviar código'}
        </button>
      </div>
    </form>
  );
}
