export type Product = {
    name: any;
    description: any;
    price: any;
}

export type ShoppingCart = {
    products: Array<Product>;
    totalPrice: any;
}