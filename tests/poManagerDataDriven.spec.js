const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dataSet = JSON.parse(
  JSON.stringify(require('../resources/jsonData.json'))
);

test.only('Login as User with Valid Credentials', async ({ page }) => {
  const poManager = new POManager(page, expect);
  await poManager.getLoginPage().goTo();
  await poManager.getLoginPage().validateLogin(dataSet.email, dataSet.password);

  await poManager.getDashboardPage().searchProductAddCart(dataSet.productName);
  await poManager.getDashboardPage().navigateToCart();

  await poManager.getCheckoutPage().verifyCart(dataSet.productName);
  await poManager.getCheckoutPage().navigateToPlaceOrder();

  await poManager.getPlaceOrderPage().verifyEmail(dataSet.email);
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
