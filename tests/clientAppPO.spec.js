const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/loginPage');
const { DashboardPage } = require('../page-objects/DashboardPage');
const { CheckoutPage } = require('../page-objects/CheckoutPage');

test.only('Login as User with Valid Credentials', async ({ page }) => {
  const username = 'manjuk.hossainown@gmail.com',
    password = 'KhaTest123456%';
  const productName = 'ADIDAS ORIGINAL';

  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.validateLogin(username, password);

  const dashboard = new DashboardPage(page);
  await dashboard.searchProductAddCart(productName);
  await dashboard.navigateToCart();

  const checkoutPage = new CheckoutPage(page, expect);
  await checkoutPage.verifyCart(productName);
  await checkoutPage.navigateToPlaceOrder();
});

test('Add a product to cart', async ({ page }) => {
  // await page.goto('https://rahulshettyacademy.com/client');
  // await page.waitForLoadState('domcontentloaded');
  // const email = 'manjuk.hossainown@gmail.com';
  // const userNmae = page.locator('[formcontrolname="userEmail"]');
  // const password = page.locator('[type="password"]');
  // const signIn = page.locator('#login');
  //const products = page.locator('.card-body');
  // const cardTitles = page.locator('.card-body b');

  // const cart = page.locator("[routerlink*='cart']");
  // const productNameonCart = page.locator("[class='cartSection'] h3");
  // const checkout = page.locator("li[class='totalRow'] button");

  // slectore for payment method
  const expiryMonth = page.locator('select.input.ddl').nth(0);
  const expiryDate = page.locator('select.input.ddl').nth(1);
  const cvv = page.locator("div.field.small input[class='input txt']");
  const cardName = page.locator("input[class='input txt']").last();
  const coupon = page.locator("input[name='coupon']");
  const applyCoupon = page.locator("button[type='submit']");

  // selector for shipping address
  const countryType = page.locator("[placeholder*='Country']");
  const countryOptions = page.locator("[class*='ta-results']");

  // Email Details
  const emailText = page.locator("label[type='text']");

  // Place order
  const placeOrder = page.locator('.action__submit');
  const thankYouMessage = page.locator('h1.hero-primary');
  const orderNumber = page.locator("label[class*='ng-star']");
  const ordersTab = page.locator("button[routerlink*='myorders']");

  // Orders page
  const ordersPage = page.locator('h1.ng-star-inserted');
  const allOrders = page.locator('tbody');
  const orderSummary = page.locator('.email-title');
  const orderNumberinSummary = page.locator('.-main');

  // await userNmae.fill(email);
  // await password.fill('KhaTest123456%');
  // await signIn.click();
  // await page.waitForLoadState('networkidle');
  /*   await cardTitles.first().waitFor();

  for (let i = 0; i < (await products.count()); i++) {
    if ((await products.nth(i).locator('b').textContent()) === productName) {
      //const addToCart = products.nth(i).locator('*.fa-shopping-cart');
      const addToCart = products.nth(i).locator('text= Add To Cart');
      await addToCart.click();
      break;
    }
  }
  await cart.click();
  expect(await productNameonCart.last().textContent()).toBe(productName);
  expect(
    await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
  ).toBeTruthy(); */

  // Click on Checkout button
  await checkout.click();
  await page.getByText(' Payment Method ').waitFor();

  // Verify email details
  expect(await emailText.textContent()).toBe(email);
  // Filling up payment details
  await expiryMonth.selectOption('10');
  await expiryDate.selectOption('25');
  await cardName.fill('Manjuk Hossain');
  await cvv.fill('654');
  await coupon.fill('rahylshettyacademy');
  // await applyCoupon.click();

  // Filling up shipping address
  await countryType.pressSequentially('ind');
  await countryOptions.waitFor();
  const countryOptionsCount = await countryOptions.locator('button').count();
  for (let i = 0; i < countryOptionsCount; i++) {
    if (
      (await countryOptions.locator('button').nth(i).textContent()) === ' India'
    ) {
      await countryOptions.locator('button').nth(i).click();
      break;
    }
  }
  await placeOrder.click();
  await expect(thankYouMessage).toHaveText(' Thankyou for the order. ');
  const exactOrderNumer = (await orderNumber.textContent())
    .split('|')
    .join('')
    .trim();
  console.log(exactOrderNumer);
  await ordersTab.click();
  await ordersPage.waitFor();
  await expect(ordersPage).toHaveText('Your Orders');

  const ordersCount = await allOrders.locator('tr').count();
  for (let i = 0; i < ordersCount; i++) {
    if (
      (await allOrders.locator('th').nth(i).textContent()) === exactOrderNumer
    ) {
      await allOrders.locator('td button.btn-primary').nth(i).click();
      break;
    }
  }
  await orderSummary.waitFor();
  await expect(orderNumberinSummary).toHaveText(exactOrderNumer);
  await page.waitForTimeout(5000);
});

test('Login using GetBy', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('domcontentloaded');

  const userNmae = page.getByPlaceholder('email@example.com');
  const password = page.getByPlaceholder('enter your passsword');
  const signIn = page.getByRole('button', { name: 'Login' });
  const cardTitles = page.locator('.card-body b');

  await userNmae.fill('manjuk.hossainown@gmail.com');
  await password.fill('KhaTest123456%');
  await signIn.click();
  await page.waitForLoadState('domcontentloaded');
  await cardTitles.first().waitFor();
  console.log(await cardTitles.allTextContents());
  await page
    .locator('.card-body')
    .filter({ hasText: 'ADIDAS ORIGINAL' })
    .getByRole('button', { name: 'Add To Cart' })
    .click();
  // await page.getByRole('button', { name: 'Cart' }).first().click();
  await page
    .getByRole('listitem')
    .getByRole('button', { name: 'Cart' })
    .click();

  await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  expect(await page.getByText('Payment Method').isVisible()).toBeTruthy();

  await page.getByPlaceholder('Select Country').pressSequentially('ind');
  await page
    .locator('.ta-results')
    .filter({ hasText: 'India' })
    //.getByRole('button', { name: 'India' })
    .click();
  await page.getByText('Place Order').click();
  await expect(page.getByText('Thankyou for the order.')).toBeVisible();
  await page.waitForTimeout(10000);
});
