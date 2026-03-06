/*****************************************************************************************
 FILE: Card.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Reusable card wrapper component for consistent UI styling.

 WHY THIS EXISTS:
 - Prevent repeated Tailwind classes
 - Maintain design consistency
 - Easy theme styling changes globally

 ARCHITECTURE ROLE:
 Presentational wrapper
 Used by Dashboard, ProjectCard, ProjectDetails

*****************************************************************************************/

import React from 'react';
import { motion } from 'motion/react';

/**
 * Card Component
 * 
 * Glassmorphic card with optional hover animation
 * 
 * @param {ReactNode} children - Card content
 * @param {string} [className=''] - Additional CSS classes
 * @param {boolean} [hover=true] - Enable hover animation
 */
const Card = ({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4 } : {}}
      className={`glass-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
