import { test, expect } from '@playwright/test';

const baseUrl = 'https://reqres.in/api';

test.describe.parallel('API testing', () => {
  test('Check status', async ({ request }) => {
    const res = await request.get(`${baseUrl}/users/1`);

    expect(res.status()).toBe(200);
  });

  test('Parse JSON', async ({ request }) => {
    const res = await request.get(`${baseUrl}/users/1`);
    const body = await res.json();
    console.log(body);
  });
});
