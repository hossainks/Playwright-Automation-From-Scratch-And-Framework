const { test, expect, request } = require('@playwright/test');
const ApiUtils = require('../utils/apiutils.js');
let apiUtils;

let apiContext;
let token;
test.beforeAll(async () => {
  apiContext = await request.newContext();
  apiUtils = new ApiUtils(apiContext);

  token = await apiUtils.getToken(expect);
  console.log(token);
  // Adding a Product to Cart
  const addtoCartUrl =
    'https://rahulshettyacademy.com/api/ecom/user/add-to-cart';
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

  const addToCartRes = await apiContext.post(addtoCartUrl, {
    data: productDetails,
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  });
  expect(addToCartRes.ok()).toBeTruthy();
  const addToCart = await addToCartRes.json();
  expect(addToCart.message).toBe('Product Added To Cart');
});

test.beforeEach(async ({ page }) => {});

test('Add a product to cart', async ({ page }) => {
  const email = 'manjuk.hossainown@gmail.com';
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);
  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('domcontentloaded');

  // Email Details
  const emailText = page.locator("label[type='text']");

  //const products = page.locator('.card-body');
  // const cardTitles = page.locator('.card-body b');
  const productName = 'ADIDAS ORIGINAL';
  const cart = page.locator("[routerlink*='cart']");
  const productNameonCart = page.locator("[class='cartSection'] h3");
  const checkout = page.locator("li[class='totalRow'] button");

  await cart.click();
  expect(await productNameonCart.last().textContent()).toBe(productName);
  expect(
    await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
  ).toBeTruthy();

  await checkout.click();
  await page.getByText(' Payment Method ').waitFor();

  // Verify email details
  expect(await emailText.textContent()).toBe(email);

  const createOrderUrl =
    'https://rahulshettyacademy.com/api/ecom/order/create-order';
  const orderPayload = {
    orders: [
      {
        country: 'India',
        productOrderedId: '67a8df1ac0d3e6622a297ccb',
      },
    ],
  };

  const makeOrderRes = await apiContext.post(createOrderUrl, {
    data: orderPayload,
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json',
    },
  });
  expect(makeOrderRes.ok()).toBeTruthy();
  const makeOrder = await makeOrderRes.json();
  const exactOrderNumer = makeOrder.orders[0];
  console.log(makeOrder.orders[0]);

  // Place order
  const ordersTab = page.locator("button[routerlink*='myorders']");

  // Orders page
  const ordersPage = page.locator('h1.ng-star-inserted');
  const allOrders = page.locator('tbody');
  const orderSummary = page.locator('.email-title');
  const orderNumberinSummary = page.locator('.-main');

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
