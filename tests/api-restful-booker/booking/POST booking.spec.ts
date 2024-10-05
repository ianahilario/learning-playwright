import { expect } from '@playwright/test';
import { test } from '../../../fixtures/apiRestfulBookingBase';

interface requestBody {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

test('able to add booking', async ({ request }) => {
  const requestBody: requestBody = {
    firstname: 'Michael',
    lastname: 'Pangilinan',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2023-06-01',
      checkout: '2024-06-27'
    },
    additionalneeds: 'with window'
  };

  const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
    data: requestBody
  });
  console.log(await response.json());

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);

  expect.soft(responseBody).toHaveProperty('bookingid');
  expect.soft(responseBody.booking).toHaveProperty('firstname', 'Michael');
  expect.soft(responseBody.booking).toHaveProperty('lastname', 'Pangilinan');
  expect.soft(responseBody.booking).toHaveProperty('totalprice', 100);
  expect.soft(responseBody.booking).toHaveProperty('depositpaid', true);
  expect.soft(responseBody.booking.bookingdates).toHaveProperty('checkin', '2023-06-01');
  expect.soft(responseBody.booking.bookingdates).toHaveProperty('checkout', '2024-06-27');
  expect.soft(responseBody.booking).toHaveProperty('additionalneeds', 'with window');
});
