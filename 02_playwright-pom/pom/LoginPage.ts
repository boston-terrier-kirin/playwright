import { expect, Locator, Page } from '@playwright/test';
import { loadLoginPage } from '../helpers';

export class LoginPage {
  readonly page: Page;
  readonly title: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h2');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[name="login"]');
    this.usernameError = page.locator('#username_err');
    this.passwordError = page.locator('#password_err');
    this.registerButton = page.locator('#register');
  }

  async visit() {
    await loadLoginPage(this.page);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAuto() {
    await this.usernameInput.fill('kohei');
    await this.passwordInput.fill('11111');
    await this.loginButton.click();
  }

  async gotoRegister() {
    await this.registerButton.click();
  }

  async assertTitle() {
    await expect(this.title).toContainText('Login');
  }

  async assertErrors(errors: string[]) {
    const alerts = await this.page
      .locator('role=alert')
      .evaluateAll((alerts) => alerts.map((alert) => alert.innerHTML));

    expect(alerts).toStrictEqual(errors);
  }

  async assertInvalidError() {
    await expect(this.usernameError).toContainText('Invalid Credentials.');
    await expect(this.passwordError).toContainText('Invalid Credentials.');
  }
}
