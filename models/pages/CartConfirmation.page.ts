import {Page, Locator, expect} from '@playwright/test'
import { CartItemComponent } from '../components/CartItem.component';

export class CartConfirmationPage{
    readonly page:Page;
    readonly homeButton : Locator;
    readonly pageTitle : Locator;

    constructor(page: Page){
        this.page = page;
        this.pageTitle = this.page.locator('//span[@data-test="title"]');
        this.homeButton = this.page.locator('//button[@data-test="back-to-products"]');
    }

    //Navigation
    async gotoHomepage(){
        await this.homeButton.click();
    }

    //Assertion
    async isCorrectPage(){
        await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(this.page).toHaveTitle('Swag Labs');
        await expect(this.pageTitle).toHaveText('Checkout: Complete!');
    }
}