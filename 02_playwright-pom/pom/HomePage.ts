import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly username: Locator;
  readonly logoutButton: Locator;
  readonly taskTable: Locator;
  readonly newTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('#header');
    this.username = page.locator('#username');
    this.logoutButton = page.locator('#logout');
    this.taskTable = page.locator('#task-table');
    this.newTaskButton = page.locator('#new-task');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async assertUsername(username: string) {
    expect(this.username).toContainText(username);
  }

  async assertTaskTable() {
    expect(this.taskTable).toBeTruthy();
  }
}
