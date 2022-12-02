const { test, expect } = require('@playwright/test');

test('Login failed then wait pattern-1', async ({ page }) => {
  await page.goto('http://localhost:8090/sharetasks/');

  const username = page.locator('#username');
  const password = page.locator('#password');
  const login = page.locator('button[name=login]');

  await username.fill('kohei');
  await password.fill('matsumoto');

  // 残念ながらこれでは待てない
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'debug.png' });
});

test('Login failed then wait pattern-2', async ({ page }) => {
  await page.goto('http://localhost:8090/sharetasks/');

  const username = page.locator('#username');
  const password = page.locator('#password');
  const login = page.locator('button[name=login]');

  await username.fill('kohei');
  await password.fill('matsumoto');

  // ネットワークアクセスが発生している場合、これでもOK
  await Promise.all([page.waitForNavigation(), login.click()]);

  await page.screenshot({ path: 'debug.png' });
});

test.only('Login success then wait pattern-1', async ({ page }) => {
  await page.goto('http://localhost:8090/sharetasks/');

  const username = page.locator('#username');
  const password = page.locator('#password');
  const login = page.locator('button[name=login]');

  await username.fill('kohei');
  await password.fill('11111');
  await login.click();

  // home.php -> task.php 間のxhrに時間がかかっても、networkidleで待てる。
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: 'debug.png' });
});
