import React, { ReactNode, MouseEvent } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'bright' | 'dim';
  size?: 'small' | 'medium' | 'large' | 'fullWidth';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  className = '',
}) => {
  const baseStyles = 'py-2 px-4 rounded focus:outline-none transition';
  const variants: Record<string, string> = {
    primary: 'bg-[#1F3E52] text-white hover:bg-opacity-90',
    secondary: 'bg-[#50B04C] text-white hover:bg-opacity-90',
    bright: 'bg-orange-500 text-white hover:bg-opacity-90',
    dim: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };
  const sizes: Record<string, string> = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    fullWidth: 'w-full',
  };

  const combinedClassNames = classNames(
    baseStyles,
    variants[variant],
    sizes[size],
    { 'disabled:bg-gray-300': disabled },
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassNames}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
