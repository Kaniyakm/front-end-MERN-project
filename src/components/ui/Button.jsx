import React from 'react';
import { motion } from 'motion/react';

/**
 * Button Component
 * 
 * Enhanced button with animations, loading states, and icon support
 * 
 * @param {ReactNode} children - Button text/content
 * @param {Function} onClick - Click handler
 * @param {string} [variant='primary'] - Button style: primary, secondary, danger, ghost
 * @param {boolean} [disabled=false] - Disabled state
 * @param {string} [className=''] - Additional CSS classes
 * @param {Component} [icon] - Lucide icon component
 * @param {boolean} [loading=false] - Loading state
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  className = '',
  icon: Icon,
  loading = false,
  type = 'button',
  ...props 
}) => {
  // Style variants
  const variants = {
    primary: 'btn-primary',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 font-semibold transition-all',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg transition-all hover:shadow-xl',
    ghost: 'bg-transparent text-white hover:bg-white/10 rounded-xl px-6 py-3 font-semibold transition-all',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {/* Loading Spinner */}
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
          />
        )}
        
        {/* Icon */}
        {Icon && !loading && <Icon className="w-5 h-5" />}
        
        {/* Text */}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
