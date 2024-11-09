import { expect } from '@playwright/test';
import { test } from '../../../fixtures/practice-software-testing';
import { faker } from '@faker-js/faker';
import {
  BuyNowPayLaterOptions,
  CartPage,
  PaymentMethodOptions
} from '../../../models/practice-software-testing/cart-page';

test.beforeEach(async ({ navigation, loginPage }) => {
  await test.step(`login`, async () => {
    await navigation.gotoHomepageviaURL();
    await navigation.header.gotoLogin();
    await loginPage.loginAsCustomer();
    await navigation.header.gotoHomepage();
  });
});

let invoiceNumber: string;

for (const paymentMethod of Object.values(PaymentMethodOptions)) {
  test(
    `checkout shopping cart via ${paymentMethod}`,
    { tag: '@smoke' },
    async ({ navigation, homepage, productDetailsPage, cartPage, page }) => {
      await test.step(`add an item to cart`, async () => {
        await homepage.productListing.gotoProductDetailsPage();
        await productDetailsPage.addItemToCart();
        await expect(productDetailsPage.toastMessage).toBeVisible();
      });

      await test.step(`proceed to checkout`, async () => {
        await navigation.header.gotoCartPage();
        await cartPage.gotoSignInStep();
        await cartPage.gotoBillingAddressStep();
        await cartPage.billingAddressForm.addressField.fill(
          faker.location.streetAddress()
        );
        await cartPage.billingAddressForm.cityField.fill(faker.location.city());
        await cartPage.billingAddressForm.stateField.fill(
          faker.location.state()
        );
        await cartPage.billingAddressForm.countryField.fill(
          faker.location.country()
        );
        await cartPage.billingAddressForm.postodeField.fill(
          faker.number.int({ min: 10000, max: 99999 }).toString()
        );
      });

      await test.step(`select payment option and submit`, async () => {
        await cartPage.gotoPaymentStep();
        await fillPaymentForm(cartPage, paymentMethod);
      });

      await test.step(`confirm the order`, async () => {
        await cartPage.gotoOrderConfirmationPage();
        invoiceNumber = await cartPage.getOrderInvoice();
      });

      await test.step(`should show generated invoice in user's invoice list`, async () => {
        await navigation.header.gotoUserMenu('my-invoices');
        await expect(
          page.getByText(invoiceNumber),
          "Invoice is displayed in user's invoice list"
        ).toBeVisible();
      });
    }
  );
}

async function fillPaymentForm(
  cartPage: CartPage,
  paymentMethod: PaymentMethodOptions
) {
  await cartPage.paymentMethodDropdown.selectOption(paymentMethod);

  if (paymentMethod === PaymentMethodOptions.BANK_TRANSFER) {
    await cartPage.bankTransferForm.bankNameField.fill('Bank XYZ');
    await cartPage.bankTransferForm.accountNameField.fill(
      faker.finance.accountName()
    );
    await cartPage.bankTransferForm.accountNumberField.fill(
      faker.finance.accountNumber()
    );
  }

  if (paymentMethod === PaymentMethodOptions.CREDIT_CARD) {
    await cartPage.creditCardForm.cardNumberField.fill('4242-4242-4242-4242');
    await cartPage.creditCardForm.expirationDateField.fill('12/2999');
    await cartPage.creditCardForm.cvvField.fill('123');
    await cartPage.creditCardForm.cardholderNameField.fill('Tommy Clover');
  }

  if (paymentMethod === PaymentMethodOptions.BUY_NOW_PAY_LATER) {
    await cartPage.buyNowPayLaterForm.installmentDropdown.selectOption(
      BuyNowPayLaterOptions.MONTHS_6
    );
  }

  if (paymentMethod === PaymentMethodOptions.GIFT_CARD) {
    await cartPage.giftCardForm.giftCardNumberField.fill(
      faker.string.alphanumeric({ length: 16 })
    );
    await cartPage.giftCardForm.validationCodeField.fill(
      faker.string.alphanumeric({ length: 8 })
    );
  }
}
