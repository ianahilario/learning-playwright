import {Page, Locator, expect} from '@playwright/test'
import { CartItemComponent } from '../components/CartItem.component';
import { Product, ShoppingCart, TAX_PERCENTAGE } from '../data/dataObjects';

export class CartPage{
    readonly page:Page;
    readonly pageTitle : Locator;
    readonly checkoutButton : Locator;
    readonly cartItem : CartItemComponent;

    constructor(page: Page){
        this.page = page;
        this.pageTitle = this.page.locator('//span[@data-test="title"]');
        this.checkoutButton = this.page.locator('//button[@data-test="checkout"]');
        this.cartItem = new CartItemComponent(page);
    }

    //Navigation
    async gotoCartCheckoutPage(){
        await this.checkoutButton.click();
    }

    //Assertion
    async isCorrectPage(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(this.page).toHaveTitle('Swag Labs');
        await expect(this.pageTitle).toHaveText('Your Cart');
    }

    async isCartEmpty(){
        await expect(this.cartItem.cartItem, "Cart is empty").toHaveCount(0);
    }

    //Getter
    async getShoppingCartData(products:Array<Product>) : Promise<ShoppingCart>{
        let computedSubTotalPrice : number = 0;
        let computedTaxAmount : number;
        let computedTotalPrice : number;
        let shoppingCartData : ShoppingCart;

        shoppingCartData = {
            products: products,
            subTotalPrice: 0,
            taxAmount: 0,
            totalPrice: 0
        };

        products.forEach(product => {
            let price = Number(String(product.price).replace('$', "").replace(",", ""));
            computedSubTotalPrice = computedSubTotalPrice + price;

            shoppingCartData.subTotalPrice = computedSubTotalPrice;
        });

        computedTaxAmount = computedSubTotalPrice * TAX_PERCENTAGE;
        computedTotalPrice = computedSubTotalPrice + computedTaxAmount;

        shoppingCartData = {
            products: products,
            subTotalPrice: computedSubTotalPrice,
            taxAmount: computedTaxAmount,
            totalPrice: computedTotalPrice
        };

        return shoppingCartData;
    }
}