const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/loginPage');
const { DashboardPage } = require('../page-objects/DashboardPage');
const { CheckoutPage } = require('../page-objects/CheckoutPage');
const { PlaceorderPage } = require('../page-objects/PlaceorderPage');
const { ThankYouPage } = require('../page-objects/ThankYouPage');
const { OrdersPage } = require('../page-objects/OrdersPage');

test.only('Login as User with Valid Credentials', async ({ page }) => {
  const email = 'manjuk.hossainown@gmail.com',
    password = 'KhaTest123456%';
  const productName = 'ADIDAS ORIGINAL';

  const loginPage = new LoginPage(page);
  await loginPage.goTo();
  await loginPage.validateLogin(email, password);

  const dashboard = new DashboardPage(page);
  await dashboard.searchProductAddCart(productName);
  await dashboard.navigateToCart();

  const checkoutPage = new CheckoutPage(page, expect);
  await checkoutPage.verifyCart(productName);
  await checkoutPage.navigateToPlaceOrder();

  const placeOrderPage = new PlaceorderPage(page, expect);
  await placeOrderPage.verifyEmail(email);
  await placeOrderPage.fillPaymentDetails();
  await placeOrderPage.fillShippingAddress();
  await placeOrderPage.submitOrder();

  const thankYouPage = new ThankYouPage(page, expect);
  await thankYouPage.verifThankYou();
  const exactOrderNumer = await thankYouPage.getOrderId();
  console.log(exactOrderNumer);
  await thankYouPage.navigateToMyOrders();

  const ordersPage = new OrdersPage(page, expect);
  await ordersPage.verifyOrdersPage();
  await ordersPage.clickOnOrder(exactOrderNumer);
  await ordersPage.verifyOrder(exactOrderNumer);
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
