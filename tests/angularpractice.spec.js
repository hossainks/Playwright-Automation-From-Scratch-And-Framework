import { test, expect } from '@playwright/test';

test('Playwright Special locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await page.getByLabel('Check me out if you Love IceCreams!').check();
  // await page.getByLabel('Employed').click();
  await page.getByLabel('Employed').check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.waitForTimeout(5000);
});
