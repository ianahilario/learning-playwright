import { expect } from '@playwright/test';
import { test } from '../../../fixtures/practice-software-testing';

const errors: [string, string][] = [];
test.describe('monkey testing', () => {
  test.beforeEach(async ({ page }) => {
    errors.length = 0;

    page.on('console', (err) => {
      if (err.type() === 'error') {
        errors.push(['console', err.text()]);
      }
    });

    page.on('pageerror', (err) => {
      errors.push(['pageerror', err.message]);
    });

    page.on('requestfailed', (err) => {
      if (!err.url().includes('practice')) return;
      if (err.url().includes('google')) return;
      errors.push([
        'requestfailed',
        `${err.method()} ${err.url()}: ${err.failure()?.errorText}`
      ]);
    });

    // Load gremlins.js library
    await page.addInitScript({
      path: './node_modules/gremlins.js/dist/gremlins.min.js'
    });
  });

  test.afterEach(async ({}) => {
    let count = 1;
    errors.forEach((error) => {
      console.log(`monkey test error #${count}:`, error.toString());
      count++;
    });
  });

  test('homepage', async ({ page, navigation }) => {
    // Navigate to the test page
    await navigation.gotoHomepageviaURL();

    // Execute chaos testing with a 30-second timeout
    await page.evaluate(() => {
      const gremlins = (window as any).gremlins;
      return Promise.race([
        new Promise((resolve) => {
          gremlins
            .createHorde({
              randomizer: new gremlins.Chance(1234),
              strategies: [gremlins.strategies.allTogether({ nb: 10000 })],
              species: [
                gremlins.species.clicker({
                  clickTypes: ['click'],
                  canClick: function (element) {
                    if (element.tagName === 'a') return false;
                    if (element.classList.contains('figure-caption'))
                      return false;
                  }
                }),
                gremlins.species.formFiller(),
                gremlins.species.typer(),
                gremlins.species.scroller()
              ],
              mogwais: [
                gremlins.mogwais.alert(),
                gremlins.mogwais.fps(),
                gremlins.mogwais.gizmo()
              ],
              delay: 250
            })
            .unleash();
        }),
        new Promise((resolve) => setTimeout(resolve, 30000)) // 30 seconds timeout
      ]);
    });

    expect(errors.length, 'There are 0 errors in the page').toBe(0);
  });

  test('sign-in page', async ({ page, navigation }) => {
    await navigation.gotoHomepageviaURL();
    await navigation.header.gotoLogin();

    await page.evaluate(() => {
      const gremlins = (window as any).gremlins;
      return Promise.race([
        new Promise((resolve) => {
          gremlins
            .createHorde({
              randomizer: new gremlins.Chance(1234),
              strategies: [gremlins.strategies.allTogether({ nb: 10000 })],
              species: [
                gremlins.species.clicker({
                  clickTypes: ['click'],
                  canClick: function (element) {
                    if (element.tagName === 'a') return false;
                  }
                }),
                gremlins.species.formFiller(),
                gremlins.species.typer(),
                gremlins.species.scroller()
              ],
              mogwais: [
                gremlins.mogwais.alert(),
                gremlins.mogwais.fps(),
                gremlins.mogwais.gizmo()
              ],
              delay: 250
            })
            .unleash();
        }),
        new Promise((resolve) => setTimeout(resolve, 30000)) // 30 seconds timeout
      ]);
    });

    expect(errors.length, 'There are 0 errors in the page').toBe(0);
  });
});
