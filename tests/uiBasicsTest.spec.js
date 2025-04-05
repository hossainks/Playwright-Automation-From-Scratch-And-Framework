const { test, expect } = require('@playwright/test');
const { ok } = require('assert');

test.only('Login as User with Valid Credentials', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const userNmae = page.locator('#username');
  const password = page.locator('input#password');
  const signIn = page.locator('[id="signInBtn"]');
  const cardTitles = page.locator('.card-title a');

  const title = await page.title();
  console.log(title);

  await userNmae.fill('rahulshettyacademy');
  await password.fill('learning');
  await signIn.click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveTitle('ProtoCommerce');
  await expect(cardTitles.first()).toContainText('iphone X');
  await expect(cardTitles.nth(1)).toContainText('Samsung Note 8');
  console.log(await cardTitles.allTextContents());
});

test('Login as User with wrong Details ', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.waitForLoadState('domcontentloaded');
  const title = await page.title();
  console.log(title);
  await page.locator('#username').fill('rahulshetty');
  await page.locator('input#password').fill('learning');
  await page.locator('[id="signInBtn"]').click();
  const errorMessage = await page.locator('[style*="block"]').textContent();
  console.log(errorMessage);
  await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
  // const errorMessage = await page
  //   .locator('[class*="alert-danger"]')
  //   .textContent();
  // console.log(errorMessage.trim());
  await page.locator('//div/strong[text()="Incorrect"]').isVisible();
});

test(' Page context test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  const title = await page.title();
  console.log(title);
  await page.waitForTimeout(2000);
  await expect(page).toHaveTitle('Google');
});

const isBlinking = async (page, locator) => {
  // Get initial opacity
  let lastOpacity = await locator.evaluate(
    (el) => window.getComputedStyle(el).opacity
  );

  // Extract the actual DOM element
  const elementHandle = await locator.elementHandle();

  // Wait until opacity changes
  await page.waitForFunction(
    (el, lastOpacity) => {
      const opacity = window.getComputedStyle(el).opacity;
      return opacity !== lastOpacity;
    },
    elementHandle, // Pass the actual DOM element
    lastOpacity // Pass the previous opacity value
  );
};

test(' UI controls', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const userNmae = page.locator('#username');
  const password = page.locator('input#password');
  const signIn = page.locator('[id="signInBtn"]');
  const dropdown = page.locator('select.form-control');
  const radio = page.locator("input[type='radio']").last();
  const okbutton = page.locator('#okayBtn');
  const terms = page.locator("input[name='terms']");
  const blinkText = page.locator("[href*='documents-request']");
  await dropdown.selectOption('consult');
  if (!(await radio.isChecked())) {
    await radio.check();
  }
  await okbutton.click();
  await expect(radio).toBeChecked();
  await terms.check();
  await expect(terms).toBeChecked();
  await terms.uncheck();
  await expect(terms).not.toBeChecked();
  expect(await terms.isChecked()).toBeFalsy();
  await expect(blinkText).toHaveAttribute('class', 'blinkingText');
  await isBlinking(page, blinkText);
  //await page.pause();
  await page.waitForTimeout(5000);
});

test(' Child Window', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userNmae = page.locator('#username');

  const blinkText = page.locator("[href*='documents-request']");
  await expect(blinkText).toHaveAttribute('class', 'blinkingText');
  await isBlinking(page, blinkText);

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    blinkText.click(),
  ]);

  await newPage.waitForLoadState('load');
  const emailText = newPage.locator('p[class*="red"]');
  console.log(await emailText.textContent());

  const emailPart = await newPage.locator('p[class*="red"] a').textContent();
  const [, email] = emailPart.split('@');
  //const email = emailPart.split('@')[1];
  console.log(email);
  await page.bringToFront();
  await userNmae.fill(email);

  await newPage.waitForTimeout(5000);
});

test('Abort Testing', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.route('**/*.css', (route) => {
    route.abort();
  });

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const userNmae = page.locator('#username');
  const password = page.locator('input#password');
  const signIn = page.locator('[id="signInBtn"]');
  const cardTitles = page.locator('.card-title a');

  const title = await page.title();
  console.log(title);

  await page.route('**/*', (route) => {
    const request = route.request();
    if (request.url().includes('.jpg')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  page.on('request', (request) => {
    console.log(`Request: ${request.method()} ${request.url()}`);
  });
  page.on('response', (response) => {
    console.log(`Response: ${response.url()} ` + response.status());
  });

  await userNmae.fill('rahulshettyacademy');
  await password.fill('learning');
  await signIn.click();

  await page.route('**/*.{jpg}', (route) => {
    route.abort();
  });

  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveTitle('ProtoCommerce');
  await expect(cardTitles.first()).toContainText('iphone X');
  await expect(cardTitles.nth(1)).toContainText('Samsung Note 8');
  console.log(await cardTitles.allTextContents());
  await page.waitForTimeout(5000);
});
