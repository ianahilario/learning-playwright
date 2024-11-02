import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CartCheckoutPage {
  readonly page: Page;
  readonly cartReviewButton: Locator;
  readonly pageTitle: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postalCodeField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.locator('//span[@data-test="title"]');
    this.firstNameField = this.page.locator('//input[@data-test="firstName"]');
    this.lastNameField = this.page.locator('//input[@data-test="lastName"]');
    this.postalCodeField = this.page.locator('//input[@data-test="postalCode"]');
    this.cartReviewButton = this.page.locator('//input[@data-test="continue"]');
  }

  //Navigation
  async gotoCartReviewPage() {
    await this.cartReviewButton.click();
  }

  //Assertion
  async isCorrectPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
  }

  //Action
  async fillCheckoutForm() {
    await this.firstNameField.fill(faker.person.firstName());
    await this.lastNameField.fill(faker.person.lastName());
    await this.postalCodeField.fill(faker.location.zipCode());
  }
}
