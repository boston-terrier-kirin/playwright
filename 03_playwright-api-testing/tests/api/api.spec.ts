import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:8090/task_api';

test.describe.parallel('API testing', () => {
  test('ログイン', async ({ request }) => {
    const res = await request.post(`${baseUrl}/login.php`, {
      data: {
        username: 'kohei',
        password: '11111',
      },
    });

    const data = await res.json();
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    expect(res.status()).toBe(200);
    expect(accessToken).toBeTruthy();
    expect(refreshToken).toBeTruthy();
  });

  test('不正なログイン(パスワード間違い)', async ({ request }) => {
    const res = await request.post(`${baseUrl}/login.php`, {
      data: {
        username: 'kohei',
        password: '999999',
      },
    });

    expect(res.status()).toBe(401);
  });

  test('不正なログイン(存在しないユーザ)', async ({ request }) => {
    const res = await request.post(`${baseUrl}/login.php`, {
      data: {
        username: 'kopei',
        password: '111111',
      },
    });

    expect(res.status()).toBe(401);
  });

  test('tokenなしでget', async ({ request }) => {
    const res = await request.get(`${baseUrl}/tasks/`);

    expect(res.status()).toBe(400);
  });

  test('不正なtokenでget', async ({ request }) => {
    const res = await request.get(`${baseUrl}/tasks/`, {
      headers: {
        Authorization: `Bearer 123`,
      },
    });

    expect(res.status()).toBe(400);
  });

  test('Tokenを多重でGET', async ({ request }) => {
    let promises: any = [];
    for (let i = 0; i < 5; i++) {
      promises.push(loginAuto(request));
    }

    await Promise.all(promises).then((results) => {
      console.log(results);
    });
  });

  test('POST new post', async ({ request }) => {
    const { accessToken, refreshToken } = await loginAuto(request);

    const res = await request.post('http://localhost:8090/task_api/tasks/', {
      data: {
        name: 'Today is cold',
        priority: 1,
        is_completed: 0,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    expect(data.id).toBeTruthy();

    console.log(data);
  });

  test('GET all post', async ({ request }) => {
    const { accessToken, refreshToken } = await loginAuto(request);

    const res = await request.get('http://localhost:8090/task_api/tasks/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    expect(data.length).toBeGreaterThan(0);

    console.log(data);
  });
});

async function loginAuto(request) {
  const res = await request.post('http://localhost:8090/task_api/login.php/', {
    data: {
      username: 'kohei',
      password: '11111',
    },
  });

  try {
    const loginData = await res.json();
    const accessToken = loginData.access_token;
    const refreshToken = loginData.refresh_token;

    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    // エラーが発生する場合は、res.text()で内容をGETできる。
    // レポートにもstdoutとして登録される。
    console.log(await res.text());
    console.log(e);
    throw e;
  }
}
