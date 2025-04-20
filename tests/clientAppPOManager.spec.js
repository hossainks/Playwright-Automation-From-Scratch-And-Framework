const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');

test.only('Login as User with Valid Credentials', async ({ page }) => {
  const email = 'manjuk.hossainown@gmail.com',
    password = 'KhaTest123456%';
  const productName = 'ADIDAS ORIGINAL';

  const poManager = new POManager(page, expect);
  await poManager.getLoginPage().goTo();
  await poManager.getLoginPage().validateLogin(email, password);

  await poManager.getDashboardPage().searchProductAddCart(productName);
  await poManager.getDashboardPage().navigateToCart();

  await poManager.getCheckoutPage().verifyCart(productName);
  await poManager.getCheckoutPage().navigateToPlaceOrder();

  await poManager.getPlaceOrderPage().verifyEmail(email);
  await poManager.getPlaceOrderPage().fillPaymentDetails();
  await poManager.getPlaceOrderPage().fillShippingAddress();
  await poManager.getPlaceOrderPage().submitOrder();

  await poManager.getThankYouPage().verifThankYou();
  const exactOrderNumer = await poManager.getThankYouPage().getOrderId();
  console.log(exactOrderNumer);
  await poManager.getThankYouPage().navigateToMyOrders();

  await poManager.getOrdersPage().verifyOrdersPage();
  await poManager.getOrdersPage().clickOnOrder(exactOrderNumer);
  await poManager.getOrdersPage().verifyOrder(exactOrderNumer);
});
