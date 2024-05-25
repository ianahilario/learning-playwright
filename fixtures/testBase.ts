const base = require('@playwright/test');
const { LoginPage } = require('../models/pages/Login.page');
const { HeaderPage } = require('../models/pages/Header.page');
const { ProductListingPage } = require('../models/pages/ProductListing.page');
const { ProductDetailsPage } = require('../models/pages/ProductDetails.page');
const { CartPage } = require('../models/pages/Cart.page');

exports.test = base.test.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    header: async ({ page }, use) => {
        await use(new HeaderPage(page));
    },
    productListingPage: async ({ page }, use) => {
        await use(new ProductListingPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});
exports.expect = base.expect;