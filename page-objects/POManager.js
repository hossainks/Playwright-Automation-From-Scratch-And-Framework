const { LoginPage } = require('../page-objects/LoginPage');
const { DashboardPage } = require('../page-objects/DashboardPage');
const { CheckoutPage } = require('../page-objects/CheckoutPage');
const { PlaceorderPage } = require('../page-objects/PlaceorderPage');
const { ThankYouPage } = require('../page-objects/ThankYouPage');
const { OrdersPage } = require('../page-objects/OrdersPage');

class POManager {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;

    this.loginPage = new LoginPage(this.page);
    this.dashboard = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page, this.expect);
    this.placeOrderPage = new PlaceorderPage(this.page, this.expect);
    this.thankYouPage = new ThankYouPage(this.page, this.expect);
    this.ordersPage = new OrdersPage(this.page, this.expect);
  }

  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboard;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getPlaceOrderPage() {
    return this.placeOrderPage;
  }
  getThankYouPage() {
    return this.thankYouPage;
  }
  getOrdersPage() {
    return this.ordersPage;
  }
}

module.exports = { POManager };
