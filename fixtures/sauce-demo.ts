import { test as base } from '@playwright/test';
import { APIResponse } from '@playwright/test';
import { ProductListingPage } from '../models/pages/product-listing.page';
import { ProductDetailsPage } from '../models/pages/product-details.page';
import { CartCheckoutPage } from '../models/pages/cart-checkout.page';
import { CartReviewPage } from '../models/pages/cart-review.page';
import { CartConfirmationPage } from '../models/pages/cart-confirmation.page';
import { LoginPage } from '../models/pages/login.page';
import { HeaderPage } from '../models/pages/header.page';
import { CartPage } from '../models/pages/cart.page';

interface testFixtures {
  loginPage: LoginPage;
  header: HeaderPage;
  productListingPage: ProductListingPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  cartCheckoutPage: CartCheckoutPage;
  cartReviewPage: CartReviewPage;
  cartConfirmationPage: CartConfirmationPage;
}

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
test.afterEach(async ({ request }, testInfo) => {
  if (process.env.CREATE_JIRA_BUG_TICKET === 'true') {
    const JIRA_URL = `${process.env.JIRA_WEBHOOK_URL}`;
    const testFilePath = `${JSON.stringify(testInfo.titlePath[0]).replace(/['"]+/g, '')}`;
    const body = {
      testPath: `${testFilePath}`,
      testId: `${testInfo.testId}`,
      summary: `AUT: ${testFilePath} > ${testInfo.title}`,
      description: `${JSON.stringify(testInfo.errors)}`,
      status: testInfo.status
    };

    await request
      .post(JIRA_URL, {
        headers: { 'Content-Type': 'application/json' },
        data: body
      })
      .then(async (response: APIResponse) => {
        console.log(`JIRA Webhook Response Status: ${response.status()}`);
        console.log(`JIRA Webhook Response Body: ${JSON.stringify(response.body())}`);
      });
  }
});
