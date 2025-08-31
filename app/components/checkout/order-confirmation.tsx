'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { OrderSummary } from '../../types/order';
import { formatPrice, formatDate } from '../../utils/format';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface OrderConfirmationProps {
    order: OrderSummary;
    onNewOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
    order,
    onNewOrder,
}) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-8"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-gray-600">
                        Thank you for your order. We'll start preparing your delicious pizza right away!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <Badge variant="default">
                                    {order.status}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        {/* <p className="font-medium">Delivery Address</p> */}
                                        {/* <p className="text-sm text-gray-600">
                                            {order.customerInfo.address.street}, {order.customerInfo.address.city}
                                        </p> */}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="font-medium text-black">Contact</p>
                                    <p className="text-sm text-gray-600">
                                        {order.customerInfo.phone} • {order.customerInfo.email}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Your Order</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-200 to-gray-100 border border-gray-300 shadow-lg rounded-full flex items-center justify-center">
                                            <span className="text-3xl">🍕</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 text-xs leading-tight">Custom Pizza</h4>
                                                <span className="font-medium text-orange-600 text-sm">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-2">
                                                {item.base} • {item.size} • Qty: {item.quantity}
                                            </p>

                                            <div className="flex flex-wrap gap-1">
                                                {item.toppings.map((topping) => (
                                                    <Badge key={topping} variant="secondary" className="text-xs">
                                                        {topping}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-gray-700">
                                    <span>Delivery Fee</span>
                                    <span>{formatPrice(order.deliveryFee)}</span>
                                </div>

                                <div className="border-t pt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900">Total</span>
                                        <span className="text-xl font-bold text-orange-600">
                                            {formatPrice(order.total)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button
                            onClick={onNewOrder}
                            className="flex-1"
                            size="lg"
                        >
                            Order Again
                        </Button>

                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
