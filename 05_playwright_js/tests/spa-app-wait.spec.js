const { test, expect } = require('@playwright/test');

test('Login success', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/');

  const userEmail = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const loginButton = page.locator('#login');

  await userEmail.fill('anshika@gmail.com');
  await userPassword.fill('Iamking@000');
  await loginButton.click();

  // xhrを使ってロードしているので、networkidleで待つようにする。networkidleはxhrの時に使う模様。
  await page.waitForLoadState('networkidle');

  // spaの場合はnetworkidleを待てばOK
  const cards = page.locator('.card-body h5 b');
  const cnt = await cards.count();
  expect(cnt).toBeGreaterThan(0);

  const allTitle = await cards.allInnerTexts();
  console.log(allTitle);

  await page.screenshot({ path: 'debug.png', fullPage: true });
});
