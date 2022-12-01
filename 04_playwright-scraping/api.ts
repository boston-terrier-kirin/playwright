import { request } from 'playwright';

const baseUrl = 'https://reqres.in/api';

(async () => {
  const context = await request.newContext();

  let promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(loginAuto(context, 'kohei'));
  }

  Promise.all(promises).then((results) => {
    console.log(results);
  });

  //await context.dispose();
})();

async function loginAuto(request, user) {
  const res = await request.post('http://localhost:8090/task_api/login.php/', {
    data: {
      username: user,
      password: '11111',
    },
  });

  const loginData = await res.json();
  const accessToken = loginData.access_token;
  const refreshToken = loginData.refresh_token;

  return {
    accessToken,
    refreshToken,
  };
}
