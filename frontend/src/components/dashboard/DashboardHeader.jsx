'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BrandMark from '@/components/brand/BrandMark';
import Button from '@/components/ui/Button';
import { clearSession } from '@/lib/auth';

export default function DashboardHeader({ negocio }) {
  const router = useRouter();

  function handleLogout() {
    clearSession();
    router.push('/');
  }

  return (
    <header className="brand-smoke sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <BrandMark size={36} animated={false} />
          <div className="leading-tight">
            <p className="font-display text-lg font-bold text-white">KAPO</p>
            <p className="text-xs text-white/60">{negocio?.nombreNegocio || 'Mi negocio'}</p>
          </div>
        </Link>

        <Button variant="ghostOnDark" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}
