// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'Run-on-Safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on',
      },
    },
    {
      name: 'Run-on-Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        trace: 'on',
      },
    },
  ],
});
