import { test } from '../../../fixtures/testBase';
import { TAG_P1 } from '../../../utils/testTagManager';

test(
  'should login successfully',
  { tag: TAG_P1 },
  async ({ loginPage, productListingPage }) => {
    await test.step(`go to homepage`, async () => {
      await loginPage.goToLoginPage();
    });

    await test.step(`submit login credentials`, async () => {
      await loginPage.submitLogin(
        `${process.env.USER_STANDARD_USERNAME}`,
        `${process.env.USER_STANDARD_PASSWORD}`
      );
    });

    await test.step(`verify that user is able to login successfully`, async () => {
      await productListingPage.isCorrectPage();
    });
  }
);
