'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { OrderFormData, OrderSummary } from '../../types/order';
import { useCart } from '../../contexts/cart-context';
import { CheckoutForm } from './checkout-form';
import { OrderConfirmation } from './order-confirmation';
import { CartSummary } from '../cart/cart-summary';
import { Button } from '../ui/button';
import { submitOrder, transformCartToBackendFormat, getBases, getSizes, getToppings } from '../../controllers/api.controllers';
import { useQuery } from '@tanstack/react-query';

export const CheckoutPage: React.FC = () => {
    const router = useRouter();
    const { items, total, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState<OrderSummary | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch API data for data transformation
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

    React.useEffect(() => {
        if (items.length === 0 && !orderConfirmed) {
            router.push('/cart');
        }
    }, [items.length, orderConfirmed, router]);

    const handleFormSubmit = async (formData: OrderFormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const backendOrderData = transformCartToBackendFormat(
                items,
                formData.customerInfo,
                formData.specialInstructions || '',
                baseData,
                sizesData,
                toppingsData
            );

            const backendResponse = await submitOrder(backendOrderData);

            const subtotal = total;
            const tax = subtotal * 0.08;
            const deliveryFee = 4.99;
            const finalTotal = subtotal + tax + deliveryFee;

            const order: OrderSummary = {
                items: [...items],
                subtotal,
                tax,
                deliveryFee,
                total: finalTotal,
                customerInfo: formData.customerInfo,
                createdAt: new Date(),
                estimatedDelivery: new Date(Date.now() + 35 * 60 * 1000),
                status: 'confirmed',
                backendOrderId: backendResponse.orderId || undefined,
            };

            setConfirmedOrder(order);
            setOrderConfirmed(true);
            clearCart();
        } catch (error: any) {
            console.error('Order submission failed:', error);
            setError(error.response?.data?.message || 'Failed to submit order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewOrder = () => {
        setOrderConfirmed(false);
        setConfirmedOrder(null);
        router.push('/pizza-builder');
    };

    if (orderConfirmed && confirmedOrder) {
        return (
            <OrderConfirmation
                order={confirmedOrder}
                onNewOrder={handleNewOrder}
            />
        );
    }

    if (items.length === 0) {
        return null;
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
                            onClick={() => router.push('/cart')}
                            className="p-2"
                            disabled={isSubmitting}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600"
                    >
                        Complete your order details and we'll get your pizza ready for delivery
                    </motion.p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <p className="text-red-600 text-sm">{error}</p>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <CheckoutForm
                            onSubmit={handleFormSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <CartSummary showCheckoutButton={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};
