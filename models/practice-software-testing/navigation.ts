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
  readonly userMenu: Locator;
  readonly cartLink: Locator;
  readonly cartQuantity: Locator;
  readonly languageSelector: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.header = this.page.locator('//app-header');
    this.brandLogo = this.header.locator('//*[@class="navbar-brand"]');
    this.homeLink = this.header.locator('//*[@data-test="nav-home"]');
    this.categoriesMenu = this.header.locator(
      '//*[@data-test="nav-categories"]'
    );
    this.contactLink = this.header.locator('//*[@data-test="nav-contact"]');
    this.signInLink = this.header.locator('//*[@data-test="nav-sign-in"]');
    this.userMenu = this.header.locator('//*[@data-test="nav-menu"]');
    this.cartLink = this.header.locator('//*[@data-test="nav-cart"]');
    this.cartQuantity = this.header.locator('//*[@data-test="cart-quantity"]');
    this.languageSelector = this.header.locator('//*[@id="language"]');
  }

  async gotoLogin() {
    await this.signInLink.click();
    await this.waitForPageToLoad(/\/auth\/login/);
  }

  async gotoHomepage() {
    await this.brandLogo.click();
    await this.waitForPageToLoad(process.env.BASE_URL as string);
  }

  async gotoUserMenu(
    menuOption:
      | 'my-account'
      | 'my-favorites'
      | 'my-profile'
      | 'my-invoices'
      | 'my-messages'
      | 'sign-out'
  ) {
    await this.userMenu.click();
    await this.page.locator(`//*[@data-test="nav-${menuOption}"]`).click();

    switch (menuOption) {
      case 'my-account':
        await this.waitForPageToLoad(/\/account$/);
        break;
      case 'my-favorites':
        await this.waitForPageToLoad(/\/account\/favorites$/);
        break;
      case 'my-profile':
        await this.waitForPageToLoad(/\/account\/profile$/);
        break;
      case 'my-invoices':
        await this.waitForPageToLoad(/\/account\/invoices$/);
        break;
      case 'my-messages':
        await this.waitForPageToLoad(/\/account\/messages$/);
        break;
      case 'sign-out':
        await this.waitForPageToLoad(/\/account\/auth\/login$/);
        break;
      default:
        break;
    }
  }

  async gotoCartPage() {
    await this.cartLink.click();
    await this.waitForPageToLoad(/\/checkout/);
  }

  async getCartQuantity(): Promise<number> {
    let cartQuantity = 0;
    if (await this.cartQuantity.isVisible()) {
      cartQuantity = parseInt(
        (await this.cartQuantity.textContent()) as string
      );
    }

    return cartQuantity;
  }
}
