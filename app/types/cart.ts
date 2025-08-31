import { PizzaConfiguration } from './pizza';

export interface CartItem extends PizzaConfiguration {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export interface CartActions {
    addPizza: (pizza: PizzaConfiguration) => void;
    removePizza: (pizzaId: string) => void;
    updatePizzaQuantity: (pizzaId: string, quantity: number) => void;
    editPizza: (pizzaId: string, updatedPizza: PizzaConfiguration) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getItemCount: () => number;
}

export interface CartContextType extends CartState, CartActions { }
