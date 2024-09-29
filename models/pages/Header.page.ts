import { Page, Locator, expect } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly burgerMenuButton: Locator;
  readonly burgerMenu: Locator;
  readonly shoppingCartIcon: Locator;
  readonly shoppingCartBadge: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartIcon = this.page.locator(
      '//a[@data-test="shopping-cart-link"]'
    );
    this.shoppingCartBadge = this.page.locator(
      '//span[@data-test="shopping-cart-badge"]'
    );
    this.burgerMenuButton = this.page.locator(
      '//button[@id="react-burger-menu-btn"]'
    );
    this.burgerMenu = this.page.locator('//div[@class="bm-menu"]');
  }

  //Navigation
  async goToShoppingCartPage() {
    await this.shoppingCartIcon.click();
  }

  async goToLogout() {
    await this.gotoBurgerMenuLinks('Logout');
  }

  private async gotoBurgerMenuLinks(linkText: string) {
    await this.burgerMenuButton.click();
    await this.burgerMenu.locator(`//a[text()="${linkText}"]`).click();
  }

  //Assertion
  async isCorrectShoppingCartBadge(expectedCartQuantity: number) {
    if (expectedCartQuantity === 0) {
      await expect(
        this.shoppingCartBadge,
        'Shopping cart badge is not displayed when qty=0'
      ).not.toBeVisible();
    } else {
      await expect(
        this.shoppingCartBadge,
        'Shopping cart badge is displayed'
      ).toBeVisible();
      await expect(
        this.shoppingCartBadge,
        'Shopping cart badge shows correct quantity'
      ).toHaveText(`${expectedCartQuantity}`);
    }
  }

  //Getter
  async getShoppingCartBadgeQty() {
    let shoppingCartQty = 0;

    (await this.shoppingCartBadge.isVisible())
      ? (shoppingCartQty = Number(this.shoppingCartBadge.textContent()))
      : (shoppingCartQty = 0);

    return shoppingCartQty;
  }
}
