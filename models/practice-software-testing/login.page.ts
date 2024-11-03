import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

export class LoginPage extends BasePage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.emailField = this.page.locator('//*[@data-test="email"]');
    this.passwordField = this.page.locator('//*[@data-test="password"]');
    this.loginButton = this.page.locator('//*[@data-test="login-submit"]');
  }

  async loginAsCustomer(
    email: string = process.env.USER_CUSTOMER_EMAIL as string,
    password: string = process.env.USER_CUSTOMER_PASSWORD as string
  ) {
    await this.submitLogin(email, password);
    await this.waitForPageToLoad(/\/account/);
  }

  async loginAsAdmin(
    email: string = process.env.USER_ADMIN_EMAIL as string,
    password: string = process.env.USER_ADMIN_PASSWORD as string
  ) {
    await this.submitLogin(email, password);
    await this.waitForPageToLoad(/\/admin\/dashboard/);
  }

  private async submitLogin(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
