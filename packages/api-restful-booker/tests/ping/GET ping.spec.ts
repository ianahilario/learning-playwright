import { expect } from '@playwright/test';
import { test } from '../../fixtures/api-restful-booker';

test('endpoint is up', { tag: '@p1' }, async ({ request }) => {
  const response = await request.get(`${process.env.API_BASE_URL}/ping`);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
});
