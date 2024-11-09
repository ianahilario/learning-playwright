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

interface CreditCardForm {
  cardNumberField: Locator;
  expirationDateField: Locator;
  cvvField: Locator;
  cardholderNameField: Locator;
}

interface BuyNowPayLaterForm {
  installmentDropdown: Locator;
}

interface GiftCardForm {
  giftCardNumberField: Locator;
  validationCodeField: Locator;
}

export enum PaymentMethodOptions {
  BANK_TRANSFER = 'bank-transfer',
  CASH_ON_DELIVERY = 'cash-on-delivery',
  CREDIT_CARD = 'credit-card',
  BUY_NOW_PAY_LATER = 'buy-now-pay-later',
  GIFT_CARD = 'gift-card'
}

export enum BuyNowPayLaterOptions {
  MONTHS_3 = '3',
  MONTHS_6 = '6',
  MONTHS_9 = '9',
  MONTHS_12 = '12'
}

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly proceedToBillingButton: Locator;
  readonly proceedToPaymentButton: Locator;
  readonly billingAddressForm: BillingAddressForm;
  readonly paymentMethodDropdown: Locator;
  readonly bankTransferForm: BankTransferForm;
  readonly creditCardForm: CreditCardForm;
  readonly buyNowPayLaterForm: BuyNowPayLaterForm;
  readonly giftCardForm: GiftCardForm;
  readonly confirmButton: Locator;

  constructor(page: Page, isMobile: boolean) {
    super(page, isMobile);
    this.cartItems = this.page.locator('//tbody');
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
    this.creditCardForm = {
      cardNumberField: this.page.locator(
        '//*[@data-test="credit_card_number"]'
      ),
      expirationDateField: this.page.locator(
        '//*[@data-test="expiration_date"]'
      ),
      cvvField: this.page.locator('//*[@data-test="cvv"]'),
      cardholderNameField: this.page.locator(
        '//*[@data-test="card_holder_name"]'
      )
    };
    this.buyNowPayLaterForm = {
      installmentDropdown: this.page.locator(
        '//*[@data-test="monthly_installments"]'
      )
    };
    this.giftCardForm = {
      giftCardNumberField: this.page.locator(
        '//*[@data-test="gift_card_number"]'
      ),
      validationCodeField: this.page.locator(
        '//*[@data-test="validation_code"]'
      )
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
