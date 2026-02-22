import { test } from '../fixtures/sauce-demo';
import { Tags, Teams, TestTags } from '../../../commons/test-tags';
import { A11Y } from '../../../commons/a11y';
import { TestAnnotations } from '../../../commons/test-annotations';

test(
  'login page is WCAG compliant',
  {
    tag: TestTags.setTestTags({
      team: Teams.TEAM_NAME,
      tags: [Tags.SMOKE, Tags.FAILED]
    }),
    annotation: [...TestAnnotations.setOpenBugInfo({ ticketId: ['BUG-0002'] })]
  },
  async ({ loginPage, axeBuilder, page }) => {
    await test.step(`go to login page`, async () => {
      await loginPage.goToLoginPage();
    });

    await test.step(`login page is WCAG compliant`, async () => {
      const ariaLocator = page.locator('//body');
      await A11Y.getActualAriaSnapshot(ariaLocator, 'Login page');

      await A11Y.verifyAriaSnapshot(
        ariaLocator,
        `
        - heading "Swag Labs" [level=1]
        `
      );
      await A11Y.runAccessibilityTest(axeBuilder, 'Login page');
    });
  }
);
