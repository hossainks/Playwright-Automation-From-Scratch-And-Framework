class ThankYouPage {
  constructor(page, expect) {
    this.expect = expect;
    this.thankYouMessage = page.locator('h1.hero-primary');
    this.orderNumber = page.locator("label[class*='ng-star']");
    this.ordersTab = page.locator("button[routerlink*='myorders']");
  }

  async verifThankYou() {
    await this.expect(this.thankYouMessage).toHaveText(
      ' Thankyou for the order. '
    );
  }

  async getOrderId() {
    return (await this.orderNumber.textContent()).split('|').join('').trim();
  }

  async navigateToMyOrders() {
    await this.ordersTab.click();
  }
}

module.exports = { ThankYouPage };
