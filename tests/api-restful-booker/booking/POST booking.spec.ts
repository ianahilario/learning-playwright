import { expect } from '@playwright/test';
import { test } from '../../../fixtures/apiRestfulBookingBase';

let requestBody;
async function createBookingBody() {
  const body = {
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

  return body;
}

test.beforeEach(async () => {
  requestBody = await createBookingBody();
});

test('able to add booking', async ({ request }) => {
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

test.describe('firstname attribute validation', () => {
  test('field is required', async ({ request }) => {
    delete requestBody.firstname;
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test("field doesn't accept null", async ({ request }) => {
    requestBody.firstname = null;
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test("field doesn't accept blank", async ({ request }) => {
    requestBody.firstname = '';
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test("field doesn't accept number", async ({ request }) => {
    requestBody.firstname = 123;
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });
});

test.describe('lastname attribute validation', () => {
  test('field is required', async ({ request }) => {
    delete requestBody.lastname;
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test("field doesn't accept null", async ({ request }) => {
    requestBody.lastname = null;
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test("field doesn't accept blank", async ({ request }) => {
    requestBody.lastname = '';
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test("field doesn't accept number", async ({ request }) => {
    requestBody.lastname = 123;
    const response = await request.post(`${process.env.API_BASE_URL}/booking`, {
      data: requestBody
    });

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });
});
