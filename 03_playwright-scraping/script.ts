// ブラウザはデフォルトでは、C:\Users\kohei\AppData\Local\ms-playwright にある。
// https://playwright.dev/docs/browsers#managing-browser-binaries

// これでブラウザを指定した場所にインストールする　*ps版
// Set-Item env:PLAYWRIGHT_BROWSERS_PATH D:\dev\udemy\javascript\69_playwright-scraping\pw-browsers
// npx playwright install

// これで実行すればOK
// set PLAYWRIGHT_BROWSERS_PATH=./pw-browsers
// npm run dev

import { chromium } from 'playwright';
import * as fs from 'fs';

const BASE_URL = 'https://github.com/topics/playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(BASE_URL);
  await page.screenshot({ path: 'topics.png' });

  // $$eval
  // https://playwright.dev/docs/api/class-page#page-eval-on-selector-all
  // In most cases, locator.evaluateAll(pageFunction[, arg]), other Locator helper methods and web-first assertions do a better job.
  const repos = await page.$$eval('article.border', (cards) =>
    cards.map((card) => {
      const [user, repo] = Array.from(
        card.querySelectorAll<HTMLElement>('h3 a')
      );

      const formatText = (elem: HTMLElement) => elem && elem.innerText.trim();

      return {
        user: formatText(user),
        repo: formatText(repo),
        url: (repo as HTMLAnchorElement).href,
      };
    })
  );

  const logger = fs.createWriteStream('data.txt', { flags: 'w' });
  logger.write(JSON.stringify(repos, null, ' '));

  // evaluateAll
  // https://playwright.dev/docs/api/class-locator#locator-evaluate-all
  const respoList = await page.locator('article.border').evaluateAll((cards) =>
    cards.map((card) => {
      const [user, repo] = Array.from(
        card.querySelectorAll<HTMLElement>('h3 a')
      );

      const formatText = (elem: HTMLElement) => elem && elem.innerText.trim();

      return {
        user: formatText(user),
        repo: formatText(repo),
        url: (repo as HTMLAnchorElement).href,
      };
    })
  );

  console.log('★', respoList);

  await context.close();
  await browser.close();
})();
