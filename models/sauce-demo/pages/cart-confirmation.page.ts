import { Page, Locator, expect } from '@playwright/test';

export class CartConfirmationPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly headingText: Locator;
  readonly bodyText: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.locator('//span[@data-test="title"]');
    this.headingText = this.page.locator('//h2[@data-test="complete-header"]');
    this.bodyText = this.page.locator('//div[@data-test="complete-text"]');
    this.homeButton = this.page.locator(
      '//button[@data-test="back-to-products"]'
    );
  }

  //Navigation
  async gotoHomepage() {
    await this.homeButton.click();
  }

  //Assertion
  async isCorrectPage() {
    await expect(this.page).toHaveURL(
      'https://www.saucedemo.com/checkout-complete.html'
    );
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.pageTitle).toHaveText('Checkout: Complete!');
  }

  async isOrderConfirmed() {
    await expect(this.headingText).toHaveText('Thank you for your order!');
    await expect(this.bodyText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }
}
