const { test } = require('../../../fixtures/testBase');

test('should persist cart item when user logs out', {tag: '@p1'},  async ({page, loginPage, header, productListingPage, cartPage }) => {
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
        await cartPage.cartItem.isCorrectProductData(productItem1, false, true);
        await cartPage.cartItem.isCorrectProductData(productItem2, false, true);
    });

    await test.step(`log out then log in again`, async () => {
        await header.goToLogout();

        await loginPage.submitLogin(process.env.USER_STANDARD_USERNAME, process.env.USER_STANDARD_PASSWORD);
        await productListingPage.isCorrectPage();
    });

    await test.step(`cart items are retained`, async () => {
        await header.isCorrectShoppingCartBadge(2);

        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();

        await cartPage.cartItem.isCorrectProductData(productItem1, false, true);
        await cartPage.cartItem.isCorrectProductData(productItem2, false, true);
    });
});