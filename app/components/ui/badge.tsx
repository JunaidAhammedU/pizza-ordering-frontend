'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
}

const badgeVariants = {
    default: 'bg-orange-100 text-orange-800 border-orange-200',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
    destructive: 'bg-red-100 text-red-800 border-red-200',
    outline: 'text-gray-700 border-gray-300',
};

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    className,
}) => {
    return (
        <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                badgeVariants[variant],
                className
            )}
        >
            {children}
        </motion.span>
    );
};
