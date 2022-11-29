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

  const repos = await page.$$eval('article.border', (cards) => {
    return cards.map((card) => {
      const [user, repo] = Array.from(card.querySelectorAll('h3 a'));
      const formatText = (elem: any) => elem && elem.innerText.trim();

      return {
        user: formatText(user),
        repo: formatText(repo),
        url: (repo as HTMLAnchorElement).href,
      };
    });
  });

  console.log(repos);
  const logger = fs.createWriteStream('data.txt', { flags: 'w' });
  logger.write(JSON.stringify(repos, null, ' '));

  await context.close();
  await browser.close();
})();
