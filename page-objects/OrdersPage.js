class OrdersPage {
  constructor(page, expect) {
    this.expect = expect;
    this.ordersPage = page.locator('h1.ng-star-inserted');
    this.allOrders = page.locator('tbody');
    this.orderSummary = page.locator('.email-title');
    this.orderNumberinSummary = page.locator('.-main');
  }

  async verifyOrdersPage() {
    await this.ordersPage.waitFor();
    await this.expect(this.ordersPage).toHaveText('Your Orders');
  }

  async clickOnOrder(orderNumber) {
    const ordersCount = await this.allOrders.locator('tr').count();
    for (let i = 0; i < ordersCount; i++) {
      if (
        (await this.allOrders.locator('th').nth(i).textContent()) ===
        orderNumber
      ) {
        await this.allOrders.locator('td button.btn-primary').nth(i).click();
        break;
      }
    }
  }

  async verifyOrder(orderNumber) {
    await this.orderSummary.waitFor();
    await this.expect(this.orderNumberinSummary).toHaveText(orderNumber);
  }
}

module.exports = { OrdersPage };
