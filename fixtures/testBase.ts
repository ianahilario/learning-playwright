const base = require('@playwright/test');
const { LoginPage } = require('../pages/Login.page.ts');
const { ProductListingPage } = require('../pages/ProductListing.page.ts');
const { ProductDetailsPage } = require('../pages/ProductDetails.page.ts');

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productListingPage: async ({ page }, use) => {
        await use(new ProductListingPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    }
});
exports.expect = base.expect;