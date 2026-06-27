'use client';

import { forwardRef } from 'react';

const PhoneNumberInput = forwardRef(function PhoneNumberInput(
  { value, onChange, error = false, id, ...props },
  ref
) {
  function handleChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 9);
    onChange(digitsOnly);
  }

  return (
    <div
      className={`flex h-11 w-full items-stretch overflow-hidden rounded-xl border bg-white transition-colors duration-150
        focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-100
        ${error ? 'border-danger' : 'border-line-200'}`}
    >
      <span className="flex items-center border-r border-line-200 bg-surface-app px-3 font-tabular text-sm text-ink-500">
        +51
      </span>
      <input
        ref={ref}
        id={id}
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="9XX XXX XXX"
        value={value}
        onChange={handleChange}
        className="w-full bg-transparent px-3.5 font-tabular text-[15px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
        {...props}
      />
    </div>
  );
});

export default PhoneNumberInput;
