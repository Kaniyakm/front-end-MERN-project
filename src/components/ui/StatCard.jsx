import React from 'react';
import { motion } from 'motion/react';

/**
 * StatCard Component
 * 
 * Displays key metrics with animated icons and optional trend indicators
 * 
 * @param {Component} icon - Lucide icon component
 * @param {string} label - Description of the stat
 * @param {string|number} value - Main value to display
 * @param {number} [trend] - Optional trend percentage (positive or negative)
 * @param {string} [color='violet'] - Color variant: violet, green, red, blue
 * 
 * @example
 * <StatCard
 *   icon={Wallet}
 *   label="Total Income"
 *   value="$5,000"
 *   trend={5.2}
 *   color="green"
 * />
 */
const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color = 'violet' 
}) => {
  // Color gradient mappings for different stat types
  const colorClasses = {
    violet: 'from-violet-600 to-fuchsia-600',
    green: 'from-green-600 to-cyan-600',
    red: 'from-red-600 to-orange-600',
    blue: 'from-blue-600 to-indigo-600',
  };

  return (
    <motion.div
      // Entrance animation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      
      // Hover animation
      whileHover={{ y: -4, scale: 1.02 }}
      
      className="glass-card"
    >
      {/* Icon Container */}
      <div 
        className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} mb-4 shadow-lg`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Main Value */}
      <div className="text-3xl font-bold text-white mb-1 text-shadow">
        {value}
      </div>

      {/* Label */}
      <div className="text-white/70 text-sm mb-2">
        {label}
      </div>

      {/* Trend Indicator (Optional) */}
      {trend !== undefined && (
        <div 
          className={`text-xs font-semibold ${
            trend >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
