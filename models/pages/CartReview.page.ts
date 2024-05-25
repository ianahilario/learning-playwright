import {Page, Locator, expect} from '@playwright/test'
import { CartItemComponent } from '../components/CartItem.component';

export class CartReviewPage{
    readonly page:Page;
    readonly cartConfirmationButton : Locator;
    readonly pageTitle : Locator;
    readonly cartItem : CartItemComponent;

    constructor(page: Page){
        this.page = page;
        this.pageTitle = this.page.locator('//span[@data-test="title"]');
        this.cartConfirmationButton = this.page.locator('//button[@data-test="finish"]');
        this.cartItem = new CartItemComponent(page);
    }

    //Navigation
    async gotoCartConfirmationPage(){
        await this.cartConfirmationButton.click();
    }

    //Assertion
    async isCorrectPage(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(this.page).toHaveTitle('Swag Labs');
        await expect(this.pageTitle).toHaveText('Checkout: Overview');
    }
}