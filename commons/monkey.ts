import { Page } from 'playwright';
import test, { expect } from 'playwright/test';

export class MonkeyTesting {
  async releaseMonkey(page: Page, options: { timeout: number }) {
    const errors: [string, string][] = [];

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

    await test.step('Run monkey testing', async () => {
      await page.evaluate((timeout) => {
        const gremlins = (window as any).gremlins;
        if (!gremlins) {
          throw new Error('gremlins.js not loaded');
        }
        return Promise.race([
          new Promise(() => {
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
          new Promise((resolve) => setTimeout(resolve, timeout))
        ]);
      }, options.timeout);

      expect.soft(errors.length, 'There are 0 errors in the page').toBe(0);
      expect
        .soft(errors.toString(), 'There are no errors in the page')
        .toBe('');
    });
  }
}
