import { test as base } from '@playwright/test';
import { HomePage } from '../models/practice-software-testing/home.page';
import { Navigation } from '../models/practice-software-testing/navigation';
import { LoginPage } from '../models/practice-software-testing/login.page';
import { ProductDetailsPage } from '../models/practice-software-testing/product-details.page';
import { CartPage } from '../models/practice-software-testing/cart-page';

interface testFixtures {
  loginPage: LoginPage;
  homepage: HomePage;
  navigation: Navigation;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
}

export const test = base.extend<testFixtures>({
  homepage: async ({ page, isMobile }, use) => {
    await use(new HomePage(page, isMobile));
  },
  navigation: async ({ page, isMobile }, use) => {
    await use(new Navigation(page, isMobile));
  },
  loginPage: async ({ page, isMobile }, use) => {
    await use(new LoginPage(page, isMobile));
  },
  productDetailsPage: async ({ page, isMobile }, use) => {
    await use(new ProductDetailsPage(page, isMobile));
  },
  cartPage: async ({ page, isMobile }, use) => {
    await use(new CartPage(page, isMobile));
  }
});
