const { test, expect } = require('@playwright/test');

test('Button Valiadation', async ({ page }) => {
  const text = page.locator('#displayed-text');
  const hideButton = page.locator('#hide-textbox');
  page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(text).toBeVisible();
  await hideButton.click();
  await expect(text).not.toBeVisible();
});

test.only('Popup Valiadation', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.goto('https://www.google.com/');
  await page.goBack();
  await page.goForward();
});
