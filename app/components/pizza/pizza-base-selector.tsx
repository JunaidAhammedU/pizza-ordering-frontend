'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PizzaBase } from '../../types/pizza';
import { formatPrice } from '../../utils/format';
import { Card } from '../ui/card';
import { cn } from '../../utils/cn';
import { useQuery } from '@tanstack/react-query';
import { getBases } from '@/app/controllers/api.controllers';

interface PizzaBaseSelectorProps {
    selectedBase: PizzaBase | null;
    onBaseSelect: (base: PizzaBase) => void;
    error?: string;
}

export const PizzaBaseSelector: React.FC<PizzaBaseSelectorProps> = ({
    selectedBase,
    onBaseSelect,
    error,
}) => {

    const { data: bases } = useQuery({
        queryKey: ['bases'],
        queryFn: getBases,
    });

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Choose Your Pizza Base
                </h3>
                <p className="text-gray-600 text-sm">
                    Select the perfect crust for your pizza
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {bases?.data?.map((base: any, index: any) => {
                    const isSelected = selectedBase === base?.name
                    const price = parseFloat(base?.price);

                    return (
                        <motion.div key={base?.name}>
                            <Card
                                clickable
                                onClick={() => onBaseSelect(base?.name)}
                                className={cn(
                                    'transition-all duration-200 h-full w-full p-4',
                                    isSelected
                                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                                        : 'hover:border-orange-300'
                                )}
                            >
                                <div className="text-center space-y-3">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-100 border border-gray-300 shadow-lg rounded-full flex items-center justify-center">
                                        <span className="text-3xl">🍕</span>
                                    </div>

                                    <h4 className="font-medium text-gray-900 text-xs leading-tight">
                                        {base?.name}
                                    </h4>

                                    <p className="text-orange-600 font-semibold text-sm">
                                        {price > 0 ? `+${formatPrice(price)}` : 'Included'}
                                    </p>

                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto text-xs"
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
