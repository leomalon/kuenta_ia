'use client';

import { forwardRef } from 'react';

const TextInput = forwardRef(function TextInput(
  { error = false, className = '', ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`h-11 w-full rounded-xl border bg-white px-3.5 text-[15px] text-ink-900
        placeholder:text-ink-300 transition-colors duration-150
        focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100
        disabled:bg-surface-app disabled:text-ink-300
        ${error ? 'border-danger' : 'border-line-200'} ${className}`}
      {...props}
    />
  );
});

export default TextInput;
