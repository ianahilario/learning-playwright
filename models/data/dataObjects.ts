export type Product = {
    imageUrl: any;
    name: any;
    description: any;
    price: any;
}

export type ShoppingCart = {
    products: Array<Product>;
    subTotalPrice: number;
}