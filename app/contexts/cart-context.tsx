'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartState, CartActions, CartContextType, CartItem } from '../types/cart';
import { PizzaConfiguration } from '../types/pizza';
import { calculateDynamicPizzaPrice } from '../utils/pizza-config';
import { useQuery } from '@tanstack/react-query';
import { getBases, getSizes, getToppings } from '../controllers/api.controllers';

type CartAction =
    | { type: 'ADD_PIZZA'; payload: PizzaConfiguration }
    | { type: 'REMOVE_PIZZA'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'EDIT_PIZZA'; payload: { id: string; pizza: PizzaConfiguration } }
    | { type: 'CLEAR_CART' };

const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
};

const calculateCartTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
};

const findExistingItem = (items: CartItem[], newPizza: PizzaConfiguration) => {
    return items.findIndex(item =>
        item.base === newPizza.base &&
        item.size === newPizza.size &&
        JSON.stringify(item.toppings.sort()) === JSON.stringify(newPizza.toppings.sort())
    );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_PIZZA': {
            const newPizza = action.payload;
            const existingItemIndex = findExistingItem(state.items, newPizza);

            let newItems: CartItem[];
            if (existingItemIndex >= 0) {
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...state.items, { ...newPizza, quantity: 1 }];
            }

            const { total, itemCount } = calculateCartTotals(newItems);
            return { items: newItems, total, itemCount };
        }

        case 'REMOVE_PIZZA': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            const { total, itemCount } = calculateCartTotals(newItems);
            return { items: newItems, total, itemCount };
        }

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                return cartReducer(state, { type: 'REMOVE_PIZZA', payload: id });
            }

            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            const { total, itemCount } = calculateCartTotals(newItems);
            return { items: newItems, total, itemCount };
        }

        case 'EDIT_PIZZA': {
            const { id, pizza } = action.payload;
            const newItems = state.items.map(item =>
                item.id === id ? { ...pizza, quantity: item.quantity } : item
            );

            const { total, itemCount } = calculateCartTotals(newItems);
            return { items: newItems, total, itemCount };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

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

    const itemsWithDynamicPricing = React.useMemo(() => {
        return state.items.map(item => {
            const dynamicPrice = calculateDynamicPizzaPrice(item, baseData, sizesData, toppingsData);
            return { ...item, price: dynamicPrice };
        });
    }, [state.items, baseData, sizesData, toppingsData]);

    const totalWithDynamicPricing = React.useMemo(() => {
        return itemsWithDynamicPricing.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [itemsWithDynamicPricing]);

    const actions: CartActions = {
        addPizza: (pizza: PizzaConfiguration) => {
            const dynamicPrice = calculateDynamicPizzaPrice(pizza, baseData, sizesData, toppingsData);
            const pizzaWithPrice = { ...pizza, price: dynamicPrice };
            dispatch({ type: 'ADD_PIZZA', payload: pizzaWithPrice });
        },

        removePizza: (pizzaId: string) => {
            dispatch({ type: 'REMOVE_PIZZA', payload: pizzaId });
        },

        updatePizzaQuantity: (pizzaId: string, quantity: number) => {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id: pizzaId, quantity } });
        },

        editPizza: (pizzaId: string, updatedPizza: PizzaConfiguration) => {
            const dynamicPrice = calculateDynamicPizzaPrice(updatedPizza, baseData, sizesData, toppingsData);
            const pizzaWithPrice = { ...updatedPizza, price: dynamicPrice };
            dispatch({ type: 'EDIT_PIZZA', payload: { id: pizzaId, pizza: pizzaWithPrice } });
        },

        clearCart: () => {
            dispatch({ type: 'CLEAR_CART' });
        },

        getCartTotal: () => totalWithDynamicPricing,

        getItemCount: () => state.itemCount,
    };

    const value: CartContextType = {
        items: itemsWithDynamicPricing,
        total: totalWithDynamicPricing,
        itemCount: state.itemCount,
        ...actions,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('Error in useCart');
    }
    return context;
};
