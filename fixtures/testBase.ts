import { test as base } from '@playwright/test';
import { APIResponse } from '@playwright/test'
import { LoginPage } from '../models/pages/Login.page';
import { HeaderPage } from '../models/pages/Header.page';
import { ProductListingPage } from '../models/pages/ProductListing.page';
import { ProductDetailsPage } from '../models/pages/ProductDetails.page';
import { CartPage } from '../models/pages/Cart.page';
import { CartCheckoutPage } from '../models/pages/CartCheckout.page';
import { CartReviewPage } from '../models/pages/CartReview.page';
import { CartConfirmationPage } from '../models/pages/CartConfirmation.page';


export type testFixtures = {
    loginPage: LoginPage;
    header: HeaderPage;
    productListingPage: ProductListingPage;
    productDetailsPage: ProductDetailsPage;
    cartPage: CartPage;
    cartCheckoutPage: CartCheckoutPage;
    cartReviewPage: CartReviewPage;
    cartConfirmationPage: CartConfirmationPage;
};

export const test = base.extend<testFixtures>({
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
    if(process.env.CREATE_JIRA_BUG_TICKET==="true"){
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
    }
})

