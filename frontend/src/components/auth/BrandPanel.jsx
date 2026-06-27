import Image from 'next/image';
import BrandMark from '@/components/brand/BrandMark';

export default function BrandPanel() {
  return (
    <div className="brand-smoke relative flex h-full flex-col justify-between overflow-hidden px-10 py-10 text-white md:px-12">
      {/* Manchas de "humo" extra, decorativas, recreando la textura del fondo de marca */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl animate-drift"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-brand-500/40 blur-3xl animate-drift"
        aria-hidden="true"
      />

      <div className="relative z-10 hidden md:block">
        <Image
          src="/kapo-icon.png"
          alt="KAPO"
          width={220}
          height={94}
          priority
          className="h-auto w-[180px]"
        />
      </div>

      {/* En mobile mostramos una versión compacta (solo el ícono) */}
      <div className="relative z-10 flex items-center gap-3 md:hidden">
        <BrandMark size={44} />
        <span className="font-display text-2xl font-bold tracking-tight">KAPO</span>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="hidden md:flex">
          <BrandMark size={64} />
        </div>
        <div>
          <h1 className="font-display text-[28px] font-bold leading-tight md:text-[32px]">
            Tu negocio, organizado{' '}
            <span className="text-accent-200">de un vistazo.</span>
          </h1>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/70">
            Registra tu inventario, controla tus ventas y mantén tu stock al día,
            todo desde un mismo lugar.
          </p>
        </div>
      </div>

      <p className="relative z-10 text-xs text-white/40">
        © {new Date().getFullYear()} KAPO. Hecho para negocios como el tuyo.
      </p>
    </div>
  );
}
