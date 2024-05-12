import {Page, Locator, expect} from '@playwright/test'
import {Product} from '../utils/dataObjects'

export class ProductDetailsPage{
    readonly page:Page;
    readonly backToProductsLink : Locator;
    readonly productName : Locator;
    readonly productDescription : Locator;
    readonly productPrice : Locator;

    constructor(page: Page){
        this.page = page;
        this.backToProductsLink = this.page.locator('//button[@data-test="back-to-products"]')
        this.productName = this.page.locator('//div[@data-test="inventory-item-name"]')
        this.productDescription = this.page.locator('//div[@data-test="inventory-item-desc"]')
        this.productPrice = this.page.locator('//div[@data-test="inventory-item-price"]')
    }

    async isCorrectPage(){
        await expect(this.page).toHaveURL(new RegExp('https:\/\/www\.saucedemo\.com\/inventory-item.html.*'));
        await expect(this.page).toHaveTitle('Swag Labs');
        await expect(this.backToProductsLink).toBeVisible();
    }

    async isCorrectProductData(productData:Product){
        await expect.soft(this.productName).toHaveText(productData.name);
        await expect.soft(this.productDescription).toHaveText(productData.description);
        await expect.soft(this.productPrice).toHaveText(productData.price);
    }

    async goBackToListingPage(){
        this.backToProductsLink.click();
    }
}