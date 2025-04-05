const { test, expect } = require('@playwright/test');

test('Button Valiadation', async ({ page }) => {
  const text = page.locator('#displayed-text');
  const hideButton = page.locator('#hide-textbox');
  page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(text).toBeVisible();
  await hideButton.click();
  await expect(text).not.toBeVisible();
});

test('Popup Valiadation', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.goto('https://www.google.com/');
  await page.goBack();
  await page.goForward();
});

test('Dialog Valiadation', async ({ page }) => {
  const dialogText = page.locator('#confirmbtn');
  page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  page.on('dialog', async (dialog) => {
    await dialog.accept();
    //await dialog.dismiss();
  });
  await dialogText.click();
  const hoverbutton = page.locator('#mousehover');
  await hoverbutton.hover();
  await page.waitForTimeout(5000);
});

test.only('Screenshot and Visual Validation', async ({ page }) => {
  // Locators for the elements
  const visibleText = page.locator('#displayed-text');
  const hideButton = page.locator('#hide-textbox');
  page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  await visibleText.screenshot({ path: 'images/visibleText.png' });
  await page
    .locator('fieldset')
    .nth(8)
    .screenshot({ path: 'images/fieldSet.png' });
  await expect(visibleText).toBeVisible();
  await hideButton.click();

  await page.screenshot({ path: 'images/screenshot.png' });
  await expect(visibleText).not.toBeVisible();
});
