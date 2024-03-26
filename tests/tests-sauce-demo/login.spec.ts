import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('able to login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
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

test('able to show errror when login fails', async ({ page }) => {
    const loginPage = new LoginPage(page);
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