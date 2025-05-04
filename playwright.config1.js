// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  workers: 5,
  expect: {
    timeout: 5000,
  },
  reporter: 'allure-playwright',
  projects: [
    {
      name: 'Run-on-Safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on',
        ...devices['iPhone 11'],
      },
    },
    {
      name: 'Run-on-Chrome',
      use: {
        browserName: 'chromium',
        retries: 1,
        headless: true,
        screenshot: 'on',
        trace: 'on',
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
      },
    },
  ],
});
