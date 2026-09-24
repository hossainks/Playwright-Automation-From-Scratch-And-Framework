const { test, expect } = require("@playwright/test");
const { POManager } = require("../page-objects/POManager");

test("Complete purchase flow from login to order confirmation", async ({
  page,
}) => {
  const email = process.env.TEST_USER_EMAIL,
    password = process.env.TEST_USER_PASSWORD;
  const productName = "ADIDAS ORIGINAL";

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

  await poManager.getThankYouPage().verifyThankYou();
  const exactOrderNumber = await poManager.getThankYouPage().getOrderId();
  console.log(exactOrderNumber);
  await poManager.getThankYouPage().navigateToMyOrders();

  await poManager.getOrdersPage().verifyOrdersPage();
  await poManager.getOrdersPage().clickOnOrder(exactOrderNumber);
  await poManager.getOrdersPage().verifyOrder(exactOrderNumber);
});
