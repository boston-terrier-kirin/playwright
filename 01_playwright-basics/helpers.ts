import { Page } from '@playwright/test';

export const loadLoginPage = async (page: Page) => {
  await page.goto('http://localhost:8090/sharetasks/');
};
