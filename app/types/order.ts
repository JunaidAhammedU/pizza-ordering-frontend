import { CartItem } from './cart';

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    // address: Address;
}

export interface Address {
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

export interface OrderSummary {
    items: CartItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    customerInfo: CustomerInfo;
    createdAt: Date;
    estimatedDelivery: Date;
    status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered';
    backendOrderId?: string; // Backend order ID from API response
}

export interface OrderFormData {
    customerInfo: CustomerInfo;
    paymentMethod: 'credit-card' | 'paypal' | 'cash-on-delivery';
    specialInstructions?: string;
}
