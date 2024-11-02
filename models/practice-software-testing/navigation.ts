import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class Navigation extends BasePage {
  readonly header: Header;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.header = new Header(page, isMobile);
  }

  async gotoHomepageviaURL() {
    await this.page.goto(process.env.BASE_URL as string);
  }
}

class Header extends BasePage {
  readonly header: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.header = this.page.locator('//app-header');
  }
}
