'use client';

export default function FormField({
  label,
  htmlFor,
  optional = false,
  error,
  hint,
  children,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm font-medium text-ink-700">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-ink-300">Opcional</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-300">{hint}</p>
      ) : null}
    </div>
  );
}
