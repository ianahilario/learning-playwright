import { test as base } from '@playwright/test';
import { HomePage } from '../models/practice-software-testing/home.page';
import { Navigation } from '../models/practice-software-testing/navigation';

interface testFixtures {
  homepage: HomePage;
  navigation: Navigation;
}

export const test = base.extend<testFixtures>({
  homepage: async ({ page, isMobile }, use) => {
    await use(new HomePage(page, isMobile));
  },
  navigation: async ({ page, isMobile }, use) => {
    await use(new Navigation(page, isMobile));
  }
});
