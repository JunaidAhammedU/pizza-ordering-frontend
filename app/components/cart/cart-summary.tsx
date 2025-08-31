'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/cart-context';
import { formatPrice } from '../../utils/format';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Info } from 'lucide-react';

interface CartSummaryProps {
    onCheckout?: () => void;
    showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
    onCheckout,
    showCheckoutButton = true,
}) => {
    const { items, total, itemCount } = useCart();

    const subtotal = total;
    const deliveryFee = items.length > 0 ? 4 : 0;
    const finalTotal = subtotal + deliveryFee;

    if (items.length === 0) {
        return (
            <Card className="sticky top-4">
                <CardContent>
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-4">🛒</div>
                        <p>Your cart is empty</p>
                        <p className="text-sm mt-2">Add some delicious pizzas to get started!</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sticky top-4"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Order Summary</span>
                        <Badge variant="default">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </Badge>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Delivery Fee</span>
                            <span>{formatPrice(deliveryFee)}</span>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-gray-900">Total</span>
                            <span className="text-xl font-bold text-orange-600">
                                {formatPrice(finalTotal)}
                            </span>
                        </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-3 mt-4">
                        <div className="flex items-center gap-2 text-orange-800">
                            <Info className="w-4 h-4" />
                            <span className="text-xs font-medium">
                                Estimated delivery: 25-35 minutes
                            </span>
                        </div>
                    </div>

                    {showCheckoutButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button
                                onClick={onCheckout}
                                size="lg"
                                className="w-full mt-4"
                            >
                                Proceed to Checkout
                            </Button>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};
