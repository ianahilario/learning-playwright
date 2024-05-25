import {Page, Locator, expect} from '@playwright/test'
import { CartItemComponent } from '../components/CartItem.component';

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
}