const { test, expect } = require('@playwright/test');

test(' browser context test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://playwright.dev/');
  const title = await page.title();
  console.log(title);
  await page.waitForTimeout(2000);
});

test(' Page context test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  const title = await page.title();
  console.log(title);
  await page.waitForTimeout(2000);
  await expect(page).toHaveTitle('Google');
});
