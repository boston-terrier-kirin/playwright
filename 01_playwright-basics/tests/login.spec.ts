import { test, expect } from '@playwright/test';
import { loadLoginPage } from '../helpers';

test.describe('Login failed', () => {
  test.beforeEach(() => {
    console.log('beforeEach');
  });

  test('Login failed with empty credentials', async ({ page }) => {
    await loadLoginPage(page);
    await page.locator('button[name="login"]').click();

    const usernameError = page.locator('#username_err');
    const passwordError = page.locator('#password_err');

    // toContainTextは、Locatorの中のtextをチェックするので、Promiseを返している
    await expect(usernameError).toContainText('メールアドレスは必須入力です。');
    await expect(passwordError).toContainText('パスワードは必須入力です。');
  });

  test('Login failed with invalid credentials', async ({ page }) => {
    await loadLoginPage(page);
    await page.locator('#username').fill('test');
    await page.locator('#password').fill('test');
    await page.locator('button[name="login"]').click();

    // これで、inspectorが起動してdebugできるようになる
    // await page.pause();

    const usernameError = page.locator('#username_err');
    const passwordError = page.locator('#password_err');

    // toContainTextは、Locatorの中のtextをチェックするので、Promiseを返している
    await expect(usernameError).toContainText('Invalid Credentials.');
    await expect(passwordError).toContainText('Invalid Credentials.');
  });
});

// test.skip でスキップできる
// test.only で1つだけ実行できる
test('Login success', async ({ page }, testInfo) => {
  await loadLoginPage(page);
  await page.locator('#username').fill('kohei');
  await page.locator('#password').fill('11111');
  await page.locator('button[name="login"]').click();

  const table = page.locator('#task-table');

  // テキストまで取得する場合は、innerText() を使う
  const newTaskBtn = page.locator('.btn.btn-primary');
  const newTaskBtnText = await newTaskBtn.innerText();

  // 部分的にscreenshotを取って、レポートに含める
  const screenshot = await newTaskBtn.screenshot();
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });

  expect(table).toBeTruthy();
  expect(newTaskBtnText.trim()).toBe('新しいタスク');
});
