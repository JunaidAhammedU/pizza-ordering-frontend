'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PizzaBase, PizzaSize, PizzaTopping, PizzaConfiguration } from '../../types/pizza';
import { calculateDynamicPizzaPrice, validatePizza, generatePizzaId } from '../../utils/pizza-config';
import { useCart } from '../../contexts/cart-context';
import { PizzaBaseSelector } from './pizza-base-selector';
import { PizzaSizeSelector } from './pizza-size-selector';
import { PizzaToppingsSelector } from './pizza-toppings-selector';
import { PizzaSummary } from './pizza-summary';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { getBases, getSizes, getToppings } from '@/app/controllers/api.controllers';
import { useQuery } from '@tanstack/react-query';
import { formatPrice } from '@/app/utils/format';

interface PizzaBuilderProps {
    editingPizza?: PizzaConfiguration;
    onSave?: (pizza: PizzaConfiguration) => void;
    onCancel?: () => void;
}

export const PizzaBuilder: React.FC<PizzaBuilderProps> = ({
    editingPizza,
    onSave,
    onCancel,
}) => {
    const { addPizza, editPizza } = useCart();
    const [currentStep, setCurrentStep] = useState(0);
    const [pizza, setPizza] = useState<Partial<PizzaConfiguration>>({
        base: editingPizza?.base || null,
        size: editingPizza?.size || null,
        toppings: editingPizza?.toppings || [],
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isAdding, setIsAdding] = useState(false);
    const steps = ['Base', 'Size', 'Toppings'];

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

    const totalPrice = React.useMemo(() => {
        return calculateDynamicPizzaPrice(pizza, baseData, sizesData, toppingsData);
    }, [pizza, baseData, sizesData, toppingsData]);

    const validation = React.useMemo(() => {
        return validatePizza(pizza);
    }, [pizza]);

    const handleBaseSelect = (base: PizzaBase) => {
        setPizza(prev => ({ ...prev, base }));
        setErrors(prev => ({ ...prev, base: '' }));
    };

    const handleSizeSelect = (size: PizzaSize) => {
        setPizza(prev => ({ ...prev, size }));
        setErrors(prev => ({ ...prev, size: '' }));
    };

    const handleToppingsChange = (toppings: PizzaTopping[]) => {
        setPizza(prev => ({ ...prev, toppings }));
        setErrors(prev => ({ ...prev, toppings: '' }));
    };


    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleAddToCart = async () => {
        const currentValidation = validatePizza(pizza);

        if (!currentValidation.isValid) {
            setErrors(currentValidation.errors);
            return;
        }

        setIsAdding(true);

        try {
            const completePizza: PizzaConfiguration = {
                id: editingPizza?.id || generatePizzaId(),
                base: pizza.base!,
                size: pizza.size!,
                toppings: pizza.toppings || [],
                price: totalPrice,
                createdAt: editingPizza?.createdAt || new Date(),
            };

            if (editingPizza && onSave) {
                editPizza(editingPizza.id, completePizza);
                onSave(completePizza);
            } else {
                addPizza(completePizza);
            }

            if (!editingPizza) {
                setPizza({ base: null, size: null, toppings: [] });
                setCurrentStep(0);
            }
        } finally {
            setIsAdding(false);
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <PizzaBaseSelector
                        selectedBase={pizza.base || null}
                        onBaseSelect={handleBaseSelect}
                        error={errors.base}
                    />
                );
            case 1:
                return (
                    <PizzaSizeSelector
                        selectedSize={pizza.size || null}
                        onSizeSelect={handleSizeSelect}
                        error={errors.size}
                    />
                );
            case 2:
                return (
                    <PizzaToppingsSelector
                        selectedToppings={pizza.toppings || []}
                        onToppingsChange={handleToppingsChange}
                        error={errors.toppings}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
                    >
                        {editingPizza ? 'Edit Your Pizza' : 'Build Your Perfect Pizza'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600"
                    >
                        Customize every detail to create your ideal pizza
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <Card className="py-6">
                        <div className="flex items-center justify-center max-w-md mx-auto">
                            {steps.map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${index <= currentStep
                                                ? 'bg-orange-500 text-white shadow-lg'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <span
                                            className={`mt-2 text-sm font-medium transition-colors ${index <= currentStep ? 'text-orange-600' : 'text-gray-500'
                                                }`}>
                                            {step}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 mx-4 mt-[-20px]">
                                            <div className={`h-1 rounded-full transition-all duration-300 ${index < currentStep ? 'bg-orange-500' : 'bg-gray-200'}`} />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    <div className="xl:col-span-3">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="p-6 lg:p-8">
                                {renderCurrentStep()}

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
                                    <Button
                                        variant="outline"
                                        onClick={currentStep === 0 ? onCancel : handlePrevious}
                                        disabled={isAdding}
                                        className="w-full sm:w-auto"
                                    >
                                        {currentStep === 0 ? 'Cancel' : 'Previous Step'}
                                    </Button>

                                    {currentStep < steps.length - 1 ? (
                                        <Button
                                            onClick={handleNext}
                                            disabled={
                                                (currentStep === 0 && !pizza.base) ||
                                                (currentStep === 1 && !pizza.size)
                                            }
                                            className="w-full sm:w-auto"
                                            size="lg"
                                        >
                                            Next Step
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleAddToCart}
                                            isLoading={isAdding}
                                            disabled={!validation.isValid}
                                            size="lg"
                                            className="w-full sm:w-auto min-w-[200px]"
                                        >
                                            {editingPizza
                                                ? 'Save Changes'
                                                : `Add to Cart - ${formatPrice(Number(totalPrice.toFixed(2)))}`
                                            }
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-4">
                            <PizzaSummary pizza={pizza} totalPrice={totalPrice} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};