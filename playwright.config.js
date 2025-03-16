// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 40000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
  },
});
