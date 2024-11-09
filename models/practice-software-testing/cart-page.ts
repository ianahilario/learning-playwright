import { Page, Locator } from '@playwright/test';
import { BasePage } from './base';

interface BillingAddressForm {
  addressField: Locator;
  cityField: Locator;
  stateField: Locator;
  countryField: Locator;
  postodeField: Locator;
}

interface BankTransferForm {
  bankNameField: Locator;
  accountNameField: Locator;
  accountNumberField: Locator;
}

export class CartPage extends BasePage {
  readonly proceedToCheckoutButton: Locator;
  readonly proceedToBillingButton: Locator;
  readonly proceedToPaymentButton: Locator;
  readonly billingAddressForm: BillingAddressForm;
  readonly paymentMethodDropdown: Locator;
  readonly bankTransferForm: BankTransferForm;
  readonly confirmButton: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.proceedToCheckoutButton = this.page.locator(
      '//*[@data-test="proceed-1"]'
    );
    this.proceedToBillingButton = this.page.locator(
      '//*[@data-test="proceed-2"]'
    );
    this.proceedToPaymentButton = this.page.locator(
      '//*[@data-test="proceed-3"]'
    );
    this.billingAddressForm = {
      addressField: this.page.locator('//*[@data-test="address"]'),
      cityField: this.page.locator('//*[@data-test="city"]'),
      stateField: this.page.locator('//*[@data-test="state"]'),
      countryField: this.page.locator('//*[@data-test="country"]'),
      postodeField: this.page.locator('//*[@data-test="postcode"]')
    };
    this.paymentMethodDropdown = this.page.locator(
      '//*[@data-test="payment-method"]'
    );
    this.bankTransferForm = {
      bankNameField: this.page.locator('//*[@data-test="bank_name"]'),
      accountNameField: this.page.locator('//*[@data-test="account_name"]'),
      accountNumberField: this.page.locator('//*[@data-test="account_number"]')
    };
    this.confirmButton = this.page.locator('//*[@data-test="finish"]');
  }

  async gotoSignInStep() {
    await this.proceedToCheckoutButton.click();
    await this.page
      .locator(
        '//*[contains(@class,"steps-indicator")]//li[contains(@class, "current")]'
      )
      .getByText('Sign in')
      .waitFor({ timeout: 5_000 });
  }

  async gotoBillingAddressStep() {
    await this.page.waitForTimeout(1_000);
    await this.proceedToBillingButton.click();
    await this.page
      .locator(
        '//*[contains(@class,"steps-indicator")]//li[contains(@class, "current")]'
      )
      .getByText('Billing Address')
      .waitFor({ timeout: 5_000 });
  }

  async gotoPaymentStep() {
    await this.page.waitForTimeout(1_000);
    await this.proceedToPaymentButton.click();
    await this.page
      .locator(
        '//*[contains(@class,"steps-indicator")]//li[contains(@class, "current")]'
      )
      .getByText('Payment')
      .waitFor({ timeout: 5_000 });
  }

  async selectPaymentMethod(
    paymentMethod:
      | 'bank-transfer'
      | 'cash-on-delivery'
      | 'credit-card'
      | 'buy-now-pay-later'
      | 'gift-card'
  ) {
    await this.paymentMethodDropdown.selectOption(paymentMethod);
  }

  async gotoOrderConfirmationPage() {
    await this.confirmButton.click();
    await this.page
      .getByText('Payment was successful')
      .waitFor({ timeout: 5_000 });
    await this.confirmButton.click();
    await this.page.waitForTimeout(1_000);
    await this.page
      .locator('//*[@id="order-confirmation"]')
      .waitFor({ timeout: 10_000 });
  }

  async getOrderInvoice() {
    const invoiceNumber = (await this.page
      .locator('//*[@id="order-confirmation"]/span')
      .textContent()) as string;
    return invoiceNumber;
  }
}
