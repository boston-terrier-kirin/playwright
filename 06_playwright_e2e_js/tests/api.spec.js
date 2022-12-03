const { test, expect, request } = require('@playwright/test');

let token = '';

test.describe('API testing', () => {
  test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const res = await apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: {
          userEmail: 'kohei.matsumoto.edu@gmail.com',
          userPassword: 'Iamking@000',
        },
      }
    );

    expect(res.ok()).toBeTruthy();

    const data = await res.json();
    token = data.token;
    console.log(token);
  });

  test.only('Login with token', async ({ page }) => {
    await page.addInitScript((value) => {
      window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('.card-body');
    const cnt = await cards.count();
    expect(cnt).toBeGreaterThan(0);

    const card = cards.nth(1);
    const addToCartButton = card.locator('button >> text=Add To Cart');
    await addToCartButton.click();

    // xhrが終わって、オーバーレイが消えるのを待つ
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.ngx-spinner-overlay', { state: 'hidden' });

    await page.screenshot({ path: 'debug.png', fullPage: true });
  });
});
