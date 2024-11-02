import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly isMobile: boolean;

  constructor(page: Page, isMobile: boolean) {
    this.page = page;
    this.isMobile = isMobile;
  }
}
