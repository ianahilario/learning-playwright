import { expect } from '@playwright/test';
import { test } from '../../fixtures/testBase';
import { TAG_P1 } from '../../utils/testTagManager';

test('should show errror when login fails', async ({ page, loginPage }) => {
  await test.step(`go to homepage`, async () => {
    await loginPage.goToLoginPage();
  });

  await test.step(`submit login credentials`, async () => {
    await loginPage.submitLogin(
      `${process.env.USER_LOCKED_USERNAME}`,
      `${process.env.USER_LOCKED_PASSWORD}`
    );
  });

  await test.step(`verify that an error is displayed in the page`, async () => {
    await expect(page, 'User is still in the login page').toHaveURL(
      'https://www.saucedemo.com/'
    );
    await expect(page.locator('//h3[@data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});

test(
  'should login successfully',
  { tag: TAG_P1 },
  async ({ loginPage, productListingPage }) => {
    await test.step(`go to homepage`, async () => {
      await loginPage.goToLoginPage();
    });

    await test.step(`submit login credentials`, async () => {
      await loginPage.submitLogin(
        `${process.env.USER_STANDARD_USERNAME}`,
        `${process.env.USER_STANDARD_PASSWORD}`
      );
    });

    await test.step(`verify that user is able to login successfully`, async () => {
      await productListingPage.isCorrectPage();
    });
  }
);
