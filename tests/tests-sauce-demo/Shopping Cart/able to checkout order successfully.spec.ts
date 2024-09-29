import { ShoppingCart } from '../../../models/data/dataObjects';
import { test } from '../../../fixtures/testBase';

test(
  'should checkout the cart item successfully',
  { tag: '@p1' },
  async ({
    loginPage,
    header,
    productListingPage,
    cartPage,
    cartCheckoutPage,
    cartReviewPage,
    cartConfirmationPage
  }) => {
    let productItem1;
    let productItem2;
    let shoppingCartData: ShoppingCart;

    await test.step(`go to homepage`, async () => {
      await loginPage.goToLoginPage();
      await loginPage.submitLogin(
        `${process.env.USER_USERNAME}`,
        `${process.env.USER_PASSWORD}`
      );
      await productListingPage.isCorrectPage();
    });

    await test.step(`add item to cart`, async () => {
      productItem1 = await productListingPage.getProductData();
      productItem2 = await productListingPage.getProductData(1);

      await header.isCorrectShoppingCartBadge(0);
      await productListingPage.cartItem.addItemToCartbyIndex();
      await header.isCorrectShoppingCartBadge(1);
      await productListingPage.cartItem.addItemToCartbyIndex(1);
      await header.isCorrectShoppingCartBadge(2);
    });

    await test.step(`go to Cart page`, async () => {
      await header.goToShoppingCartPage();
      await cartPage.isCorrectPage();
    });

    await test.step(`added products are displayed in cart`, async () => {
      await cartPage.cartItem.isCorrectProductData(productItem1, false, true);
      await cartPage.cartItem.isCorrectProductData(productItem2, false, true);

      shoppingCartData = await cartPage.getShoppingCartData([
        productItem1,
        productItem2
      ]);
    });

    await test.step(`go to Cart - Checkout page`, async () => {
      await cartPage.gotoCartCheckoutPage();
      await cartCheckoutPage.isCorrectPage();
    });

    await test.step(`fill up Checkout form`, async () => {
      await cartCheckoutPage.fillCheckoutForm();
    });

    await test.step(`go to Cart - Review page`, async () => {
      await cartCheckoutPage.gotoCartReviewPage();
      await cartReviewPage.isCorrectPage();
    });

    await test.step(`order details are correct`, async () => {
      await cartReviewPage.isCorrectOrderDetails(shoppingCartData);
    });

    await test.step(`go to Cart - Confirmation page`, async () => {
      await cartReviewPage.gotoCartConfirmationPage();
      await cartConfirmationPage.isCorrectPage();
    });

    await test.step(`order is confirmed`, async () => {
      await cartConfirmationPage.isOrderConfirmed();
    });

    await test.step(`go to back to homepage`, async () => {
      await cartConfirmationPage.gotoHomepage();
      await productListingPage.isCorrectPage();
    });

    await test.step(`cart is cleared`, async () => {
      await header.isCorrectShoppingCartBadge(0);

      await header.goToShoppingCartPage();
      await cartPage.isCorrectPage();
      await cartPage.isCartEmpty();
    });
  }
);
