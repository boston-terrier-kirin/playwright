import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pom/LoginPage';
import { loadLoginPage } from '../../helpers';

test.describe('Visual Regression', () => {
  test('Login', async ({ page }) => {
    await loadLoginPage(page);

    expect(await page.screenshot()).toMatchSnapshot('login.png');
  });
});
