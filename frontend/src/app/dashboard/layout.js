'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { isAuthenticated, getNegocio } from '@/lib/auth';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);
  const [negocio, setNegocio] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/');
      return;
    }
    setNegocio(getNegocio());
    setVerificando(false);
  }, [router]);

  if (verificando) {
    return <div className="min-h-screen bg-surface-app" />;
  }

  return (
    <div className="min-h-screen bg-surface-app">
      <DashboardHeader negocio={negocio} />
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
