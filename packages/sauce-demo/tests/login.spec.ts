import { expect } from '@playwright/test';
import { test } from '../fixtures/sauce-demo';
import { Tags, Teams, TestTags } from '../../../commons/test-tags';

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
  { tag: TestTags.setTestTags({ team: Teams.TEAM_NAME, tags: [Tags.SMOKE] }) },
  async ({ loginPage, productListingPage, page }) => {
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
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect.soft(page).toHaveTitle('Swag Labs');
      await expect.soft(productListingPage.pageTitle).toHaveText('Products');
    });
  }
);
