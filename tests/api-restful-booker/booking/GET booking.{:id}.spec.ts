import { expect } from '@playwright/test';
import { test } from '../../../fixtures/api-restful-booker';

test('able to get return booking details', async ({ request }) => {
  const response = await request.get(`${process.env.API_BASE_URL}/booking/1`);
  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);

  expect.soft(responseBody).toHaveProperty('firstname', 'Sally');
  expect.soft(responseBody).toHaveProperty('lastname', 'Brown');
  expect.soft(responseBody).toHaveProperty('totalprice', 290);
  expect.soft(responseBody).toHaveProperty('depositpaid', true);
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkin', '2019-07-11');
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkout', '2022-02-06');
  expect.soft(responseBody).toHaveProperty('additionalneeds', 'Breakfast');
});

test('able to handle non-existing booking id', async ({ request }) => {
  const response = await request.get(
    `https://restful-booker.herokuapp.com/booking/abc`
  );

  expect(response.ok()).not.toBeTruthy();
  expect(response.status()).toBe(404);
});
