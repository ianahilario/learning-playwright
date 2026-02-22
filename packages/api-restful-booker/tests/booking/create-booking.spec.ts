import { expect } from '@playwright/test';
import { test } from '../../fixtures/api-restful-booker';
import { Tags, Teams, TestTags } from '../../../../commons/test-tags';
import { TestAnnotations } from '../../../../commons/test-annotations';

test('able to add booking', async ({ restfulBookerApi }) => {
  const requestBody = await restfulBookerApi.bookingCreate.createRequestBody();
  const responseBody =
    await restfulBookerApi.bookingCreate.createBooking(requestBody);

  expect.soft(responseBody).toHaveProperty('bookingid');
  expect
    .soft(responseBody.booking)
    .toHaveProperty('firstname', requestBody.firstname);
  expect
    .soft(responseBody.booking)
    .toHaveProperty('lastname', requestBody.lastname);
  expect
    .soft(responseBody.booking)
    .toHaveProperty('totalprice', requestBody.totalprice);
  expect
    .soft(responseBody.booking)
    .toHaveProperty('depositpaid', requestBody.depositpaid);
  expect
    .soft(responseBody.booking.bookingdates)
    .toHaveProperty('checkin', requestBody.bookingdates.checkin);
  expect
    .soft(responseBody.booking.bookingdates)
    .toHaveProperty('checkout', requestBody.bookingdates.checkout);
  expect
    .soft(responseBody.booking)
    .toHaveProperty('additionalneeds', requestBody.additionalneeds);
});

test.describe('firstname attribute validation', () => {
  test('field is required', async ({ restfulBookerApi }) => {
    const requestBody =
      await restfulBookerApi.bookingCreate.createRequestBody();
    const { firstname, ...requestBodyWithoutFirstname } = requestBody;
    const response = await restfulBookerApi.bookingCreate.sendRequest(
      requestBodyWithoutFirstname
    );

    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test("field doesn't accept null", async ({ restfulBookerApi }) => {
    const requestBody =
      await restfulBookerApi.bookingCreate.createRequestBody();
    const requestBodyWithNull = { ...requestBody, firstname: null };
    const response =
      await restfulBookerApi.bookingCreate.sendRequest(requestBodyWithNull);

    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });

  test(
    "field doesn't accept blank",
    {
      tag: TestTags.setTestTags({ team: Teams.TEAM_NAME, tags: [Tags.FAILED] }),
      annotation: [...TestAnnotations.setOpenBugInfo({ ticketId: ['BUG-123'] })]
    },
    async ({ restfulBookerApi }) => {
      const requestBody =
        await restfulBookerApi.bookingCreate.createRequestBody();
      requestBody.firstname = '';
      const response =
        await restfulBookerApi.bookingCreate.sendRequest(requestBody);

      expect(response.ok()).not.toBeTruthy();
      expect(response.status()).toBe(500);
    }
  );

  test("field doesn't accept number", async ({ restfulBookerApi }) => {
    const requestBody =
      await restfulBookerApi.bookingCreate.createRequestBody();
    const requestBodyWithNum = { ...requestBody, firstname: 123 };
    const response =
      await restfulBookerApi.bookingCreate.sendRequest(requestBodyWithNum);

    console.log(response.status());
    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });
});

test.describe('lastname attribute validation', () => {
  test('field is required', async ({ restfulBookerApi }) => {
    const requestBody =
      await restfulBookerApi.bookingCreate.createRequestBody();
    const { lastname, ...requestBodyWithoutLastname } = requestBody;
    const response = await restfulBookerApi.bookingCreate.sendRequest(
      requestBodyWithoutLastname
    );

    expect(response.ok()).not.toBeTruthy();
    expect(response.status()).toBe(500);
  });
});
