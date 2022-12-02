const { test, expect } = require('@playwright/test');

test('Login failed then wait pattern-1', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const username = page.locator('#username');
  // typeは1文字づつ入力する
  await username.type('matsumoto');
  // fillは上書きで丸っと入力する
  await username.fill('kohei');

  const signInButton = page.locator('#signInBtn');
  await signInButton.click();

  // これだけだと、エラーメッセージのスクショが取れない
  // パスワード未入力の場合、ネットワークアクセスしていないので、loadStateではなにもできない。
  // await page.waitForLoadState('domcontentloaded');

  // これをやると、autowaitが効くのか、エラーが出るまで待ってくれる
  // await expect(page.locator('.alert.alert-danger')).toBeVisible();

  // もしくはこれでも待ってくれる
  const error = await page.locator('.alert.alert-danger').innerText();
  console.log(error);

  await page.screenshot({ path: 'debug.png' });
});

test('Login failed then wait pattern-2', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const username = page.locator('#username');
  const password = page.locator('#password');
  const signInButton = page.locator('#signInBtn');

  await username.fill('kohei');
  await password.fill('matsumoto');

  // 残念ながらネットワークアクセスなしで、エラーが発生してナビゲートしない場合は、タイムアウトエラーになってしまう。
  // await Promise.all([page.waitForNavigation(), signInButton.click()]);

  await page.screenshot({ path: 'debug.png' });
});

test('Login success then wait pattern-1', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const username = page.locator('#username');
  const password = page.locator('#password');
  const signInButton = page.locator('#signInBtn');

  await username.fill('rahulshettyacademy');
  await password.fill('learning');
  await signInButton.click();

  // xhrを使ってロードしている訳ではないので、これでは待ってくれない。
  // サーバから一括でレスポンスが返ってきているんで、既にネットワークアイドルになっている。
  // await page.waitForLoadState('networkidle');

  // 複数あるうちの最初の1つをGETする場合、nth(0) / first が使える
  const titles = page.locator('.card-body a');
  // const firstTitle = await titles.first().innerText();
  // const secondTitle = await titles.nth(1).innerText();
  // console.log(firstTitle, secondTitle);

  // 全部GETする場合はこれ
  // ただし、allInnerTextsは待ってくれないので、allInnerTextsだけだと[]が返ってきてしまう。
  // 前段で、await titles.last()を呼ばないとダメ。
  // https://playwright.dev/docs/actionability
  await expect(titles.last()).toBeVisible();
  const allTitles = await titles.allInnerTexts();
  console.log(allTitles);

  await page.screenshot({ path: 'debug.png' });
});

test('Login success then wait pattern-2', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const username = page.locator('#username');
  const password = page.locator('#password');
  const signInButton = page.locator('#signInBtn');

  await username.fill('rahulshettyacademy');
  await password.fill('learning');

  // もしくはこれでも待ってくれる
  await Promise.all([page.waitForNavigation(), signInButton.click()]);

  const titles = page.locator('.card-body a');
  const allTitles = await titles.allInnerTexts();
  console.log(allTitles);

  await page.screenshot({ path: 'debug.png' });
});
