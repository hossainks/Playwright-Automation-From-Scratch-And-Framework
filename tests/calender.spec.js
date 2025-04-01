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
  const selectedDate = await page
    .locator('.react-date-picker__inputGroup')
    .textContent();

  // One way
  const getMonth = await page.locator("[name='month']").inputValue();
  const getDate = await page.locator("[name='day']").inputValue();
  const getYear = await page.locator("[name='year']").inputValue();
  expect(getMonth).toBe(month);
  expect(getDate).toBe(date);
  expect(getYear).toBe(year);

  // Another way
  const getFullDate = page.locator('.react-date-picker__inputGroup input');
  for (let i = 0; i < (await getFullDate.count()); i++) {
    const getDate = await getFullDate.nth(i).inputValue();
    if (i == 1) {
      expect(getDate).toBe(month);
    } else if (i == 2) {
      expect(getDate).toBe(date);
    } else if (i == 3) {
      expect(getDate).toBe(year);
    }
  }

  // Another way
  const expectedList = [month, date, year];
  const inputs = page.locator('.react-date-picker__inputGroup input');
  for (let index = 0; index < expectedList.length; index++) {
    const value = await inputs.nth(index + 1).getAttribute('value');
    expect(value).toEqual(expectedList[index]);
  }

  await page.waitForTimeout(10000);
});
