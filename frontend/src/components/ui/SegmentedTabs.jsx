'use client';

export default function SegmentedTabs({ options, value, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={`inline-flex rounded-xl bg-surface-app p-1 ${className}`}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150
              ${isActive ? 'bg-white text-accent-600 shadow-card' : 'text-ink-500 hover:text-ink-900'}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
