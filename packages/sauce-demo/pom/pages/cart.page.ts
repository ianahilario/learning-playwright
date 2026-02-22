import { Page, Locator, expect } from '@playwright/test';
import { CartItemComponent } from '../components/cart-item.component';
import { Product, ShoppingCart } from '../../interfaces/data-objects';
import { TAX_PERCENTAGE } from '../../constants/pricing';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItem: CartItemComponent;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.locator('//span[@data-test="title"]');
    this.checkoutButton = this.page.locator('//button[@data-test="checkout"]');
    this.continueShoppingButton = this.page.locator(
      '//button[@data-test="continue-shopping"]'
    );
    this.cartItem = new CartItemComponent(page);
  }

  //Navigation
  async gotoCartCheckoutPage() {
    await this.checkoutButton.click();
  }

  async gotoContinueShopping() {
    await this.continueShoppingButton.click();
  }

  //Assertion
  async isCorrectPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async isCartEmpty() {
    await expect(this.cartItem.cartItem, 'Cart is empty').toHaveCount(0);
  }

  //Getter
  async getShoppingCartData(products: Product[]): Promise<ShoppingCart> {
    let computedSubTotalPrice = 0;
    let shoppingCartData: ShoppingCart;

    shoppingCartData = {
      products: products,
      subTotalPrice: 0,
      taxAmount: 0,
      totalPrice: 0
    };

    products.forEach((product) => {
      const price = Number(
        String(product.price).replace('$', '').replace(',', '')
      );
      computedSubTotalPrice = computedSubTotalPrice + price;

      shoppingCartData.subTotalPrice = computedSubTotalPrice;
    });

    const computedTaxAmount = computedSubTotalPrice * TAX_PERCENTAGE;
    const computedTotalPrice = computedSubTotalPrice + computedTaxAmount;

    shoppingCartData = {
      products: products,
      subTotalPrice: computedSubTotalPrice,
      taxAmount: computedTaxAmount,
      totalPrice: computedTotalPrice
    };

    return shoppingCartData;
  }
}
