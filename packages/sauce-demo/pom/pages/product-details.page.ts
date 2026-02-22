import { Page, Locator } from '@playwright/test';
import { CartItemComponent } from '../components/cart-item.component';
import { waitForPageToLoad } from '../../../../commons/page-load';

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

  async goBackToListingPage() {
    await this.backToProductsLink.click();
    await waitForPageToLoad(this.page, /inventory\.html/);
  }
}
