class DashboardPage {
  constructor(page) {
    this.products = page.locator('.card-body');
    this.productsName = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName) {
    await this.productsName.first().waitFor();
    console.log(await this.productsName.allTextContents());
    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      if (
        (await this.products.nth(i).locator('b').textContent()) === productName
      ) {
        const addToCart = this.products.nth(i).locator('text= Add To Cart');
        await addToCart.click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }
}

module.exports = { DashboardPage };
