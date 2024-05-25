import {Page, Locator, expect} from '@playwright/test'

export class HeaderPage{
    readonly page:Page;
    readonly shoppingCartIcon : Locator;
    readonly shoppingCartBadge : Locator;
    readonly loginButton : Locator;

    constructor(page: Page){
        this.page = page;
        this.shoppingCartIcon = this.page.locator('//a[@data-test="shopping-cart-link"]');
        this.shoppingCartBadge = this.page.locator('//span[@data-test="shopping-cart-badge"]');
    }

    //Navigation
    async goToShoppingCartPage(){
        await this.shoppingCartIcon.click();
    }

    //Assertion
    async isCorrectShoppingCartBadge(expectedCartQuantity:number){
        expectedCartQuantity === 0 ? 
            await expect(this.shoppingCartBadge, "Shopping cart badge is not displayed when qty=0").not.toBeVisible()
            :
            await expect(this.shoppingCartBadge, "Shopping cart badge is displayed").toBeVisible()
            await expect(this.shoppingCartBadge, "Shopping cart badge shows correct quantity").toHaveText(`${expectedCartQuantity}`);
    }

    //Getter
    async getShoppingCartBadgeQty(){
        let shoppingCartQty = 0;

        await this.shoppingCartBadge.isVisible() ? 
            shoppingCartQty = Number(this.shoppingCartBadge.textContent()) 
            : 
            shoppingCartQty = 0;
        
        return shoppingCartQty;
    }
}