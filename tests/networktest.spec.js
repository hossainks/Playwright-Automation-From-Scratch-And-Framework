const { test, expect, request } = require('@playwright/test');
const ApiUtils = require('../utils/apiutils');

let apiUtils;
let apiContext;

const loginPayload = {
  userEmail: 'manjuk.hossainown@gmail.com',
  userPassword: 'KhaTest123456%',
};

const productDetails = {
  _id: '67d70135c019fb1ad62940b1',
  product: {
    _id: '67a8df1ac0d3e6622a297ccb',
    productName: 'ADIDAS ORIGINAL',
    productCategory: 'fashion',
    productSubCategory: 'shirts',
    productPrice: 31500,
    productDescription: 'Addias Originals',
    productImage:
      'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg',
    productRating: '0',
    productTotalOrders: '0',
    productStatus: true,
    productFor: 'women',
    productAddedBy: 'admin@gmail.com',
  },
};

const orderPayload = {
  orders: [
    {
      country: 'India',
      productOrderedId: '67a8df1ac0d3e6622a297ccb',
    },
  ],
};

test.beforeAll(async () => {
  apiContext = await request.newContext();
  apiUtils = new ApiUtils(apiContext, loginPayload);
});

test('Add a product to cart', async ({ page }) => {
  //Locators
  // Orders page
  const ordersPage = page.locator('h1.ng-star-inserted');
  // Place order
  const ordersTab = page.locator("button[routerlink*='myorders']");

  // Actual Test
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, await apiUtils.getToken(expect));
  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('domcontentloaded');

  const addToCart = await apiUtils.addProductToCart(productDetails, expect);
  expect(addToCart.message).toBe('Product Added To Cart');

  const makeOrder = await apiUtils.createOrder(orderPayload, expect);
  const exactOrderNumer = makeOrder.orders[0];
  console.log(makeOrder.orders[0]);

  await ordersTab.click();
  await ordersPage.waitFor();
  await expect(ordersPage).toHaveText('Your Orders');
});
