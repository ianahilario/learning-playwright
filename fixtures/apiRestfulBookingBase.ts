import {
  APIRequestContext,
  APIResponse,
  test as base,
  request,
  Request
} from '@playwright/test';

interface testFixtures {
  request: Request;
}

export const test = base.extend<testFixtures>({
  request: async ({}, use) => {
    console.log(`API base url: ${process.env.API_BASE_URL}`);
    const apiRequest: APIRequestContext = await request.newContext();
    return apiRequest
      .post(`https://restful-booker.herokuapp.com/auth`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: 'admin',
          password: 'password123'
        }
      })
      .then(async (response: APIResponse) => {
        console.log(
          `ResfulBooking /auth response: ${JSON.stringify(await response.json())}`
        );
        const token: string = (await response.json()).token;
        const contextOptions = {
          extraHTTPHeaders: {
            Authorization: `Bearer ${token}`
          }
        };
        await use(await request.newContext(contextOptions));
      });
  }
});
