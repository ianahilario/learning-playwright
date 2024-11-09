import { expect } from '@playwright/test';
import { test } from '../../../fixtures/practice-software-testing';
import { faker } from '@faker-js/faker';
import { PaymentMethodOptions } from '../../../models/practice-software-testing/cart-page';

test.beforeEach(async ({ navigation, loginPage }) => {
  await test.step(`login`, async () => {
    await navigation.gotoHomepageviaURL();
    await navigation.header.gotoLogin();
    await loginPage.loginAsCustomer();
    await navigation.header.gotoHomepage();
  });
});

let cartQuantity = 0;
test(
  `should clear cart after checkout`,
  { tag: '@smoke' },
  async ({ navigation, homepage, productDetailsPage, cartPage, page }) => {
    await test.step(`should have an empty cart item`, async () => {
      expect(
        await navigation.header.getCartQuantity(),
        'Cart quantity indicator is not displayed'
      ).toBe(cartQuantity);
    });

    await test.step(`add an item to cart`, async () => {
      await homepage.productListing.gotoProductDetailsPage();
      await productDetailsPage.addItemToCart();
      await expect(productDetailsPage.toastMessage).toBeVisible();
      await expect
        .soft(productDetailsPage.toastMessage)
        .toHaveText('Product added to shopping cart.');
      cartQuantity++;
      expect(
        await navigation.header.getCartQuantity(),
        `Cart quantity is ${cartQuantity}`
      ).toBe(cartQuantity);
    });

    await test.step(`proceed to checkout`, async () => {
      await navigation.header.gotoCartPage();
      await cartPage.gotoSignInStep();
      await cartPage.gotoBillingAddressStep();
      await cartPage.billingAddressForm.addressField.fill(
        faker.location.streetAddress()
      );
      await cartPage.billingAddressForm.cityField.fill(faker.location.city());
      await cartPage.billingAddressForm.stateField.fill(faker.location.state());
      await cartPage.billingAddressForm.countryField.fill(
        faker.location.country()
      );
      await cartPage.billingAddressForm.postodeField.fill(
        faker.number.int({ min: 10000, max: 99999 }).toString()
      );
    });

    await test.step(`select payment option and submit`, async () => {
      await cartPage.gotoPaymentStep();
      await cartPage.paymentMethodDropdown.selectOption(
        PaymentMethodOptions.CASH_ON_DELIVERY
      );
    });

    await test.step(`confirm the order`, async () => {
      await cartPage.gotoOrderConfirmationPage();
      cartQuantity--;
    });

    await test.step(`should clear the cart`, async () => {
      await expect(
        navigation.header.cartLink,
        'Cart link is not displayed'
      ).not.toBeVisible();
    });
  }
);
