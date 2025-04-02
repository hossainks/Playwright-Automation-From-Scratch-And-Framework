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

test.only('iFrame Testing', async ({ page }) => {
  page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  const framePage = page.frameLocator('#courses-iframe');
  await framePage.locator("li a[href='lifetime-access']:visible").click();
  expect(await framePage.locator('h1').textContent()).toContain(
    'All Access Subscription'
  );
  await page.waitForTimeout(5000);
});
