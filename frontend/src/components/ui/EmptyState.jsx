'use client';

export default function EmptyState({ title, description, icon = null }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line-200 px-6 py-10 text-center">
      {icon}
      <p className="font-display text-base font-semibold text-ink-700">{title}</p>
      {description && <p className="max-w-xs text-sm text-ink-300">{description}</p>}
    </div>
  );
}
