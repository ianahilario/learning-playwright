import { expect } from '@playwright/test';
const { test } = require('../../../fixtures/testBase');


test('should checkout the cart item successfully', {tag: '@p1'},  async ({page, loginPage, header, productListingPage, cartPage, cartCheckoutPage, cartReviewPage, cartConfirmationPage }) => {
    let productItem1;
    let productItem2;

    await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
        await loginPage.submitLogin(process.env.USER_STANDARD_USERNAME, process.env.USER_STANDARD_PASSWORD);
        await productListingPage.isCorrectPage();
    });
    
    await test.step(`add item to cart`, async () => {

        productItem1 = await productListingPage.getProductData();
        productItem2 = await productListingPage.getProductData(1);

        await productListingPage.cartItem.addItemToCartbyIndex();
        await productListingPage.cartItem.addItemToCartbyIndex(1);
        await header.isCorrectShoppingCartBadge(2);
    });

    await test.step(`go to Cart page`, async () => {
        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();
    });

    await test.step(`added products are displayed in cart`, async () => {
        await cartPage.cartItem.isCorrectProductData(productItem1, true, false);
        await cartPage.cartItem.isCorrectProductData(productItem2, true, false);
    });

    await test.step(`go to Cart - Checkout page`, async () => {
        await cartPage.gotoCartCheckoutPage();
        await cartCheckoutPage.isCorrectPage();
    });

    await test.step(`fill up Checkout form`, async () => {
        await cartCheckoutPage.fillCheckoutForm();
    });

    await test.step(`go to Cart - Review page`, async () => {
        await cartCheckoutPage.gotoCartReviewPage();
        await cartReviewPage.isCorrectPage();
    });

    await test.step(`go to Cart - Confirmation page`, async () => {
        await cartReviewPage.gotoCartConfirmationPage();
        await cartConfirmationPage.isCorrectPage();
    });

    await test.step(`go to back to homepage`, async () => {
        await cartConfirmationPage.gotoHomepage();
        await productListingPage.isCorrectPage();
    });
    

    //Proceed to shopping cart
        //save cart item info
        //get expected total price

    //Shopping cart details

    //Shopping cart review

    //Shopping cart complete

    //Cart is cleared

});

