import { expect } from '@playwright/test';
import { test } from '../../../fixtures/testBase';


test('visual testing', {tag: '@visual'},  async ({page, loginPage, header, productListingPage, productDetailsPage, cartPage, cartCheckoutPage, cartReviewPage, cartConfirmationPage }) => {
    await test.step(`login page`, async () => {
        await loginPage.goToLoginPage();
        await expect.soft(page).toHaveScreenshot({fullPage : true});
        await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
    });

    await test.step(`product listing page`, async () => {
        await productListingPage.isCorrectPage();
        await expect.soft(page).toHaveScreenshot({fullPage : true});
    });

    await test.step(`product details page`, async () => {
        await productListingPage.goToDetailsPage();
        await productDetailsPage.isCorrectPage();
        await expect.soft(page).toHaveScreenshot({fullPage : true});
        await productDetailsPage.cartItem.addItemToCartbyIndex();
    });
    
    await test.step(`cart page`, async () => {
        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();
        await expect.soft(page).toHaveScreenshot({fullPage : true});
    });

    await test.step(`cart checkout page`, async () => {
        await cartPage.gotoCartCheckoutPage();
        await cartCheckoutPage.isCorrectPage();
        await expect.soft(page).toHaveScreenshot({fullPage : true});
        await cartCheckoutPage.fillCheckoutForm();
    });

    await test.step(`cart review page`, async () => {
        await cartCheckoutPage.gotoCartReviewPage();
        await cartReviewPage.isCorrectPage();
        await expect.soft(page).toHaveScreenshot({fullPage : true});
    });

    await test.step(`confirmation page`, async () => {
        await cartReviewPage.gotoCartConfirmationPage();
        await cartConfirmationPage.isCorrectPage();
        await expect.soft(page).toHaveScreenshot({fullPage : false});
    });
});

