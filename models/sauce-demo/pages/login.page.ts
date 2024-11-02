import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = this.page.locator('//input[@data-test="username"]');
    this.passwordField = this.page.locator('//input[@data-test="password"]');
    this.loginButton = this.page.locator('//input[@data-test="login-button"]');
  }

  async goToLoginPage() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async submitLogin(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/inventory/);
  }
}
