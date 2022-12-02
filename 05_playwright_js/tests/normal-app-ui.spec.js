const { test, expect } = require('@playwright/test');
const { attachScreenshot } = require('../helpers');

test('Controls', async ({ page }, testInfo) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const username = page.locator('#username');
  const password = page.locator('#password');
  const userType = page.locator('.radiotextsty');
  const okButton = page.locator('#okayBtn');
  const dropdown = page.locator('select.form-control');
  const terms = page.locator('#terms');
  const signInButton = page.locator('#signInBtn');

  attachScreenshot(testInfo, await page.screenshot({ fullPage: true }));

  await username.fill('rahulshettyacademy');
  await password.fill('learning');

  // .radiotextstyはspanになっているが、クリックしてradioが反応するのであれば、spanのクリックでもOK
  await userType.nth(1).click();
  await okButton.click();

  // dropdownを選択する場合は、valueの方を指定する。
  await dropdown.selectOption('teach');

  await terms.click();

  attachScreenshot(testInfo, await page.screenshot({ fullPage: true }));

  await Promise.all([page.waitForNavigation(), signInButton.click()]);

  const brand = page.locator('.navbar-brand').nth(0);
  expect(brand).toContainText('ProtoCommerce');
});

test.only('Child Window', async ({ browser }, testInfo) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const blinkingText = page.locator('.blinkingText');

  // 新しいWindowを開く場合はこれ
  // Promise.allは、[page,void]を返すので、[newPage]にする。
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    blinkingText.click(),
  ]);
  // 子画面でxhrをやっているので、networkidleで待つ。
  await newPage.waitForLoadState('networkidle');

  await expect(newPage.locator('.inner-box h1')).toContainText(
    'Documents request'
  );

  // 子画面にいった後も親画面は操作できる
  const username = page.locator('#username');
  await username.fill('rahulshettyacademy');
  attachScreenshot(testInfo, await page.screenshot({ fullPage: true }));
});
