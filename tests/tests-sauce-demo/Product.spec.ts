import { Product } from '../../models/data/dataObjects';
import { test } from '../../fixtures/testBase';

test(
  'should show same product details in Listing and Details',
  { tag: '@p1' },
  async ({ loginPage, productListingPage, productDetailsPage }) => {
    let product: Product;

    await test.step(`go to homepage`, async () => {
      await loginPage.goToLoginPage();
      await loginPage.submitLogin(
        `${process.env.USER_USERNAME}`,
        `${process.env.USER_PASSWORD}`
      );
      await productListingPage.isCorrectPage();
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
  productDetailsPage
}) => {
  await test.step(`go to homepage`, async () => {
    await loginPage.goToLoginPage();
    await loginPage.submitLogin(
      `${process.env.USER_USERNAME}`,
      `${process.env.USER_PASSWORD}`
    );
    await productListingPage.isCorrectPage();
  });

  await test.step(`go to Details page`, async () => {
    await productListingPage.goToDetailsPage();
    await productDetailsPage.isCorrectPage();
  });

  await test.step(`go to back Listing page using breadcrumb link`, async () => {
    await productDetailsPage.goBackToListingPage();
    await productListingPage.isCorrectPage();
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
