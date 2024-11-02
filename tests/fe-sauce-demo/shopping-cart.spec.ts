import { test } from '../../fixtures/sauce-demo';
import { Product, ShoppingCart } from '../../models/data/data-objects';

test.describe('Able to add/remove cart items', () => {
  test(
    'should allow to add/remove from the Product Listing page',
    { tag: '@p1' },
    async ({ loginPage, header, productListingPage, cartPage }) => {
      let productItem1: Product;
      let productItem2: Product;

      await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
        await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
        await productListingPage.isCorrectPage();
      });

      await test.step(`add item to cart`, async () => {
        productItem1 = await productListingPage.getProductData(0);
        productItem2 = await productListingPage.getProductData(1);

        await header.isCorrectShoppingCartBadge(0);
        await productListingPage.cartItem.addItemToCartbyIndex(0);
        await header.isCorrectShoppingCartBadge(1);
        await productListingPage.cartItem.addItemToCartbyIndex(1);
        await header.isCorrectShoppingCartBadge(2);
      });

      await test.step(`added products are displayed in cart`, async () => {
        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();

        await cartPage.cartItem.isCorrectProductData(productItem1, false, true);
        await cartPage.cartItem.isCorrectProductData(productItem2, false, true);
      });

      await test.step(`remove item to cart`, async () => {
        await cartPage.gotoContinueShopping();
        await productListingPage.isCorrectPage();

        await cartPage.cartItem.removeItemToCartbyProduct(productItem1);
        await header.isCorrectShoppingCartBadge(1);
        await cartPage.cartItem.removeItemToCartbyProduct(productItem2);
        await header.isCorrectShoppingCartBadge(0);
      });

      await test.step(`cart is cleared`, async () => {
        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();

        await cartPage.isCartEmpty();
      });
    }
  );

  test(
    'should allow to add/remove from the Product Details page',
    { tag: '@p1' },
    async ({ loginPage, header, productListingPage, productDetailsPage, cartPage }) => {
      let productItem1;
      let productItem2;

      await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
        await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
        await productListingPage.isCorrectPage();
      });

      await test.step(`add item to cart`, async () => {
        await header.isCorrectShoppingCartBadge(0);

        productItem1 = await productListingPage.getProductData(0);
        productItem2 = await productListingPage.getProductData(1);

        await productListingPage.goToDetailsPage(0);
        await productDetailsPage.isCorrectPage();
        await productListingPage.cartItem.addItemToCartbyIndex();
        await header.isCorrectShoppingCartBadge(1);

        await productDetailsPage.goBackToListingPage();

        await productListingPage.goToDetailsPage(1);
        await productDetailsPage.isCorrectPage();
        await productListingPage.cartItem.addItemToCartbyIndex();
        await header.isCorrectShoppingCartBadge(2);
      });

      await test.step(`added products are displayed in cart`, async () => {
        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();

        await cartPage.cartItem.isCorrectProductData(productItem1, false, true);
        await cartPage.cartItem.isCorrectProductData(productItem2, false, true);
      });

      await test.step(`remove item to cart`, async () => {
        await cartPage.gotoContinueShopping();
        await productListingPage.isCorrectPage();

        await productListingPage.goToDetailsPage(0);
        await productDetailsPage.isCorrectPage();
        await productListingPage.cartItem.removeItemToCartbyProduct(productItem1);
        await header.isCorrectShoppingCartBadge(1);

        await productDetailsPage.goBackToListingPage();

        await productListingPage.goToDetailsPage(1);
        await productDetailsPage.isCorrectPage();
        await productListingPage.cartItem.removeItemToCartbyProduct(productItem2);
        await header.isCorrectShoppingCartBadge(0);
      });

      await test.step(`cart is cleared`, async () => {
        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();

        await cartPage.isCartEmpty();
      });
    }
  );

  test(
    'should allow to add/remove from the Cart page',
    { tag: '@p1' },
    async ({ loginPage, header, productListingPage, cartPage }) => {
      let productItem1;
      let productItem2;

      await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
        await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
        await productListingPage.isCorrectPage();
      });

      await test.step(`add item to cart`, async () => {
        productItem1 = await productListingPage.getProductData(0);
        productItem2 = await productListingPage.getProductData(1);

        await header.isCorrectShoppingCartBadge(0);
        await productListingPage.cartItem.addItemToCartbyIndex(0);
        await header.isCorrectShoppingCartBadge(1);
        await productListingPage.cartItem.addItemToCartbyIndex(1);
        await header.isCorrectShoppingCartBadge(2);
      });

      await test.step(`added products are displayed in cart`, async () => {
        await header.goToShoppingCartPage();
        await cartPage.isCorrectPage();

        await cartPage.cartItem.isCorrectProductData(productItem1, false, true);
        await cartPage.cartItem.isCorrectProductData(productItem2, false, true);
      });

      await test.step(`remove item to cart`, async () => {
        await cartPage.cartItem.removeItemToCartbyProduct(productItem1, true);
        await header.isCorrectShoppingCartBadge(1);
        await cartPage.cartItem.removeItemToCartbyProduct(productItem2, true);
        await header.isCorrectShoppingCartBadge(0);
      });

      await test.step(`cart is cleared`, async () => {
        await cartPage.isCartEmpty();
      });
    }
  );

  test('should appended newly added cart items to the bottom of the cart', async ({
    loginPage,
    header,
    productListingPage,
    cartPage
  }) => {
    let productItem1;
    let productItem2;

    await test.step(`go to homepage`, async () => {
      await loginPage.goToLoginPage();
      await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
      await productListingPage.isCorrectPage();
    });

    await test.step(`add item to cart`, async () => {
      productItem1 = await productListingPage.getProductData(1);
      productItem2 = await productListingPage.getProductData(0);

      await productListingPage.cartItem.addItemToCartbyIndex(1);
      await productListingPage.cartItem.addItemToCartbyIndex(0);
    });

    await test.step(`added products are displayed in cart`, async () => {
      await header.goToShoppingCartPage();
      await cartPage.isCorrectPage();

      await cartPage.cartItem.isCorrectProductData(productItem1, false, true, 0);
      await cartPage.cartItem.isCorrectProductData(productItem2, false, true, 1);
    });
  });
});

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
      await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
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

      shoppingCartData = await cartPage.getShoppingCartData([productItem1, productItem2]);
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

test(
  'should persist cart item when user logs out',
  { tag: '@p1' },
  async ({ loginPage, header, productListingPage, cartPage }) => {
    let productItem1;
    let productItem2;

    await test.step(`go to homepage`, async () => {
      await loginPage.goToLoginPage();
      await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
      await productListingPage.isCorrectPage();
    });

    await test.step(`add item to cart`, async () => {
      productItem1 = await productListingPage.getProductData();
      productItem2 = await productListingPage.getProductData(1);

      await productListingPage.cartItem.addItemToCartbyIndex();
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
    });

    await test.step(`log out then log in again`, async () => {
      await header.goToLogout();

      await loginPage.submitLogin(`${process.env.USER_USERNAME}`, `${process.env.USER_PASSWORD}`);
      await productListingPage.isCorrectPage();
    });

    await test.step(`cart items are retained`, async () => {
      await header.isCorrectShoppingCartBadge(2);

      await header.goToShoppingCartPage();
      await cartPage.isCorrectPage();

      await cartPage.cartItem.isCorrectProductData(productItem1, false, true);
      await cartPage.cartItem.isCorrectProductData(productItem2, false, true);
    });
  }
);
