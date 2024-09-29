import { test } from '../../../fixtures/testBase';
import { Product } from '../../../models/data/dataObjects';

test.describe('Add/remove cart items', () => {
  test(
    'should allow to add/remove from the Product Listing page',
    { tag: '@p1' },
    async ({ loginPage, header, productListingPage, cartPage }) => {
      let productItem1: Product;
      let productItem2: Product;

      await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
        await loginPage.submitLogin(
          `${process.env.USER_USERNAME}`,
          `${process.env.USER_PASSWORD}`
        );
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
    async ({
      loginPage,
      header,
      productListingPage,
      productDetailsPage,
      cartPage
    }) => {
      let productItem1;
      let productItem2;

      await test.step(`go to homepage`, async () => {
        await loginPage.goToLoginPage();
        await loginPage.submitLogin(
          `${process.env.USER_USERNAME}`,
          `${process.env.USER_PASSWORD}`
        );
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
        await productListingPage.cartItem.removeItemToCartbyProduct(
          productItem1
        );
        await header.isCorrectShoppingCartBadge(1);

        await productDetailsPage.goBackToListingPage();

        await productListingPage.goToDetailsPage(1);
        await productDetailsPage.isCorrectPage();
        await productListingPage.cartItem.removeItemToCartbyProduct(
          productItem2
        );
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
        await loginPage.submitLogin(
          `${process.env.USER_USERNAME}`,
          `${process.env.USER_PASSWORD}`
        );
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
      await loginPage.submitLogin(
        `${process.env.USER_USERNAME}`,
        `${process.env.USER_PASSWORD}`
      );
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

      await cartPage.cartItem.isCorrectProductData(
        productItem1,
        false,
        true,
        0
      );
      await cartPage.cartItem.isCorrectProductData(
        productItem2,
        false,
        true,
        1
      );
    });
  });
});
