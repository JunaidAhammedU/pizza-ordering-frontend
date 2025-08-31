'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-1 md:col-span-2"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <Pizza className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold">PizzaCraft</span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Crafting the perfect pizza experience with fresh ingredients,
                            endless customization, and fast delivery. Your pizza, your way.
                        </p>
                        <div className="flex gap-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                📘
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                📱
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                            >
                                📷
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/pizza-builder" className="hover:text-orange-400 transition-colors">Build Pizza</a></li>
                            <li><a href="/cart" className="hover:text-orange-400 transition-colors">Cart</a></li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>(555) 123-PIZZA</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>order@pizzacraft.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Pizza Street, Food City</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
                >
                    <p className="text-gray-400 text-sm">
                        © 2024 PizzaCraft. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                            Terms of Service
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};
