import { expect } from '@playwright/test';
import { test } from '../fixtures/sauce-demo';
import { Tags, Teams, TestTags } from '../../../commons/test-tags';
import { HOMEPAGE_URL } from '../constants/app';
import { UserTestData } from '../test-data/users';

test('should show errror when login fails', async ({ page, loginPage }) => {
  const user = UserTestData.LOCKED_USER;
  await test.step(`go to homepage`, async () => {
    await loginPage.goToLoginPage();
  });

  await test.step(`submit login credentials`, async () => {
    await loginPage.submitLogin(user.username, user.password);
  });

  await test.step(`verify that an error is displayed in the page`, async () => {
    await expect(page, 'User is still in the login page').toHaveURL(
      HOMEPAGE_URL
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
      await loginPage.submitLogin();
    });

    await test.step(`verify that user is able to login successfully`, async () => {
      await expect(page).toHaveURL(`${HOMEPAGE_URL}/inventory.html`);
      await expect.soft(page).toHaveTitle('Swag Labs');
      await expect.soft(productListingPage.pageTitle).toHaveText('Products');
    });
  }
);
