'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types/cart';
import { formatPrice } from '../../utils/format';
import { useCart } from '../../contexts/cart-context';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../../utils/cn';

interface CartItemProps {
    item: CartItemType;
    onEdit?: (item: CartItemType) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onEdit }) => {
    const { updatePizzaQuantity, removePizza } = useCart();
    const [isRemoving, setIsRemoving] = useState(false);

    const handleQuantityChange = (newQuantity: number) => {
        updatePizzaQuantity(item.id, newQuantity);
    };

    const handleRemove = async () => {
        setIsRemoving(true);
        setTimeout(() => {
            removePizza(item.id);
        }, 150);
    };

    const itemTotal = item.price * item.quantity;

    return (
        <AnimatePresence>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                    opacity: isRemoving ? 0 : 1,
                    scale: isRemoving ? 0.8 : 1,
                    y: isRemoving ? -20 : 0
                }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.2 }}
            >
                <Card className={cn(
                    'transition-all duration-200 p-5',
                    isRemoving && 'pointer-events-none'
                )}>
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-100 border border-gray-300 shadow-lg rounded-full flex items-center justify-center">
                                <span className="text-3xl">🍕</span>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        Custom Pizza
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {item.base} • {item.size}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {onEdit && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                            className="p-2"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleRemove}
                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-3">
                                <p className="text-sm text-gray-700 mb-2">
                                    Toppings ({item.toppings.length}):
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {item.toppings.map((topping) => (
                                        <Badge key={topping} variant="secondary" className="text-xs">
                                            {topping}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">Quantity:</span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleQuantityChange(item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="p-1 h-8 w-8 text-lg"
                                        >
                                            -
                                        </Button>

                                        <motion.span
                                            key={item.quantity}
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            className="w-8 text-center font-medium text-black"
                                        >
                                            {item.quantity}
                                        </motion.span>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleQuantityChange(item.quantity + 1)}
                                            className="p-1 h-8 w-8 text-lg"
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-gray-600">
                                        Price
                                    </p>
                                    <motion.p
                                        key={itemTotal}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        className="text-lg font-bold text-orange-600">
                                        {formatPrice(itemTotal)}
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
};
