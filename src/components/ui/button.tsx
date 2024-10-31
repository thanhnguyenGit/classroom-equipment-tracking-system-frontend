import React from 'react';

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantStyles = {
  default: 'bg-gray-900 text-white hover:bg-gray-800',
  outline: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-100',
  secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  ghost: 'hover:bg-gray-100 text-gray-800'
};

const sizeStyles = {
  default: 'h-10 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10'
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center 
        rounded-md 
        text-sm 
        font-medium 
        transition-colors 
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-400 
        focus:ring-offset-2
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
