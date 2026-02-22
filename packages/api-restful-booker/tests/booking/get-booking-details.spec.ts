import { expect } from '@playwright/test';
import { test } from '../../fixtures/api-restful-booker';

test('able to get return booking details', async ({ restfulBookerApi }) => {
  const booking = await restfulBookerApi.bookingCreate.createBooking();
  const responseBody = await restfulBookerApi.bookingDetails.getBookingDetails(
    booking.bookingid.toString()
  );
  console.log(responseBody);

  expect
    .soft(responseBody)
    .toHaveProperty('firstname', booking.booking.firstname);
  expect
    .soft(responseBody)
    .toHaveProperty('lastname', booking.booking.lastname);
  expect
    .soft(responseBody)
    .toHaveProperty('totalprice', booking.booking.totalprice);
  expect
    .soft(responseBody)
    .toHaveProperty('depositpaid', booking.booking.depositpaid);
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkin', booking.booking.bookingdates.checkin);
  expect
    .soft(responseBody.bookingdates)
    .toHaveProperty('checkout', booking.booking.bookingdates.checkout);
  expect
    .soft(responseBody)
    .toHaveProperty('additionalneeds', booking.booking.additionalneeds);
});

test('able to handle non-existing booking id', async ({ restfulBookerApi }) => {
  const response = await restfulBookerApi.bookingDetails.sendRequest('abc');

  expect(response.ok()).not.toBeTruthy();
  expect(response.status()).toBe(404);
});
