import { test, expect } from '@playwright/test';

test('able to login successfully', async ({ page }) => {
    await test.step(`go to homepage`, async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step(`able to login successfully`, async () => {
        await page.locator('//input[@data-test="username"]').fill("standard_user");
        await page.locator('//input[@data-test="password"]').fill("secret_sauce");
        await page.locator('//input[@data-test="login-button"]').click();
        
        await expect(page, "User is in the homepage").toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});