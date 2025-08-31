'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Pizza } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../contexts/cart-context';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const Header: React.FC = () => {
    const { itemCount } = useCart();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 15 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white"
                        >
                            <Pizza className="h-5 w-5" />
                        </motion.div>
                        <span className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            PizzaCraft
                        </span>
                    </Link>

                    <Link href="/cart">
                        <Button variant="outline" className="relative">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Cart
                            {itemCount > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2"
                                >
                                    <Badge variant="destructive" className="min-w-[20px] h-5 p-0 flex items-center justify-center text-xs">
                                        {itemCount}
                                    </Badge>
                                </motion.div>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
};
