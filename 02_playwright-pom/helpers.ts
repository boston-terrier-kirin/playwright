import { Page, TestInfo } from '@playwright/test';

export const loadLoginPage = async (page: Page) => {
  await page.goto('http://localhost:8090/sharetasks/');
};

export const attachScreenshot = async (
  testInfo: TestInfo,
  screenshot: Buffer
) => {
  await testInfo.attach('screenshot', {
    body: screenshot,
    contentType: 'image/png',
  });
};
