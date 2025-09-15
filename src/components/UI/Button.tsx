import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../stores/themeStore';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button'
}) => {
  const { isDark } = useThemeStore();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: isDark 
      ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400' 
      : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: isDark 
      ? 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-400' 
      : 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
    outline: isDark 
      ? 'border border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500' 
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: isDark 
      ? 'text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-gray-500' 
      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500'
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" />
          <span className="ml-2">{children}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;