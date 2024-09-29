import { test } from '../../../fixtures/testBase';

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
