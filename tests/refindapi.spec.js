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
  const email = 'manjuk.hossainown@gmail.com';
  const emailText = page.locator("label[type='text']");

  const productName = 'ADIDAS ORIGINAL';
  const cart = page.locator("[routerlink*='cart']");
  const productNameonCart = page.locator("[class='cartSection'] h3");
  const checkout = page.locator("li[class='totalRow'] button");

  // Orders page
  const ordersPage = page.locator('h1.ng-star-inserted');
  const allOrders = page.locator('tbody');
  const orderSummary = page.locator('.email-title');
  const orderNumberinSummary = page.locator('.-main');

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

  await cart.click();
  expect(await productNameonCart.last().textContent()).toBe(productName);
  expect(
    await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
  ).toBeTruthy();

  await checkout.click();
  await page.getByText(' Payment Method ').waitFor();

  // Verify email details
  expect(await emailText.textContent()).toBe(email);

  const makeOrder = await apiUtils.createOrder(orderPayload, expect);
  const exactOrderNumer = makeOrder.orders[0];
  console.log(makeOrder.orders[0]);

  await ordersTab.click();
  await ordersPage.waitFor();
  await expect(ordersPage).toHaveText('Your Orders');

  const ordersCount = await allOrders.locator('tr').count();
  for (let i = 0; i < ordersCount; i++) {
    if (
      (await allOrders.locator('th').nth(i).textContent()) === exactOrderNumer
    ) {
      await allOrders.locator('td button.btn-primary').nth(i).click();
      break;
    }
  }
  await orderSummary.waitFor();
  await expect(orderNumberinSummary).toHaveText(exactOrderNumer);
});
