import { expect } from '@playwright/test';
import { test } from '../../fixtures/practice-software-testing';

test('should show errror when login fails', async ({ page, navigation, homepage }) => {
  await test.step(`go to homepage`, async () => {
    await navigation.gotoHomepageviaURL();
  });

  await test.step(`verify that homepage is displayed`, async () => {
    await expect(homepage.homepage, 'Homepage is displayed').toBeVisible();
  });
});
