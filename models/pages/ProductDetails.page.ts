import { Page, Locator, expect } from '@playwright/test';
import { CartItemComponent } from '../components/CartItem.component';

export class ProductDetailsPage {
  readonly page: Page;
  readonly backToProductsLink: Locator;
  readonly cartItem: CartItemComponent;

  constructor(page: Page) {
    this.page = page;
    this.backToProductsLink = this.page.locator(
      '//button[@data-test="back-to-products"]'
    );
    this.cartItem = new CartItemComponent(page);
  }

  async isCorrectPage() {
    await expect(this.page).toHaveURL(
      new RegExp('https://www.saucedemo.com/inventory-item.html.*')
    );
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.backToProductsLink).toBeVisible();
  }

  async goBackToListingPage() {
    await this.backToProductsLink.click();
  }
}
