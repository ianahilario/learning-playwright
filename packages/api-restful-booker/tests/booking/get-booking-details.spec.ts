import { expect } from '@playwright/test';
import { test } from '../../fixtures/api-restful-booker';

test('able to get return booking details', async ({ restfulBookerApi }) => {
  const responseBody =
    await restfulBookerApi.bookingDetails.getBookingDetails('1');
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

test('able to handle non-existing booking id', async ({ restfulBookerApi }) => {
  const response = await restfulBookerApi.bookingDetails.sendRequest('abc');

  expect(response.ok()).not.toBeTruthy();
  expect(response.status()).toBe(404);
});
