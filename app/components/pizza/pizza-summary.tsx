'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PizzaConfiguration } from '../../types/pizza';
import { formatPrice } from '../../utils/format';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { getBases, getSizes, getToppings } from '@/app/controllers/api.controllers';
import { useQuery } from '@tanstack/react-query';

interface PizzaSummaryProps {
    pizza: Partial<PizzaConfiguration>;
    totalPrice: number;
}

export const PizzaSummary: React.FC<PizzaSummaryProps> = ({
    pizza,
    totalPrice,
}) => {
    const { base, size, toppings = [] } = pizza;

    const { data: baseData } = useQuery({
        queryKey: ['base'],
        queryFn: getBases,
    });

    const { data: sizesData } = useQuery({
        queryKey: ['sizes'],
        queryFn: getSizes,
    });

    const { data: toppingsData } = useQuery({
        queryKey: ['toppings'],
        queryFn: getToppings,
    });

    const basePrice = useMemo(() => {
        if (!base || !baseData?.data) return 0;
        const selectedBase = baseData.data.find((b: any) => b.name === base);
        return selectedBase ? parseFloat(selectedBase.price) : 0;
    }, [base, baseData]);

    const sizePrice = useMemo(() => {
        if (!size || !sizesData?.data) return 0;
        const selectedSize = sizesData.data.find((s: any) => s.name === size);
        return selectedSize ? parseFloat(selectedSize.price) : 0;
    }, [size, sizesData]);

    const toppingsPrice = useMemo(() => {
        if (!toppings.length || !toppingsData?.data) return 0;
        let total = 0;
        toppings.forEach((toppingName) => {
            const topping = toppingsData.data.find((t: any) => t.name === toppingName);
            if (topping) {
                total += parseFloat(topping.price);
            }
        });
        return total;
    }, [toppings, toppingsData]);


    if (!base && !size && toppings.length === 0) {
        return (
            <Card className="bg-gray-50">
                <CardContent className="p-6">
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-4">🍕</div>
                        <p className="text-sm">Start building your pizza to see the summary</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <span>🍕</span>
                        Your Pizza Summary
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                    {/* Base */}
                    {base && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Base</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">{base}</span>
                                <span className="text-orange-600 font-medium">
                                    {basePrice > 0
                                        ? `+${formatPrice(basePrice)}`
                                        : 'Included'
                                    }
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Size */}
                    {size && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Size</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">{size}</span>
                                <span className="text-orange-600 font-medium">
                                    {formatPrice(sizePrice)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Toppings */}
                    {toppings.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">
                                Toppings ({toppings.length})
                            </h4>
                            <div className="space-y-1">
                                {toppings.map((topping) => {
                                    const toppingData = toppingsData?.data?.find((t: any) => t.name === topping);
                                    const toppingPrice = toppingData ? parseFloat(toppingData.price) : 0;
                                    return (
                                        <div key={topping} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-700">{topping}</span>
                                            <span className="text-orange-600">
                                                +{formatPrice(toppingPrice)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Total */}
                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total</span>
                            <span className="text-xl font-bold text-orange-600">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
