import ModuleCard from '@/components/dashboard/ModuleCard';

function IconCaja() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.2 12 4l8.5 4.2v8.1L12 20.5l-8.5-4.2V8.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3.5 8.2 12 12l8.5-3.8M12 12v8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Hola 👋</h1>
        <p className="mt-1 text-sm text-ink-500">
          Este es tu panel. Por ahora puedes registrar los productos de tu negocio.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ModuleCard
          href="/dashboard/productos"
          title="Productos"
          description="Sube tu lista en Excel o registra tus productos por marca."
          icon={<IconCaja />}
        />
      </div>
    </div>
  );
}
