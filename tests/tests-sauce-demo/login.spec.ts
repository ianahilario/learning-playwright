import { expect } from '@playwright/test';
const { test } = require('../../fixtures/testBase');

test('should login successfully', {tag: '@p1'}, async ({page, loginPage }) => {
    await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
    });

    await test.step(`submit login credentials`, async () => {
        await loginPage.submitLogin("standard_user", "secret_sauce");
    });

    await test.step(`verify that user is able to login successfully`, async () => {
        await expect(page, "User is in the homepage").toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

test('should show errror when login fails', async ({page, loginPage }) => {
    await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
    });

    await test.step(`submit login credentials`, async () => {
        await loginPage.submitLogin("locked_out_user", "secret_sauce");
    });

    await test.step(`verify that an error is displayed in the page`, async () => {
        await expect(page, "User is still in the login page").toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('//h3[@data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});