'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BrandPanel from '@/components/auth/BrandPanel';
import LoginPhoneForm from '@/components/auth/LoginPhoneForm';
import RegisterForm from '@/components/auth/RegisterForm';
import OtpForm from '@/components/auth/OtpForm';
import SegmentedTabs from '@/components/ui/SegmentedTabs';
import { solicitarCodigoOtp, verificarCodigoOtp, ApiError } from '@/lib/api';
import { saveSession } from '@/lib/auth';

const TABS = [
  { value: 'login', label: 'Iniciar sesión' },
  { value: 'registro', label: 'Crear cuenta' },
];

export default function AuthScreen() {
  const router = useRouter();
  const [modo, setModo] = useState('login');
  const [step, setStep] = useState('form'); // 'form' | 'otp'
  const [telefono, setTelefono] = useState('');
  const [datosNegocio, setDatosNegocio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleCambiarModo(nextModo) {
    setModo(nextModo);
    setError(null);
  }

  async function enviarCodigo({ telefonoDestino, datosNegocioForm }) {
    setLoading(true);
    setError(null);
    try {
      await solicitarCodigoOtp({
        telefono: telefonoDestino,
        modo,
        datosNegocio: datosNegocioForm || undefined,
      });
      setTelefono(telefonoDestino);
      setDatosNegocio(datosNegocioForm || null);
      setStep('otp');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos enviar el código. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerificar(codigo) {
    setLoading(true);
    setError(null);
    try {
      const respuesta = true; //await verificarCodigoOtp({ telefono, codigo });
      saveSession({
        token: respuesta?.token,
        negocio: respuesta?.negocio || datosNegocio,
      });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Código incorrecto o vencido. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  function handleReenviar() {
    enviarCodigo({ telefonoDestino: telefono, datosNegocioForm: datosNegocio });
  }

  function handleVolver() {
    setStep('form');
    setError(null);
  }

  return (
    <div className="grid min-h-screen md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="order-2 md:order-1">
        {/* <BrandPanel /> */}
        KUENTA
      </div>

      <div className="order-1 flex items-center justify-center bg-white px-6 py-10 md:order-2 md:px-12">
        <div className="w-full max-w-[420px] animate-floatUp">
          {step === 'form' && (
            <SegmentedTabs
              options={TABS}
              value={modo}
              onChange={handleCambiarModo}
              className="mb-7 w-full"
            />
          )}

          {step === 'form' && modo === 'login' && (
            <LoginPhoneForm
              loading={loading}
              serverError={error}
              onEnviarCodigo={(telefonoDestino) => enviarCodigo({ telefonoDestino })}
            />
          )}

          {step === 'form' && modo === 'registro' && (
            <RegisterForm
              loading={loading}
              serverError={error}
              onCrearCuenta={(form) =>
                enviarCodigo({ telefonoDestino: form.telefono, datosNegocioForm: form })
              }
            />
          )}

          {step === 'otp' && (
            <OtpForm
              telefono={telefono}
              loading={loading}
              serverError={error}
              onVerificar={handleVerificar}
              onReenviar={handleReenviar}
              onVolver={handleVolver}
            />
          )}
        </div>
      </div>
    </div>
  );
}
