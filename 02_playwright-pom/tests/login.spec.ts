import { test } from '@playwright/test';
import { HomePage } from '../pom/HomePage';
import { LoginPage } from '../pom/LoginPage';
import { RegisterPage } from '../pom/RegisterPage';
import { attachScreenshot } from '../helpers';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.visit();
  });

  test('メールアドレス、パスワード未入力', async ({ page }) => {
    await loginPage.login('', '');
    await loginPage.assertErrors([
      'メールアドレスは必須入力です。',
      'パスワードは必須入力です。',
    ]);
  });

  test('メールアドレス未入力', async ({ page }) => {
    await loginPage.login('', 'test');
    await loginPage.assertErrors(['メールアドレスは必須入力です。']);
  });

  test('パスワード未入力', async ({ page }) => {
    await loginPage.login('test', '');
    await loginPage.assertErrors(['パスワードは必須入力です。']);
  });

  test('メールアドレス、パスワード不正', async ({ page }) => {
    await loginPage.login('invalid_username', 'invalid_password');
    await loginPage.assertErrors([
      'Invalid Credentials.',
      'Invalid Credentials.',
    ]);
  });

  test('ログイン成功', async ({ page }) => {
    await loginPage.login('kohei', '11111');

    const homePage = new HomePage(page);
    await homePage.assertTaskTable();
    await homePage.assertUsername('kohei');
  });

  test('ログアウト', async ({ page }, testInfo) => {
    await loginPage.loginAuto();

    const homePage = new HomePage(page);
    await attachScreenshot(testInfo, await homePage.page.screenshot());

    await homePage.logout();

    await loginPage.assertTitle();
  });

  test('Registerに遷移', async ({ page }) => {
    await loginPage.gotoRegister();

    const registerPage = new RegisterPage(page);
    registerPage.assertTitle();
  });
});
