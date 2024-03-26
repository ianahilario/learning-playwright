import { test, expect } from '@playwright/test';

test('able to login successfully', async ({ page }) => {
    await test.step(`go to homepage`, async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step(`verify that user is able to login successfully`, async () => {
        await page.locator('//input[@data-test="username"]').fill("standard_user");
        await page.locator('//input[@data-test="password"]').fill("secret_sauce");
        await page.locator('//input[@data-test="login-button"]').click();
        
        await expect(page, "User is in the homepage").toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

test('able to show errror when login fails', async ({ page }) => {
    await test.step(`go to homepage`, async () => {
        await page.goto('https://www.saucedemo.com/');
    });

    await test.step(`verify that an error is displayed in the page`, async () => {
        await page.locator('//input[@data-test="username"]').fill("locked_out_user");
        await page.locator('//input[@data-test="password"]').fill("secret_sauce");
        await page.locator('//input[@data-test="login-button"]').click();
        
        await expect(page, "User is still in the login page").toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('//h3[@data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});