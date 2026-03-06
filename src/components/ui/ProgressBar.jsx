import React from 'react';
import { motion } from 'motion/react';

/**
 * ProgressBar Component
 * 
 * Animated progress bar with shimmer effect and warnings
 * 
 * @param {string} label - Progress bar label
 * @param {number} percentage - Progress percentage (0-100)
 * @param {string} [color='violet'] - Color variant: violet, red, green, blue
 * @param {boolean} [showPercent=true] - Show percentage value
 */
const ProgressBar = ({ 
  label, 
  percentage, 
  color = 'violet', 
  showPercent = true 
}) => {
  // Color gradient mappings
  const colorClasses = {
    violet: 'from-violet-600 to-fuchsia-600',
    red: 'from-red-600 to-orange-600',
    green: 'from-green-600 to-cyan-600',
    blue: 'from-blue-600 to-indigo-600',
  };

  const bgGradient = colorClasses[color] || colorClasses.violet;

  return (
    <div className="glass-card">
      {/* Label and Percentage */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-medium text-sm sm:text-base">
          {label}
        </span>
        {showPercent && (
          <span className="text-white/80 text-sm font-semibold">
            {Math.round(percentage)}%
          </span>
        )}
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Animated Progress Fill */}
        <motion.div
          className={`h-full bg-gradient-to-r ${bgGradient} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ backgroundSize: '200% 100%' }}
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>

      {/* Warning for High Usage */}
      {percentage > 90 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-300 text-xs mt-2 flex items-center gap-1"
        >
          <span>⚠️</span>
          Approaching budget limit
        </motion.p>
      )}
      
      {/* Success message for good usage */}
      {percentage <= 50 && percentage > 0 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-300 text-xs mt-2 flex items-center gap-1"
        >
          <span>✅</span>
          On track
        </motion.p>
      )}
    </div>
  );
};

export default ProgressBar;
