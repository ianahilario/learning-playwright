import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

dotenv.config({
  path: `./.env.secret`,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
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
  reporter: 'html',
  maxFailures: process.env.CI ? 9 : undefined,
  snapshotPathTemplate: '.visual-test-snapshots/{projectName}/{testFilePath}/{arg}{ext}',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'smoke',
      grep: [/@p1/],
      grepInvert: [/@visual/],
      use: {
        ...devices['Desktop Chrome'],
        video: 'on'
      },
    },
    { name: 'smoke-mobile',
      grep: [/@p1/],
      grepInvert: [/@visual/],
      use: { 
        ...devices['iPhone 14'],
        "isMobile": true,
        video: 'on'
      },
    },
    { name: 'full-chrome',
      grepInvert: [/@visual/],
      use: { ...devices['Desktop Chrome'] },
    },
    { name: 'full-firefox',
      grepInvert: [/@visual/],
      use: { ...devices['Desktop Firefox'] },
    },
    { name: 'full-safari',
      grepInvert: [/@visual/],
      use: { ...devices['Desktop Safari'] },
    },
    //Visual testing
    { name: 'visual-desktop-chrome',
      grep: [/@visual/],
      use: { ...devices['Desktop Chrome'] },
    },
    { name: 'visual-desktop-safari',
      grep: [/@visual/],
      use: { ...devices['Desktop Safari'] },
    },
    { name: 'visual-mobile-android',
      grep: [/@visual/],
      use: { ...devices['Galaxy S9+'] },
    },
    { name: 'visual-mobile-iphone',
      grep: [/@visual/],
      use: { ...devices['iPhone 14'] },
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
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
