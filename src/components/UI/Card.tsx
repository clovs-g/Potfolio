import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../stores/themeStore';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true, onClick }) => {
  const { isDark } = useThemeStore();

  return (
    <motion.div
      className={`rounded-xl border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
          : 'bg-white/70 border-gray-200 backdrop-blur-sm'
      } ${hover ? 'hover:shadow-xl' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? { y: -5 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;