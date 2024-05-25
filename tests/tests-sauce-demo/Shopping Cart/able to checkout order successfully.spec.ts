import { expect } from '@playwright/test';
const { test } = require('../../../fixtures/testBase');


test('should checkout the cart item successfully', {tag: '@p1'},  async ({page, loginPage, header, productListingPage, cartPage }) => {
    let shoppingCartQty;
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

    

    //Proceed to shopping cart
        //save cart item info
        //get expected total price

    //Shopping cart details

    //Shopping cart review

    //Shopping cart complete

    //Cart is cleared

});

