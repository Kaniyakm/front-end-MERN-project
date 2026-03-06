/* ============================================================
   PHASE 3-4: INPUT COMPONENT
   ============================================================ */

import React from 'react';

/**
 * Input Component
 * 
 * Glassmorphic input with label, icon, and error support
 * 
 * @param {string} [label] - Input label
 * @param {Component} [icon] - Lucide icon component
 * @param {string} [error] - Error message
 * @param {string} [className=''] - Additional CSS classes
 */
const Input = ({ 
  label, 
  icon: Icon, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-white/90 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
        )}
        
        {/* Input Field */}
        <input
          className={`input-glass ${Icon ? 'pl-12' : ''} ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
