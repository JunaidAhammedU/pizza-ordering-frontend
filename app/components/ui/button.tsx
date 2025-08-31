'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    form?: string;
    id?: string;
    'aria-label'?: string;
}

const buttonVariants = {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white',
    ghost: 'text-orange-600 hover:bg-orange-50',
    destructive: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeVariants = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className,
    disabled,
    children,
    onClick,
    type = 'button',
    form,
    id,
    'aria-label': ariaLabel,
}) => {
    return (
        <motion.button
            whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            className={cn(
                'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                buttonVariants[variant],
                sizeVariants[size],
                className
            )}
            disabled={disabled || isLoading}
            onClick={onClick}
            type={type}
            form={form}
            id={id}
            aria-label={ariaLabel}
        >
            {isLoading ? (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
            ) : null}
            {children}
        </motion.button>
    );
};
