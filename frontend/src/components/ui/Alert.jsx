'use client';

const STYLES = {
  error: 'bg-red-50 text-danger border-red-100',
  success: 'bg-emerald-50 text-success border-emerald-100',
  info: 'bg-accent-100 text-accent-700 border-accent-200',
};

export default function Alert({ type = 'info', children, className = '' }) {
  if (!children) return null;
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`rounded-xl border px-3.5 py-2.5 text-sm font-medium ${STYLES[type]} ${className}`}
    >
      {children}
    </div>
  );
}
