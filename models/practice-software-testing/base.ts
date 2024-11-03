import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly isMobile: boolean;

  constructor(page: Page, isMobile: boolean) {
    this.page = page;
    this.isMobile = isMobile;
  }

  async waitForPageToLoad(url: string | RegExp) {
    await this.page.waitForURL(url);
    await this.page.waitForLoadState();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
