class ApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken(expect) {
    const url = 'https://rahulshettyacademy.com/api/ecom/auth/login';
    const response = await this.apiContext.post(url, {
      data: this.loginPayload,
    });
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    return responseBody.token;
  }

  async addProductToCart(productDetails, expect) {
    const addtoCartUrl =
      'https://rahulshettyacademy.com/api/ecom/user/add-to-cart';
    const addToCartRes = await this.apiContext.post(addtoCartUrl, {
      data: productDetails,
      headers: {
        Authorization: await this.getToken(expect),
        'Content-Type': 'application/json',
      },
    });
    expect(addToCartRes.ok()).toBeTruthy();
    return await addToCartRes.json();
  }

  async createOrder(orderPayload, expect) {
    const createOrderUrl =
      'https://rahulshettyacademy.com/api/ecom/order/create-order';
    const makeOrderRes = await this.apiContext.post(createOrderUrl, {
      data: orderPayload,
      headers: {
        Authorization: await this.getToken(expect),
        'Content-Type': 'application/json',
      },
    });
    expect(makeOrderRes.ok()).toBeTruthy();
    return await makeOrderRes.json();
  }
}

module.exports = ApiUtils;
