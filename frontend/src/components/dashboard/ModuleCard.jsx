import Link from 'next/link';

export default function ModuleCard({ href, title, description, icon }) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-xl2 border border-line-100 bg-white p-6 shadow-card
        transition-all duration-150 hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-floating"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>
        <p className="mt-1 text-sm text-ink-500">{description}</p>
      </div>
      <span className="mt-auto text-sm font-semibold text-accent-600 group-hover:text-accent-700">
        Gestionar →
      </span>
    </Link>
  );
}
