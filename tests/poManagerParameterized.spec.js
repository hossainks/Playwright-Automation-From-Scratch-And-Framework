const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');
const dataSet = JSON.parse(
  JSON.stringify(require('../resources/jsonDataParameterized.json'))
);

for (const data of dataSet) {
  test(`Client App Login For ${data.email}`, async ({ page }) => {
    const poManager = new POManager(page, expect);
    await poManager.getLoginPage().goTo();
    await poManager.getLoginPage().validateLogin(data.email, data.password);

    await poManager.getDashboardPage().searchProductAddCart(data.productName);
    await poManager.getDashboardPage().navigateToCart();

    await poManager.getCheckoutPage().verifyCart(data.productName);
    await poManager.getCheckoutPage().navigateToPlaceOrder();

    await poManager.getPlaceOrderPage().verifyEmail(data.email);
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
} // end of for loop
