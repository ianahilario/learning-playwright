import { Product } from '../interfaces/data-objects';
import { test } from '../fixtures/sauce-demo';
import { expect } from 'playwright/test';
import { Tags, Teams, TestTags } from '../../../commons/test-tags';

test(
  'should show same product details in Listing and Details',
  { tag: TestTags.setTestTags({ team: Teams.TEAM_NAME, tags: [Tags.SMOKE] }) },
  async ({ loginPage, productListingPage, productDetailsPage }) => {
    let product: Product;

    await test.step(`go to homepage`, async () => {
      await loginPage.goToLoginPage();
      await loginPage.submitLogin(
        `${process.env.USER_USERNAME}`,
        `${process.env.USER_PASSWORD}`
      );
    });

    await test.step(`take note of product details`, async () => {
      product = await productListingPage.getProductData();
    });

    await test.step(`same details are displayed in Listing and Details page`, async () => {
      await productListingPage.goToDetailsPage();
      await productDetailsPage.isCorrectPage();
      await productDetailsPage.cartItem.isCorrectProductData(
        product,
        true,
        false
      );
    });
  }
);

test('should be able to go back to Listing page via "Back to products" link"', async ({
  loginPage,
  productListingPage,
  productDetailsPage,
  page
}) => {
  await test.step(`go to homepage`, async () => {
    await loginPage.goToLoginPage();
    await loginPage.submitLogin(
      `${process.env.USER_USERNAME}`,
      `${process.env.USER_PASSWORD}`
    );
  });

  await test.step(`go to Details page`, async () => {
    await productListingPage.goToDetailsPage();
    await productDetailsPage.isCorrectPage();
  });

  await test.step(`go to back Listing page using breadcrumb link`, async () => {
    await productDetailsPage.goBackToListingPage();
    await productListingPage.isCorrectPage();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});

test('should show correct sort options and sorts correctly', async ({
  loginPage,
  productListingPage
}) => {
  await loginPage.goToLoginPage();
  await loginPage.submitLogin(
    `${process.env.USER_USERNAME}`,
    `${process.env.USER_PASSWORD}`
  );
  await productListingPage.isCorrectPage();

  await productListingPage.isCorrectSorting('Name (A to Z)');
  await productListingPage.isCorrectSorting('Name (Z to A)');
  await productListingPage.isCorrectSorting('Price (low to high)');
  await productListingPage.isCorrectSorting('Price (high to low)');
});
