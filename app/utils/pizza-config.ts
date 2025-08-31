import { OrderFormData } from '../types';
import {
    PizzaBase,
    PizzaSize,
    PizzaTopping,
    PizzaPricing,
    PizzaConfiguration,
    PizzaValidation
} from '../types/pizza';

export const PIZZA_PRICING: PizzaPricing = {
    basePrice: {
        'Small (8–10 Inches)': 99.99,
        'Medium (12–14 Inches)': 129.99,
        'Large (14–16 Inches)': 159.99,
    },
    baseCrustPrice: {
        'Neapolitan Crust': 0,
        'New York Style Crust': 0,
        'Sicilian Crust': 1.50,
        'Thin Crust': 10,
        'Thick Crust': 10,
        'Stuffed Crust': 10,
        'Gluten-Free Crust': 10,
        'Whole Wheat/Multigrain Crust': 10,
    },
    toppingPrice: 10,
};

export const PIZZA_BASES: PizzaBase[] = [
    'Neapolitan Crust',
    'New York Style Crust',
    'Sicilian Crust',
    'Thin Crust',
    'Thick Crust',
    'Stuffed Crust',
    'Gluten-Free Crust',
    'Whole Wheat/Multigrain Crust',
];

export const PIZZA_SIZES: PizzaSize[] = [
    'Small (8–10 Inches)',
    'Medium (12–14 Inches)',
    'Large (14–16 Inches)',
];

export const PIZZA_TOPPINGS: PizzaTopping[] = [
    'Pepperoni',
    'Mushrooms',
    'Onions',
    'Sausages',
    'Black Olives',
    'Bacon',
    'Pineapple',
];

export const calculatePizzaPrice = (pizza: PizzaConfiguration): number => {
    if (!pizza.base || !pizza.size) return 0;

    const basePrice = PIZZA_PRICING.basePrice[pizza.size];
    const crustPrice = PIZZA_PRICING.baseCrustPrice[pizza.base];
    const toppingsPrice = pizza.toppings.length * PIZZA_PRICING.toppingPrice;

    return basePrice + crustPrice + toppingsPrice;
};

export const calculateDynamicPizzaPrice = (
    pizza: Partial<PizzaConfiguration>,
    baseData?: any,
    sizesData?: any,
    toppingsData?: any
): number => {
    if (!pizza.base || !pizza.size) return 0;

    let totalPrice = 0;

    if (baseData?.data) {
        const selectedBase = baseData.data.find((b: any) => b.name === pizza.base);
        if (selectedBase) {
            totalPrice += parseFloat(selectedBase.price);
        }
    }

    if (sizesData?.data) {
        const selectedSize = sizesData.data.find((s: any) => s.name === pizza.size);
        if (selectedSize) {
            totalPrice += parseFloat(selectedSize.price);
        }
    }

    if (pizza.toppings && pizza.toppings.length > 0 && toppingsData?.data) {
        pizza.toppings.forEach((toppingName) => {
            const topping = toppingsData.data.find((t: any) => t.name === toppingName);
            if (topping) {
                totalPrice += parseFloat(topping.price);
            }
        });
    }

    return totalPrice;
};

export const validatePizza = (pizza: Partial<PizzaConfiguration>): PizzaValidation => {
    const errors: PizzaValidation['errors'] = {};

    if (!pizza.base) {
        errors.base = 'Please select a pizza base';
    }

    if (!pizza.size) {
        errors.size = 'Please select a pizza size';
    }

    if (!pizza.toppings || pizza.toppings.length < 3) {
        errors.toppings = 'Please select at least 3 toppings';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const generatePizzaId = (): string => {
    return `pizza_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};


export const validateForm = (formData: OrderFormData, setErrors: (errors: { [key: string]: any }) => void): boolean => {
    const newErrors: { [key: string]: any } = {};

    if (!formData.customerInfo.name.trim()) {
        newErrors.name = 'Name is required';
    }

    if (!formData.customerInfo.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerInfo.email)) {
        newErrors.email = 'Email is invalid';
    }

    if (!formData.customerInfo.phone.trim()) {
        newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};