class PlaceorderPage {
  constructor(page, expect) {
    // this.page = page;
    this.expect = expect;
    // Locator for payment method
    this.expiryMonth = page.locator('select.input.ddl').nth(0);
    this.expiryDate = page.locator('select.input.ddl').nth(1);
    this.cvv = page.locator("div.field.small input[class='input txt']");
    this.cardName = page.locator("input[class='input txt']").last();
    this.coupon = page.locator("input[name='coupon']");
    this.applyCoupon = page.locator("button[type='submit']");

    // Locator for shipping address
    this.countryType = page.locator("[placeholder*='Country']");
    this.countryOptions = page.locator("[class*='ta-results']");

    // Email Details
    this.emailText = page.locator("label[type='text']");

    // Place order
    this.placeOrder = page.locator('.action__submit');
  }

  async verifyEmail(email) {
    this.expect(await this.emailText.textContent()).toBe(email);
  }

  async fillPaymentDetails() {
    await this.expiryMonth.selectOption('10');
    await this.expiryDate.selectOption('25');
    await this.cardName.fill('Manjuk Hossain');
    await this.cvv.fill('654');
    await this.coupon.fill('rahylshettyacademy');
  }

  async fillShippingAddress() {
    await this.countryType.pressSequentially('ind');
    await this.countryOptions.waitFor();
    const countryOptionsCount = await this.countryOptions
      .locator('button')
      .count();
    for (let i = 0; i < countryOptionsCount; i++) {
      if (
        (await this.countryOptions.locator('button').nth(i).textContent()) ===
        ' India'
      ) {
        await this.countryOptions.locator('button').nth(i).click();
        break;
      }
    }
  }

  async submitOrder() {
    await this.placeOrder.click();
  }
}

module.exports = { PlaceorderPage };
