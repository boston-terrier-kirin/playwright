import { request } from 'playwright';

const baseUrl = 'https://reqres.in/api';

(async () => {
  const context = await request.newContext();

  const res = await context.get(`${baseUrl}/users/1`);
  const body = await res.json();

  console.log(body.data);
  console.log(body.support);

  await context.dispose();
})();
