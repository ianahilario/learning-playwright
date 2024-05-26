const base = require('@playwright/test');
import { APIResponse, request, test } from '@playwright/test'
const { LoginPage } = require('../models/pages/Login.page');
const { HeaderPage } = require('../models/pages/Header.page');
const { ProductListingPage } = require('../models/pages/ProductListing.page');
const { ProductDetailsPage } = require('../models/pages/ProductDetails.page');
const { CartPage } = require('../models/pages/Cart.page');
const { CartCheckoutPage } = require('../models/pages/CartCheckout.page');
const { CartReviewPage } = require('../models/pages/CartReview.page');
const { CartConfirmationPage } = require('../models/pages/CartConfirmation.page');

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
    },
    cartCheckoutPage: async ({ page }, use) => {
        await use(new CartCheckoutPage(page));
    },
    cartReviewPage: async ({ page }, use) => {
        await use(new CartReviewPage(page));
    },
    cartConfirmationPage: async ({ page }, use) => {
        await use(new CartConfirmationPage(page));
    }
});

//Hooks
test.afterEach(async ({request}, testInfo,) => {

    const JIRA_URL = `${process.env.JIRA_WEBHOOK_URL}`;
    const testFilePath = `${JSON.stringify(testInfo.titlePath[0]).replace(/['"]+/g, '')}`;
    const body = {
        testPath: `${testFilePath}`,
        testId: `${testInfo.testId}`,
        summary: `AUT: ${testFilePath} > ${testInfo.title}`,
        description: `${JSON.stringify(testInfo.errors)}`,
        status: testInfo.status
    }

    const apiRequest = await request.post(JIRA_URL, {
        headers: { 'Content-Type': 'application/json' },
        data: body
    }).then(async (response: APIResponse) => {
        console.log(`JIRA Webhook Response Status: ${await response.status()}`);
        console.log(`JIRA Webhook Response Body: ${await JSON.stringify(response.body())}`);
    }); 
})

