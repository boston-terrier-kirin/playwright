const { test, expect } = require('@playwright/test');

test('BrowserContext test', async ({ browser }) => {
  // browserにCookieとかをセットする場合はここから始める
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/locatorspractice/');

  const inputUsername = page.locator('#inputUsername');
  await inputUsername.fill('kohei');

  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  // これだけだと、エラーメッセージのスクショが取れない
  // await page.waitForLoadState('domcontentloaded');

  // これをやると、autowaitが効くのか、エラーが出るまで待ってくれる
  // await expect(page.locator('.error')).toBeVisible();

  // もしくはこれでも待ってくれる
  const error = await page.locator('.error').innerText();
  console.log(error);

  await page.screenshot({ path: 'login.png' });
});
