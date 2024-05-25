export type Product = {
    imageUrl: any;
    name: any;
    description: any;
    price: any;
}

export type ShoppingCart = {
    products: Array<Product>;
    subTotalPrice: number;
    taxAmount: number;
    totalPrice: number;
}

export const TAX_PERCENTAGE : number = 0.0801;