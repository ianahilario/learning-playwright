import { expect } from '@playwright/test';
import { test } from '../../fixtures/practice-software-testing';

test('should should show non-logged in state', async ({ navigation, homepage }) => {
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
  test('should should show non-logged in state', async ({ navigation, loginPage, page }) => {
    await test.step(`login as admin`, async () => {
      await navigation.gotoHomepageviaURL();
      await navigation.header.gotoLogin();
    });

    await test.step(`should show Admin page`, async () => {
      await loginPage.loginAsAdmin();
      await expect(page, 'User is logged in as Admin').toHaveURL(/\/admin\/dashboard/);
    });
  });
});
