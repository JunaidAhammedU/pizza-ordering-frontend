'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CartItem as CartItemType } from '../../types/cart';
import { PizzaConfiguration } from '../../types/pizza';
import { useCart } from '../../contexts/cart-context';
import { CartItem } from './cart-item';
import { CartSummary } from './cart-summary';
import { PizzaBuilder } from '../pizza/pizza-builder';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export const CartPage: React.FC = () => {
    const router = useRouter();
    const { items, clearCart } = useCart();
    const [editingPizza, setEditingPizza] = useState<CartItemType | null>(null);
    const [showBuilder, setShowBuilder] = useState(false);

    const handleEditPizza = (item: CartItemType) => {
        setEditingPizza(item);
        setShowBuilder(true);
    };

    const handleSaveEdit = (updatedPizza: PizzaConfiguration) => {
        setEditingPizza(null);
        setShowBuilder(false);
    };

    const handleCancelEdit = () => {
        setEditingPizza(null);
        setShowBuilder(false);
    };

    const handleAddNewPizza = () => {
        setEditingPizza(null);
        setShowBuilder(true);
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    if (showBuilder) {
        return (
            <PizzaBuilder
                editingPizza={editingPizza || undefined}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-4"
                    >
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/')}
                            className="p-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-between"
                    >
                        <p className="text-gray-600">
                            {items.length === 0
                                ? 'Your cart is empty. Add some delicious pizzas!'
                                : `${items.length} ${items.length === 1 ? 'pizza' : 'pizzas'} in your cart`
                            }
                        </p>
                        {items.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearCart}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                                Clear Cart
                            </Button>
                        )}
                    </motion.div>
                </div>

                {items.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16"
                    >
                        <Card className="max-w-md mx-auto">
                            <div className="py-12 px-6">
                                <div className="text-6xl mb-6">🍕</div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    Your cart is empty
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Ready to build your perfect pizza? Let's get started!
                                </p>
                                <Button
                                    onClick={
                                        () => {
                                            router.push('/pizza-builder');
                                        }
                                    }
                                    size="lg"
                                    className="w-full"
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Build Your First Pizza
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Button
                                    onClick={handleAddNewPizza}
                                    variant="outline"
                                    className="w-full mb-6 h-12 border-2 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50"
                                >
                                    <Plus className="h-5 w-5 mr-2" />
                                    Add Another Pizza
                                </Button>
                            </motion.div>

                            <AnimatePresence mode="popLayout">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        layout
                                    >
                                        <CartItem
                                            item={item}
                                            onEdit={handleEditPizza}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-1">
                            <CartSummary onCheckout={handleCheckout} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
