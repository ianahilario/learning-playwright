import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class HomePage extends BasePage {
  readonly homepage: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.homepage = this.page.locator('//app-overview');
  }
}
