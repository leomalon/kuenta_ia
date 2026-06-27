'use client';

const VARIANTS = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 disabled:bg-accent-200',
  ghostOnDark:
    'bg-white/10 text-white border border-white/25 hover:bg-white/20 disabled:opacity-40',
  secondary:
    'bg-white text-ink-900 border border-line-200 hover:border-accent-400 hover:text-accent-600 disabled:opacity-50',
  text: 'bg-transparent text-accent-600 hover:text-accent-700 px-0',
};

const SIZES = {
  md: 'h-11 px-5 text-[15px]',
  sm: 'h-9 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-body font-semibold
        transition-colors duration-150 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
