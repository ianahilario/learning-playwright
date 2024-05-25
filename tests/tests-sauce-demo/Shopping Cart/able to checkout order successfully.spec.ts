import { expect } from '@playwright/test';
const { test } = require('../../../fixtures/testBase');


test('should checkout the cart item successfully', {tag: '@p1'},  async ({page, loginPage, productListingPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.submitLogin(process.env.USER_STANDARD_USERNAME, process.env.USER_STANDARD_PASSWORD);
    await productListingPage.isCorrectPage();

    //Add to cart if there's no existing cart item

    //Proceed to shopping cart
        //save cart item info
        //get expected total price

    //Shopping cart details

    //Shopping cart review

    //Shopping cart complete

    //Cart is cleared

});

