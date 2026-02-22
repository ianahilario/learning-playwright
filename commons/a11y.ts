import AxeBuilder from '@axe-core/playwright';
import test, { expect, Locator } from '@playwright/test';
import { createHtmlReport } from 'axe-html-reporter';

export class A11Y {
  static async runAccessibilityTest(options: {
    axeBuilder: AxeBuilder;
    pageOrElementName: string;
  }) {
    await test.step('Verify that there are no automatically detectable WCAG violations', async (step) => {
      const pageTitle = options.pageOrElementName;
      const reportFileName = await this.generateHTMLReportFileName(pageTitle);

      const accessibilityScanResults = await options.axeBuilder.analyze();

      await createHtmlReport({
        results: accessibilityScanResults,
        options: {
          customSummary: `Accessibility Report for '${pageTitle}'`,
          outputDir: 'axe-report',
          reportFileName: reportFileName
        }
      });

      if (accessibilityScanResults.violations.length > 0) {
        await step.attach(reportFileName, {
          path: `axe-report/${reportFileName}`,
          contentType: 'text/html'
        });
      }

      expect
        .soft(
          accessibilityScanResults.violations,
          'There are no automatically detectable WCAG violations'
        )
        .toEqual([]);
    });
  }

  private static async generateHTMLReportFileName(pageTitle: string) {
    const sanitizedPageTitle = pageTitle.replace(/[^a-z0-9]/gi, '-');
    const now = new Date();
    const sgtTime = new Date(now.getTime() + 8 * 60 * 60 * 1000); // UTC + 8 hours for SGT
    const dateTimeString = sgtTime
      .toISOString()
      .slice(0, 19)
      .replace(/[-:]/g, '')
      .replace('T', '-');
    return `a11y-report-${sanitizedPageTitle}-${dateTimeString}.html`;
  }

  static async verifyAriaSnapshot(
    locator: Locator,
    snapshot: string,
    options?: { timeout?: number; expectMessage?: string }
  ) {
    await expect
      .soft(
        locator,
        `${options?.expectMessage ? `Verify aria snapshot: ${options?.expectMessage}` : 'Verify aria snapshot is correct'}`
      )
      .toMatchAriaSnapshot(snapshot, { timeout: options?.timeout ?? 1 });
  }

  static async getActualAriaSnapshot(
    locator: Locator,
    pageOrElementName: string
  ) {
    const reportFileName =
      await this.generateAriaLogFileName(pageOrElementName);
    const snapshot = await locator.ariaSnapshot();
    await test.info().attach(`${reportFileName}`, {
      body: snapshot,
      contentType: 'text/plain'
    });
  }

  private static async generateAriaLogFileName(pageTitle: string) {
    const sanitizedPageTitle = pageTitle.replace(/[^a-z0-9]/gi, '-');
    const now = new Date();
    const sgtTime = new Date(now.getTime() + 8 * 60 * 60 * 1000); // UTC + 8 hours for SGT
    const dateTimeString = sgtTime
      .toISOString()
      .slice(0, 19)
      .replace(/[-:]/g, '')
      .replace('T', '-');
    return `aria-snapshot-${sanitizedPageTitle}-${dateTimeString}.txt`;
  }
}
