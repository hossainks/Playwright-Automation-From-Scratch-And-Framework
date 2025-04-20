class CheckoutPage {
  constructor(page, expect) {
    this.page = page;
    this.expect = expect;
    this.productNameonCart = page.locator("[class='cartSection'] h3");
    this.checkout = page.locator("li[class='totalRow'] button");
  }

  async verifyCart(productName) {
    this.expect(await this.productNameonCart.last().textContent()).toBe(
      productName
    );
  }

  async navigateToPlaceOrder() {
    await this.checkout.click();
    await this.page.getByText(' Payment Method ').waitFor();
  }
}

module.exports = { CheckoutPage };
