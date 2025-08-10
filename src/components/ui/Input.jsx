// src/components/ui/input.jsx
import React from 'react';
export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition ${className}`}
      {...props}
    />
  );
}
