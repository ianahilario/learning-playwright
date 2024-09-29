export interface Product {
  imageUrl: any;
  name: any;
  description: any;
  price: any;
}

export interface ShoppingCart {
  products: Product[];
  subTotalPrice: number;
  taxAmount: number;
  totalPrice: number;
}

export const TAX_PERCENTAGE = 0.0801;
