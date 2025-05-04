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
  use: {
    browserName: 'webkit',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    //trace: 'on',
  },
});
