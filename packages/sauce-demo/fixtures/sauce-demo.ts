import { test as base } from '@playwright/test';
import { APIResponse } from '@playwright/test';
import { LoginPage } from '../pom/pages/login.page';
import { HeaderPage } from '../pom/pages/header.page';
import { ProductListingPage } from '../pom/pages/product-listing.page';
import { ProductDetailsPage } from '../pom/pages/product-details.page';
import { CartPage } from '../pom/pages/cart.page';
import { CartCheckoutPage } from '../pom/pages/cart-checkout.page';
import { CartReviewPage } from '../pom/pages/cart-review.page';
import { CartConfirmationPage } from '../pom/pages/cart-confirmation.page';
import AxeBuilder from '@axe-core/playwright';

interface TestFixtures {
  loginPage: LoginPage;
  header: HeaderPage;
  productListingPage: ProductListingPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  cartCheckoutPage: CartCheckoutPage;
  cartReviewPage: CartReviewPage;
  cartConfirmationPage: CartConfirmationPage;
  axeBuilder: AxeBuilder;
}

export const test = base.extend<TestFixtures>({
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
  },
  axeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = await new AxeBuilder({ page }).withTags([
      'wcag2a',
      'wcag2aa',
      'wcag21a',
      'wcag21aa'
    ]);

    await use(makeAxeBuilder);
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
        console.log(
          `JIRA Webhook Response Body: ${JSON.stringify(response.body())}`
        );
      });
  }
});
