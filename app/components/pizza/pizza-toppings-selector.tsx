'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PizzaTopping } from '../../types/pizza';
import { formatPrice } from '../../utils/format';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '../../utils/cn';
import { useQuery } from '@tanstack/react-query';
import { getToppings } from '@/app/controllers/api.controllers';

interface PizzaToppingsSelectorProps {
    selectedToppings: PizzaTopping[];
    onToppingsChange: (toppings: PizzaTopping[]) => void;
    error?: string;
}

const toppingIcons: Record<string, string> = {
    'Onions': '🧅',
    'Olives': '🫒',
    'Ham': '🥩',
    'Bell Peppers': '🫑',
    'Extra Cheese': '🧀',
    'Mushrooms': '🍄',
    'Bacon': '🥓',
    'Pepperoni': '🍕',
    'Sausage': '🌭',
    'Pineapple': '🍍',
};

export const PizzaToppingsSelector: React.FC<PizzaToppingsSelectorProps> = ({
    selectedToppings,
    onToppingsChange,
    error,
}) => {
    const { data: toppingsData } = useQuery({
        queryKey: ['toppings'],
        queryFn: getToppings,
    });

    const handleToppingToggle = (topping: PizzaTopping) => {
        if (selectedToppings.includes(topping)) {
            onToppingsChange(selectedToppings.filter((data) => data !== topping))
        } else {
            onToppingsChange([...selectedToppings, topping])
        }
    };

    const minimumToppings = selectedToppings.length >= 3;

    const totalToppingsPrice = React.useMemo(() => {
        if (!toppingsData?.data) return 0;
        let total = 0;
        selectedToppings.forEach((toppingName) => {
            const topping = toppingsData.data.find((t: any) => t.name === toppingName);
            if (topping) {
                total += parseFloat(topping.price);
            }
        });
        return total;
    }, [selectedToppings, toppingsData]);

    return (
        <div className="space-y-4">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Choose Your Toppings
                    </h3>
                    <Badge
                        variant={minimumToppings ? 'default' : 'outline'}
                        className="transition-colors"
                    >
                        {selectedToppings.length}/3+ required
                    </Badge>
                </div>
                <p className="text-gray-600 text-sm">
                    Select at least 3 toppings to complete your pizza
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {toppingsData?.data?.map((topping: any, index: number) => {
                    const isSelected = selectedToppings.includes(topping.name);
                    const price = parseFloat(topping.price);

                    return (
                        <motion.div
                            key={topping.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card
                                clickable
                                onClick={() => handleToppingToggle(topping.name)}
                                className={cn(
                                    'transition-all duration-200 h-full w-full relative overflow-hidden p-4',
                                    isSelected
                                        ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                                        : 'hover:border-orange-300'
                                )}
                            >
                                <div className="text-center space-y-2">
                                    <div className="text-2xl mb-1">
                                        {toppingIcons[topping.name] || '🍕'}
                                    </div>

                                    <h4 className="font-medium text-gray-900 text-sm leading-tight">
                                        {topping.name}
                                    </h4>

                                    <p className="text-orange-600 font-semibold text-xs">
                                        +{formatPrice(price)}
                                    </p>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="absolute top-2 right-2 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs"
                                            >
                                                ✓
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <div>
                {selectedToppings.length > 0 && (
                    <div
                        className="bg-orange-50 rounded-lg p-4 border border-orange-200" >
                        <h4 className="font-medium text-gray-900 mb-2">Selected Toppings:</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedToppings.map((topping) => (
                                <motion.div
                                    key={topping}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    layout
                                >
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => handleToppingToggle(topping)}
                                    >
                                        <Badge>
                                            {toppingIcons[topping] || '🍕'} {topping} ×
                                        </Badge>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-orange-600 font-semibold mt-2">
                            Toppings Total: {formatPrice(totalToppingsPrice)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
