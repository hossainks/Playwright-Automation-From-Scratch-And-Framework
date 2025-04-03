class ApiUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  async getToken(expect) {
    const url = 'https://rahulshettyacademy.com/api/ecom/auth/login';
    const loginPayload = {
      userEmail: 'manjuk.hossainown@gmail.com',
      userPassword: 'KhaTest123456%',
    };
    const response = await this.apiContext.post(url, { data: loginPayload });
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
}

module.exports = ApiUtils;
