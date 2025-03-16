const { test, expect } = require('@playwright/test');

test.only('Login as User with Valid Credentials', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const userNmae = page.locator('#username');
  const password = page.locator('input#password');
  const signIn = page.locator('[id="signInBtn"]');

  const title = await page.title();
  console.log(title);

  await userNmae.fill('rahulshettyacademy');
  await password.fill('learning');
  await signIn.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveTitle('ProtoCommerce');
  await expect(page.locator('.card-title a').first()).toContainText('iphone X');
  await expect(page.locator('.card-title a').nth(1)).toContainText(
    'Samsung Note 8'
  );
});

test.skip('Login as User with wrong Details ', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.waitForLoadState('domcontentloaded');
  const title = await page.title();
  console.log(title);
  await page.locator('#username').fill('rahulshetty');
  await page.locator('input#password').fill('learning');
  await page.locator('[id="signInBtn"]').click();
  const errorMessage = await page.locator('[style*="block"]').textContent();
  console.log(errorMessage);
  await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
  // const errorMessage = await page
  //   .locator('[class*="alert-danger"]')
  //   .textContent();
  // console.log(errorMessage.trim());
  await page.locator('//div/strong[text()="Incorrect"]').isVisible();
});

test(' Page context test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  const title = await page.title();
  console.log(title);
  await page.waitForTimeout(2000);
  await expect(page).toHaveTitle('Google');
});
