import { expect } from '@playwright/test';
import { test } from '../../../fixtures/sauce-demo';

test(
  'visual testing',
  { tag: '@visual' },
  async ({
    page,
    loginPage,
    header,
    productListingPage,
    productDetailsPage,
    cartPage,
    cartCheckoutPage,
    cartReviewPage,
    cartConfirmationPage
  }) => {
    test.slow();
    await test.step(`login page`, async () => {
      await loginPage.goToLoginPage();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction('window.scrollY === 0');
      await expect.soft(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2 });
      await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
    });

    await test.step(`product listing page`, async () => {
      await productListingPage.isCorrectPage();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction('window.scrollY === 0');
      await expect.soft(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2 });
    });

    await test.step(`product details page`, async () => {
      await productListingPage.goToDetailsPage();
      await productDetailsPage.isCorrectPage();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction('window.scrollY === 0');
      await expect.soft(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2 });
      await productDetailsPage.cartItem.addItemToCartbyIndex();
    });

    await test.step(`cart page`, async () => {
      await header.goToShoppingCartPage();
      await cartPage.isCorrectPage();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction('window.scrollY === 0');
      await expect.soft(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2 });
    });

    await test.step(`cart checkout page`, async () => {
      await cartPage.gotoCartCheckoutPage();
      await cartCheckoutPage.isCorrectPage();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction('window.scrollY === 0');
      await expect.soft(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2 });
      await cartCheckoutPage.fillCheckoutForm();
    });

    await test.step(`cart review page`, async () => {
      await cartCheckoutPage.gotoCartReviewPage();
      await cartReviewPage.isCorrectPage();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction('window.scrollY === 0');
      await expect.soft(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.2 });
    });

    await test.step(`confirmation page`, async () => {
      await cartReviewPage.gotoCartConfirmationPage();
      await cartConfirmationPage.isCorrectPage();
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForFunction('window.scrollY === 0');
      await expect.soft(page).toHaveScreenshot({ fullPage: false, maxDiffPixelRatio: 0.2 });
    });
  }
);
