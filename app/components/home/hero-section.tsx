'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export const HeroSection: React.FC = () => {
    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden py-8">

            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 left-20 text-6xl opacity-20"
                >
                    🍕
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 1 }}
                    className="absolute top-40 right-32 text-4xl opacity-30"
                >
                    🧄
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute bottom-32 left-32 text-5xl opacity-25"
                >
                    🍄
                </motion.div>
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-20 right-20 text-3xl opacity-35"
                >
                    🫒
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 justify-center lg:justify-start mb-6"
                        >
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-gray-600 font-medium">Rated #1 Pizza Builder</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                        >
                            Craft Your
                            <span className="text-orange-500 block">Perfect Pizza</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            Choose from premium crusts, fresh toppings, and create a pizza that's uniquely yours.
                            Fast delivery in 30 minutes or less.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/pizza-builder">
                                <Button size="lg" className="group">
                                    Start Building
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <Link href="/">
                                <Button variant="outline" size="lg">
                                    View Menu
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">30min</div>
                                <div className="text-sm text-gray-600">Delivery</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">8+</div>
                                <div className="text-sm text-gray-600">Crust Types</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">7+</div>
                                <div className="text-sm text-gray-600">Toppings</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="text-center space-y-6 ">
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-8xl mb-4"
                            >
                                🍕
                            </motion.div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Build. Customize. Enjoy.
                            </h3>

                            <div className='flex flex-col gap-4 text-lg'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>1</div>
                                    <span className='text-gray-700'>Choose your crust</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>2</div>
                                    <span className='text-gray-700'>Select your size</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold'>3</div>
                                    <span className='text-gray-700'>Pick 3+ toppings</span>
                                </div>
                            </div>

                            {/* <div className="space-y-4 p-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        1
                                    </div>
                                    <span className="text-gray-700">Choose your crust</span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        2
                                    </div>
                                    <span className="text-gray-700">Select your size</span>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        3
                                    </div>
                                    <span className="text-gray-700">Pick 3+ toppings</span>
                                </motion.div>
                            </div> */}
                        </div>
                        {/* <Card className="p-8 bg-white/80 backdrop-blur-sm border-orange-20 ">
                        </Card> */}
                    </motion.div>
                </div>
            </div>
        </div >
    );
};
