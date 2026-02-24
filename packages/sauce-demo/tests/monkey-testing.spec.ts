import { test } from '../fixtures/sauce-demo';

test('monkey test login page', async ({ page, loginPage, monkeyTesting }) => {
  // Navigate to the test page
  await loginPage.goToLoginPage();
  // Execute chaos testing with a 30-second timeout
  await monkeyTesting.releaseMonkey(page, { timeout: 10_000 });
});
