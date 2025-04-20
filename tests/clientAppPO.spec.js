const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
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
