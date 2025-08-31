'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, DollarSign, User, Mail, Phone, MapPin } from 'lucide-react';
import { CustomerInfo, OrderFormData } from '../../types/order';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';
import { validateForm } from '@/app/utils/pizza-config';

interface CheckoutFormProps {
    onSubmit: (formData: OrderFormData) => void;
    isSubmitting?: boolean;
}

const paymentMethods = [
    {
        id: 'credit-card' as const,
        name: 'Credit Card',
        icon: CreditCard,
        description: 'Pay securely with your credit or debit card',
    },
    {
        id: 'paypal' as const,
        name: 'PayPal',
        icon: Smartphone,
        description: 'Quick and secure payment with PayPal',
    },
    {
        id: 'cash-on-delivery' as const,
        name: 'Cash on Delivery',
        icon: DollarSign,
        description: 'Pay with cash when your order arrives',
    },
];

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
    onSubmit,
    isSubmitting = false,
}) => {
    const [formData, setFormData] = useState<OrderFormData>({
        customerInfo: {
            name: '',
            email: '',
            phone: '',
            // address: {
            //     street: '',
            //     city: '',
            //     zipCode: '',
            //     country: '',
            // }
        },
        paymentMethod: 'cash-on-delivery',
        specialInstructions: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm(formData, setErrors)) {
            onSubmit(formData);
        }
    };

    // const updateAddress = (field: keyof CustomerInfo['address'], value: string) => {
    //     setFormData(prev => ({
    //         ...prev,
    //         customerInfo: { ...prev.customerInfo, address: { ...prev.customerInfo.address, [field]: value } },
    //     }));
    // };

    const updateCustomerInfo = (field: keyof CustomerInfo, value: string) => {
        setFormData(prev => ({
            ...prev,
            customerInfo: {
                ...prev.customerInfo,
                [field]: value,
            },
        }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                value={formData.customerInfo.name}
                                onChange={(e) => updateCustomerInfo('name', e.target.value)}
                                className={cn(
                                    'w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500',
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                )}
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                value={formData.customerInfo.email}
                                onChange={(e) => updateCustomerInfo('email', e.target.value)}
                                className={cn(
                                    'w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500',
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                )}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            value={formData.customerInfo.phone}
                            onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                            className={cn(
                                'w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500',
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                            )}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Delivery Address
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address *
                        </label>
                        <input
                            type="text"
                            value={formData.customerInfo.address.street}
                            onChange={(e) => updateAddress('street', e.target.value)}
                            className={cn(
                                'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500',
                                errors.street ? 'border-red-500' : 'border-gray-300'
                            )}
                            placeholder="Enter your street address"
                        />
                        {errors.street && (
                            <p className="text-red-600 text-sm mt-1">{errors.street}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City *
                            </label>
                            <input
                                type="text"
                                value={formData.customerInfo.address.city}
                                onChange={(e) => updateAddress('city', e.target.value)}
                                className={cn(
                                    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500',
                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                )}
                                placeholder="City"
                            />
                            {errors.city && (
                                <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ZIP Code *
                            </label>
                            <input
                                type="text"
                                value={formData.customerInfo.address.zipCode}
                                onChange={(e) => updateAddress('zipCode', e.target.value)}
                                className={cn(
                                    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500',
                                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                )}
                                placeholder="ZIP Code"
                            />
                            {errors.zipCode && (
                                <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country
                            </label>
                            <select
                                value={formData.customerInfo.address.country}
                                onChange={(e) => updateAddress('country', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card> */}

            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            const isSelected = formData.paymentMethod === method.id;

                            return (
                                <motion.div
                                    key={method.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <label
                                        className={cn(
                                            'flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all',
                                            isSelected
                                                ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200'
                                                : 'border-gray-300 hover:border-orange-300'
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.id}
                                            checked={isSelected}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                paymentMethod: e.target.value as any,
                                            }))}
                                            className="sr-only"
                                        />
                                        <Icon className="h-6 w-6 text-orange-600" />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{method.name}</h4>
                                            <p className="text-sm text-gray-600">{method.description}</p>
                                        </div>
                                        {isSelected && (
                                            <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center">
                                                ✓
                                            </div>
                                        )}
                                    </label>
                                </motion.div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                    <textarea
                        value={formData.specialInstructions}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            specialInstructions: e.target.value,
                        }))}
                        className="w-full text-black  px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-24 resize-none"
                        placeholder="Any special instructions for your order (e.g., extra crispy, ring doorbell, etc.)"
                    />
                </CardContent>
            </Card>

            <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Processing Order...' : 'Place Order'}
            </Button>
        </motion.form>
    );
};
