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
  readonly brandLogo: Locator;
  readonly homeLink: Locator;
  readonly categoriesMenu: Locator;
  readonly contactLink: Locator;
  readonly signInLink: Locator;
  readonly languageSelector: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.header = this.page.locator('//app-header');
    this.brandLogo = this.header.locator('//*[@class="navbar-brand"]');
    this.homeLink = this.header.locator('//*[@data-test="nav-home"]');
    this.categoriesMenu = this.header.locator('//*[@data-test="nav-categories"]');
    this.contactLink = this.header.locator('//*[@data-test="nav-contact"]');
    this.signInLink = this.header.locator('//*[@data-test="nav-sign-in"]');
    this.languageSelector = this.header.locator('//*[@id="language"]');
  }

  async gotoLogin() {
    await this.signInLink.click();
  }
}
