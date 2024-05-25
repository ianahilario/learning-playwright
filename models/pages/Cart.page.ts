import {Page, Locator, expect} from '@playwright/test'
import { CartItemComponent } from '../components/CartItem.component';
import { Product, ShoppingCart } from '../data/dataObjects';

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

    //Getter
    async getShoppingCartData(products:Array<Product>) : Promise<ShoppingCart>{
        let totalPrice : number = 0;
        let shoppingCartData : ShoppingCart;

        shoppingCartData = {
            products: products,
            subTotalPrice: totalPrice
        };

        products.forEach(product => {
            let price = Number(String(product.price).replace('$', "").replace(",", ""));
            totalPrice = totalPrice + price;

            shoppingCartData.subTotalPrice = totalPrice;
        });

        return shoppingCartData;
    }
}