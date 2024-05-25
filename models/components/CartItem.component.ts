import {Page, Locator, expect} from '@playwright/test'
import {Product} from '../data/dataObjects'

export class CartItemComponent{
    readonly page:Page;
    readonly cartItem : Locator;
    readonly productImage : Locator;
    readonly productName : Locator;
    readonly productDescription : Locator;
    readonly productPrice : Locator;
    readonly addtoCartButton : Locator;
    readonly removetoCartButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.cartItem = this.page.locator('//div[@data-test="inventory-item"]')
        this.productImage = this.page.locator('//img')
        this.productName = this.page.locator('//div[@data-test="inventory-item-name"]')
        this.productDescription = this.page.locator('//div[@data-test="inventory-item-desc"]')
        this.productPrice = this.page.locator('//div[@data-test="inventory-item-price"]')
        this.addtoCartButton = this.page.locator('//button[starts-with(@data-test,"add-to-cart-")]')
        this.removetoCartButton = this.page.locator('//button[starts-with(@data-test,"remove-")]')
    }

    async isCorrectProductData(productData:Product, isItemAddedToCart:boolean){
        let productItem = this.cartItem.filter({has: this.productName.filter({hasText: productData.name})});
        await expect.soft(productItem, `Product ${productData.name} is displayed`).toBeVisible(productData.name);

        await expect.soft(productItem.locator(this.productImage), "Correct product image").toHaveAttribute('src', productData.imageUrl);
        await expect.soft(productItem.locator(this.productName), "Correct product item").toHaveText(productData.name);
        await expect.soft(productItem.locator(this.productDescription), "Correct product description").toHaveText(productData.description);
        await expect.soft(productItem.locator(this.productPrice), "Correct product price").toHaveText(productData.price);

        isItemAddedToCart ? 
            await expect.soft(productItem.locator(this.removetoCartButton)).toBeVisible()
            :
            await expect.soft(productItem.locator(this.addtoCartButton)).not.toBeVisible();
    }
}