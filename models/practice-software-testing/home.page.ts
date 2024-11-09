import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base';

export class HomePage extends BasePage {
  readonly homepage: Locator;
  readonly productListing: ProductListing;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.homepage = this.page.locator('//app-overview');
    this.productListing = new ProductListing(page, isMobile);
  }
}

class ProductListing extends BasePage {
  readonly productTiles: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.productTiles = this.page.locator('//*[contains(@data-test,"product-") and @class="card"]');
  }

  async gotoProductDetailsPage() {
    await this.waitForProductListingToLoad();
    await this.productTiles.first().click();
    await this.waitForPageToLoad(/\/product/);
  }

  async gotoProductDetailsPageByProductName(productName: string) {
    await this.waitForProductListingToLoad();
    await this.productTiles.filter({ hasText: productName }).click();
    await this.waitForPageToLoad(/\/product/);
  }

  private async waitForProductListingToLoad() {
    const loadingSkeleton: Locator = this.page.locator('//*[@class="card skeleton"]');
    await expect(loadingSkeleton, 'Waiting for loading skeleton to disappear...').toHaveCount(0, { timeout: 10_000 });
  }
}
