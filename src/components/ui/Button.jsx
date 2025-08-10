// src/components/ui/button.jsx
import React from 'react';
export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-xl w-full transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
