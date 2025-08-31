export type PizzaBase =
    | 'Neapolitan Crust'
    | 'New York Style Crust'
    | 'Sicilian Crust'
    | 'Thin Crust'
    | 'Thick Crust'
    | 'Stuffed Crust'
    | 'Gluten-Free Crust'
    | 'Whole Wheat/Multigrain Crust';

export type PizzaSize =
    | 'Small (8–10 Inches)'
    | 'Medium (12–14 Inches)'
    | 'Large (14–16 Inches)';

export type PizzaTopping =
    | 'Pepperoni'
    | 'Mushrooms'
    | 'Onions'
    | 'Sausages'
    | 'Black Olives'
    | 'Bacon'
    | 'Pineapple';

export interface PizzaConfiguration {
    id: string;
    base: PizzaBase | null;
    size: PizzaSize | null;
    toppings: PizzaTopping[];
    price: number;
    createdAt: Date;
}

export interface PizzaValidation {
    isValid: boolean;
    errors: {
        base?: string;
        size?: string;
        toppings?: string;
    };
}

export interface PizzaPricing {
    basePrice: Record<PizzaSize, number>;
    baseCrustPrice: Record<PizzaBase, number>;
    toppingPrice: number;
}
