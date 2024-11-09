import { expect } from '@playwright/test';
import { test } from '../../fixtures/practice-software-testing';

test('should show non-logged in state', async ({ navigation, homepage }) => {
  await test.step(`go to homepage`, async () => {
    await navigation.gotoHomepageviaURL();
  });

  await test.step(`should show homepage`, async () => {
    await expect(homepage.homepage, 'Homepage is displayed').toBeVisible();
  });

  await test.step(`should show 'Sign in' link in the header'`, async () => {
    await expect(navigation.header.signInLink, 'Sign in link is displayed').toHaveText('Sign in');
  });
});

test.describe('login as Admin', () => {
  test('should login as Admin', { tag: '@smoke' }, async ({ navigation, loginPage, page }) => {
    await test.step(`login as Admin`, async () => {
      await navigation.gotoHomepageviaURL();
      await navigation.header.gotoLogin();
    });

    await test.step(`should show Admin page`, async () => {
      await loginPage.loginAsAdmin();
      await expect(page, 'User is logged in as Admin').toHaveURL(/\/admin\/dashboard/);
      await expect(navigation.header.signInLink, 'should not show Sign in link').toBeHidden();
      await expect(navigation.header.userMenu, 'should show user menu').toBeVisible();
      await expect(navigation.header.userMenu, 'should show user name in user menu').toHaveText(
        `${process.env.USER_ADMIN_FIRST_NAME} ${process.env.USER_ADMIN_LAST_NAME}`
      );
    });
  });
});

test.describe('login as Customer', () => {
  test('should login as Customer', { tag: '@smoke' }, async ({ navigation, loginPage, page }) => {
    await test.step(`login as Customer`, async () => {
      await navigation.gotoHomepageviaURL();
      await navigation.header.gotoLogin();
    });

    await test.step(`should show Admin page`, async () => {
      await loginPage.loginAsCustomer();
      await expect(page, 'User is logged in as Admin').toHaveURL(/\/account/);
      await expect(navigation.header.signInLink, 'should not show Sign in link').toBeHidden();
      await expect(navigation.header.userMenu, 'should show user menu').toBeVisible();
      await expect(navigation.header.userMenu, 'should show user name in user menu').toHaveText(
        `${process.env.USER_CUSTOMER_FIRST_NAME} ${process.env.USER_CUSTOMER_LAST_NAME}`
      );
    });
  });
});
