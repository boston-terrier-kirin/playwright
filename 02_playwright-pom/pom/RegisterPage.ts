import { expect, Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly title: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h2');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.locator('#register');
    this.usernameError = page.locator('#username_err');
    this.passwordError = page.locator('#password_err');
    this.loginButton = page.locator('button[name="login"]');
  }

  async visit() {
    this.page.goto('http://localhost:8090/sharetasks/user/register');
  }

  async assertTitle() {
    await expect(this.title).toContainText('Create An Account');
  }
}
