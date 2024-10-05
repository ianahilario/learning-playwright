import { expect } from '@playwright/test';
import { test } from '../../../fixtures/apiRestfulBookingBase';

test('endpoint is up', { tag: '@p1' }, async ({ request }) => {
  const response = await request.get(
    `https://restful-booker.herokuapp.com/ping`
  );

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
});
