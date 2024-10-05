import { expect } from '@playwright/test';
import { test } from '../../../fixtures/apiRestfulBookingBase';

test('able to get return booking details', async ({ request }) => {
  const response = await request.get(`${process.env.API_BASE_URL}/booking/1`);
  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);

  expect.soft(responseBody).toHaveProperty('firstname', 'Michael');
  expect.soft(responseBody).toHaveProperty('lastname', 'Pangilinan');
  expect.soft(responseBody).toHaveProperty('totalprice', 100);
  expect.soft(responseBody).toHaveProperty('depositpaid', true);
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkin', '2023-06-01');
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkout', '2024-06-27');
  expect.soft(responseBody).toHaveProperty('additionalneeds', 'with window');
});

test('able to handle non-existing booking id', async ({ request }) => {
  const response = await request.get(
    `https://restful-booker.herokuapp.com/booking/abc`
  );

  expect(response.ok()).not.toBeTruthy();
  expect(response.status()).toBe(404);
});
