import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class ProductDetailsPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.addToCartButton = this.page.locator('//*[@data-test="add-to-cart"]');
    this.toastMessage = this.page.locator('//*[@id="toast-container"]');
  }

  async addItemToCart() {
    await this.addToCartButton.click();
    await this.toastMessage.waitFor({ state: 'visible', timeout: 5_000 });
  }
}
