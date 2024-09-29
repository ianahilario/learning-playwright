import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testBase';

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
