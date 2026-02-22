import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

dotenv.config({
  path: [`./.env.secret`]
});

/**
 * See https://playwright.dev/docs/test-configuration.
 * Note: testDir does not support glob patterns. Use a parent dir; Playwright searches recursively.
 */
export default defineConfig({
  testDir: './packages',
  testMatch: '**/tests/**/*.spec.ts',
  timeout: 5 * 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', { outputFile: './playwright-report/report.json' }],
    ['html', { outputDir: './playwright-report' }]
  ],
  maxFailures: process.env.CI ? 9 : undefined,
  snapshotPathTemplate:
    '.visual-test-snapshots/{projectName}/{testFilePath}/{arg}{ext}',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10_000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    video: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        viewport: { width: 1280, height: 850 }
      }
    },
    {
      name: 'desktop-firefox',
      grep: [/@cross-browser/],
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'desktop-safari',
      grep: [/@cross-browser/],
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'mobile-android',
      grep: [/@mobile/],
      use: {
        ...devices['Galaxy S9+'],
        viewport: { width: 360, height: 740 }
      }
    },
    {
      name: 'mobile-ios',
      grep: [/@mobile/],
      use: {
        ...devices['iPhone 15'],
        viewport: { width: 360, height: 740 }
      }
    }

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
