import axios from 'axios';

export const getBases = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/pizza/bases`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bases:', error);
        throw error;
    }
};

export const getSizes = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/pizza/sizes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sizes:', error);
        throw error;
    }
};

export const getToppings = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/pizza/toppings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching toppings:', error);
        throw error;
    }
};

export const submitOrder = async (orderData: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASEURL}/api/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error;
    }
};

export const transformCartToBackendFormat = (
    cartItems: any[],
    customerInfo: any,
    notes: string,
    baseData: any,
    sizesData: any,
    toppingsData: any
) => {
    const transformedItems = cartItems.map(item => {
        const base = baseData?.data?.find((b: any) => b.name === item.base);
        const baseId = base?.id;
        const size = sizesData?.data?.find((s: any) => s.name === item.size);
        const sizeId = size?.id;
        const transformedToppings = item.toppings.map((toppingName: string) => {
            const topping = toppingsData?.data?.find((t: any) => t.name === toppingName);
            return {
                toppingId: topping?.id,
                quantity: 1
            };
        }).filter((topping: any) => topping.toppingId);

        return {
            baseId,
            sizeId,
            quantity: item.quantity,
            notes: '',
            toppings: transformedToppings
        };
    }).filter(item => item.baseId && item.sizeId);

    return {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        notes: notes,
        items: transformedItems
    };
};