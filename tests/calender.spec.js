const { test, expect } = require('@playwright/test');

test('Calender Valiadation', async ({ page }) => {
  const month = '6';
  const date = '15';
  const year = '2027';

  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  await page.locator('.react-date-picker__inputGroup').click();
  await page.locator('button span').click();
  await page.locator('button span').click();
  //await page.locator('button span').click();

  await page.getByText(year).click();
  const monthLocator = page.locator("button[class*='months__month']");
  await monthLocator.nth(Number(month) - 1).click();
  await page.locator(`//abbr[text()=${date}]`).click();
  /* const dateLocator = page.locator("button[class*='days__day']");
  for (let i = 0; i < (await dateLocator.count()); i++) {
    const dateText = await dateLocator.nth(i).textContent();
    if (dateText === date) {
      await dateLocator.nth(i).click();
      break;
    }
  } */

  /* for (let i = 0; i < (await yearLocator.count()); i++) {
    const yearText = await yearLocator.nth(i).textContent();
    if (yearText === year) {
      await yearLocator.nth(i).click();
      break;
    }
  } */

  /*  for (let i = 0; i < (await monthLocator.count()); i++) {
    const monthText = await monthLocator.nth(i).textContent();
    if (monthText === month) {
      await monthLocator.nth(i).click();
      break;
    }
  }  */

  await page.waitForTimeout(10000);
});
