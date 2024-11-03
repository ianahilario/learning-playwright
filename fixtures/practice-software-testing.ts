import { test as base } from '@playwright/test';
import { HomePage } from '../models/practice-software-testing/home.page';
import { Navigation } from '../models/practice-software-testing/navigation';
import { LoginPage } from '../models/practice-software-testing/login.page';

interface testFixtures {
  homepage: HomePage;
  navigation: Navigation;
  loginPage: LoginPage;
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
  }
});
