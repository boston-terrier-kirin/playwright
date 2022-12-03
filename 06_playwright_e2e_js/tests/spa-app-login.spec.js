const { test, expect } = require('@playwright/test');
const { attachScreenshot } = require('../helpers');

test('すべての商品をチェック', async ({ page }, testInfo) => {
  await loginAuto(page);

  const cards = page.locator('.card-body');
  const cnt = await cards.count();
  expect(cnt).toBeGreaterThan(0);

  for (let i = 0; i < cnt; i++) {
    const card = cards.nth(i);
    const title = await card.locator('h5 b').innerText();

    // どちらでも動く
    // const buttons = card.locator('button');
    // await buttons.nth(0).click();
    const viewButton = card.locator('text=View');
    await viewButton.click();
    await page.waitForLoadState('networkidle');

    // これでimgが表示されるまで待つ様にする。
    await expect(page.locator('img')).toBeVisible();

    await attachScreenshot(
      testInfo,
      title,
      await page.screenshot({ fullPage: true })
    );
    await page.goBack();
  }
});

test('カートに追加', async ({ page }, testInfo) => {
  await loginAuto(page);

  const cards = page.locator('.card-body');
  const cardCnt = await cards.count();
  expect(cardCnt).toBeGreaterThan(0);

  const card = cards.nth(1);
  const addToCartButton = card.locator('button >> text=Add To Cart');
  await addToCartButton.click();

  // xhrが終わって、オーバーレイが消えるのを待つ
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.ngx-spinner-overlay', { state: 'hidden' });

  const cartButton = page.locator('[routerlink="/dashboard/cart"]');
  const cartItem = cartButton.locator('label');
  const cartItemCount = await cartItem.innerText();
  expect(cartItemCount).toBe('1');

  await cartButton.click();
  await page.waitForLoadState('networkidle');

  // xhrが終わって画面がロードされるのを待つ方法
  // 方法1
  await page.waitForSelector('.cartWrap');
  // 方法2
  // const cartSections = page.locator('.cartWrap');
  // await cartSections.waitFor();
  // 方法3
  // await expect(cartSections).toBeVisible();

  const checkoutButton = page.locator('button >> text=Checkout');
  await checkoutButton.click();
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'debug.png', fullPage: true });
});

async function loginAuto(page) {
  await page.goto('https://rahulshettyacademy.com/client/');

  const userEmail = page.locator('#userEmail');
  const userPassword = page.locator('#userPassword');
  const loginButton = page.locator('#login');

  await userEmail.fill('kohei.matsumoto.edu@gmail.com');
  await userPassword.fill('Iamking@000');
  await loginButton.click();

  // slowMoを使うと、networkidleの待ちが若干変わってしまう気がする。
  // home画面の画像がロードされきらない。
  await page.waitForLoadState('networkidle');
}
