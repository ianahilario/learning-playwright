import { expect } from '@playwright/test';
import { test } from '../../../fixtures/apiRestfulBookingBase';

test('able to get return booking details', async ({ request }) => {
  const response = await request.get(
    `https://restful-booker.herokuapp.com/booking/1`
  );
  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);

  expect.soft(responseBody).toHaveProperty('firstname', 'Mary');
  expect.soft(responseBody).toHaveProperty('lastname', 'Jones');
  expect.soft(responseBody).toHaveProperty('totalprice', 508);
  expect.soft(responseBody).toHaveProperty('depositpaid', false);
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkin', '2021-06-25');
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkout', '2024-02-26');
});

test('able to handle non-existing booking id', async ({ request }) => {
  const response = await request.get(
    `https://restful-booker.herokuapp.com/booking/abc`
  );

  expect(response.ok()).not.toBeTruthy();
  expect(response.status()).toBe(404);
});
