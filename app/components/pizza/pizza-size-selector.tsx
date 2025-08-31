'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PizzaSize } from '../../types/pizza';
import { formatPrice } from '../../utils/format';
import { Card } from '../ui/card';
import { cn } from '../../utils/cn';
import { useQuery } from '@tanstack/react-query';
import { getSizes } from '@/app/controllers/api.controllers';

interface PizzaSizeSelectorProps {
    selectedSize: PizzaSize | null;
    onSizeSelect: (size: PizzaSize) => void;
    error?: string;
}

const sizeIcons = {
    'Small': '🍕',
    'Medium': '🍕🍕',
    'Large': '🍕🍕🍕',
    'Extra Large': '🍕🍕🍕🍕',
};

const sizeDescriptions = {
    'Small': 'Perfect for 1-2 people',
    'Medium': 'Great for 2-3 people',
    'Large': 'Ideal for 3-4 people',
    'Extra Large': 'Ideal for 4-5 people',
};

export const PizzaSizeSelector: React.FC<PizzaSizeSelectorProps> = ({
    selectedSize,
    onSizeSelect,
    error,
}) => {

    const { data: sizes } = useQuery({
        queryKey: ['sizes'],
        queryFn: getSizes,
    });

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Choose Your Size
                </h3>
                <p className="text-gray-600 text-sm">
                    Pick the perfect size for your appetite
                </p>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-600 text-sm mt-2 font-medium"
                    >
                        {error}
                    </motion.p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sizes?.data?.map((size: any, index: any) => {
                    const isSelected = selectedSize === size?.name;
                    const price = parseFloat(size?.price);

                    return (
                        <motion.div
                            key={size?.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                clickable
                                onClick={() => onSizeSelect(size?.name)}
                                className={cn(
                                    'transition-all duration-200 h-full w-full p-6',
                                    isSelected
                                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                                        : 'hover:border-orange-300'
                                )}
                            >
                                <div className="text-center space-y-4">
                                    <div className="text-4xl mb-2">
                                        {sizeIcons[size?.name as keyof typeof sizeIcons] || '🍕'}
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1 text-lg">
                                            {size?.name} - {size?.inches ? `${size.inches}"` : ''}
                                        </h4>
                                        <p className="text-gray-500 text-xs">
                                            {sizeDescriptions[size?.name as keyof typeof sizeDescriptions] || 'Perfect size for your appetite'}
                                        </p>
                                    </div>

                                    <p className="text-orange-600 font-bold text-xl">
                                        {formatPrice(price)}
                                    </p>

                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto"
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
