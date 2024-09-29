import { Page, Locator, expect } from '@playwright/test';
import { CartItemComponent } from '../components/CartItem.component';
import { ShoppingCart } from '../data/dataObjects';

export class CartReviewPage {
  readonly page: Page;
  readonly cartConfirmationButton: Locator;
  readonly pageTitle: Locator;
  readonly cartItem: CartItemComponent;
  readonly priceSubTotal: Locator;
  readonly priceTax: Locator;
  readonly priceTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.locator('//span[@data-test="title"]');
    this.cartConfirmationButton = this.page.locator('//button[@data-test="finish"]');
    this.cartItem = new CartItemComponent(page);
    this.priceSubTotal = this.page.locator('//div[@data-test="subtotal-label"]');
    this.priceTax = this.page.locator('//div[@data-test="tax-label"]');
    this.priceTotal = this.page.locator('//div[@data-test="total-label"]');
  }

  //Navigation
  async gotoCartConfirmationPage() {
    await this.cartConfirmationButton.click();
  }

  //Assertion
  async isCorrectPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  async isCorrectOrderDetails(shoppingCart: ShoppingCart) {
    shoppingCart.products.forEach(async (product) => {
      await this.cartItem.isCorrectProductData(product, false);
    });

    await expect
      .soft(this.priceSubTotal, 'Correct sub-total price')
      .toHaveText(`Item total: $${shoppingCart.subTotalPrice}`);
    await expect
      .soft(this.priceTax, 'Correct tax price')
      .toHaveText(`Tax: $${shoppingCart.taxAmount.toFixed(2)}`);
    await expect
      .soft(this.priceTotal, 'Correct total price')
      .toHaveText(`Total: $${shoppingCart.totalPrice.toFixed(2)}`);
  }
}
