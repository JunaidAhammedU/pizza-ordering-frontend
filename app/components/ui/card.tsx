'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
    clickable?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    className,
    hoverable = false,
    clickable = false,
    onClick,
}) => {
    const MotionComponent = clickable ? motion.button : motion.div;

    return (
        <MotionComponent
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hoverable || clickable ? { y: -2, scale: 1.02 } : undefined}
            whileTap={clickable ? { scale: 0.98 } : undefined}
            className={cn(
                'bg-white rounded-xl border border-gray-200 shadow-sm',
                hoverable && 'hover:shadow-md transition-shadow',
                clickable && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
                className
            )}
            onClick={onClick}
        >
            {children}
        </MotionComponent>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => (
    <div className={cn('px-6 pt-6 pb-4', className)}>
        {children}
    </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => (
    <h3 className={cn('text-xl font-semibold text-gray-900', className)}>
        {children}
    </h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => (
    <div className={cn('px-6 pb-6', className)}>
        {children}
    </div>
);
