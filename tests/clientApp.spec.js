const { test, expect } = require('@playwright/test');

test('Login as User with Valid Credentials', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('domcontentloaded');

  const userNmae = page.locator('[formcontrolname="userEmail"]');
  const password = page.locator('[type="password"]');
  const signIn = page.locator('#login');
  const cardTitles = page.locator('.card-body b');

  await userNmae.fill('manjuk.hossainown@gmail.com');
  await password.fill('KhaTest123456%');
  await signIn.click();
  await page.waitForLoadState('domcontentloaded');
  await cardTitles.first().waitFor();
  //await expect(page).toHaveTitle("Let's Shop");
  //await expect(cardTitles.first()).toContainText('ZARA COAT 3');
  //await expect(cardTitles.nth(1)).toContainText('Samsung Note 8');
  console.log(await cardTitles.allTextContents());
});

test.only('Add a product to cart', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('domcontentloaded');

  const userNmae = page.locator('[formcontrolname="userEmail"]');
  const password = page.locator('[type="password"]');
  const signIn = page.locator('#login');
  const products = page.locator('.card-body');
  const cardTitles = page.locator('.card-body b');
  const productName = 'ADIDAS ORIGINAL';

  await userNmae.fill('manjuk.hossainown@gmail.com');
  await password.fill('KhaTest123456%');
  await signIn.click();
  // await page.waitForLoadState('networkidle');
  await cardTitles.first().waitFor();

  for (let i = 0; i < (await products.count()); i++) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      //const addToCart = products.nth(i).locator('*.fa-shopping-cart');
      const addToCart = products.nth(i).locator('text= Add To Cart');
      await addToCart.click();
      break;
    }
  }
  //await page.waitForTimeout(10000);
});
