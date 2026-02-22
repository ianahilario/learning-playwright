import { test } from '../fixtures/sauce-demo';
import { MonkeyTesting } from '../../../commons/monkey';

test.describe('monkey testing', () => {
  test('login page', async ({ page, loginPage }) => {
    // Navigate to the test page
    await loginPage.goToLoginPage();
    await MonkeyTesting.releaseMonkey(page);
  });
});
