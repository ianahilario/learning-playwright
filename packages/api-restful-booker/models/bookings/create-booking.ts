import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { sendAPIRequest } from '../../../../commons/api';
import {
  CreateBookingRequestBody,
  CreateBookingResponseBody
} from '../../interfaces/bookings';
import { faker } from '@faker-js/faker';

export class BookingCreateAPI {
  constructor(private apiRequestContext: APIRequestContext) {
    this.apiRequestContext = apiRequestContext;
  }

  async sendRequest(requestBody: any): Promise<APIResponse> {
    const response = await sendAPIRequest(this.apiRequestContext, {
      http_method: 'POST',
      endpoint: `/booking`,
      data: requestBody
    });

    return response;
  }

  async createBooking(
    requestBody: CreateBookingRequestBody = this.createRequestBody()
  ): Promise<CreateBookingResponseBody> {
    const responseBody = await this.sendRequest(requestBody).then(
      async (response) => {
        await expect(response.status(), `Status code is 201`).toBe(200);
        return response.json();
      }
    );

    return responseBody;
  }

  createRequestBody() {
    const checkin = faker.date.soon({ days: 30 });
    const checkout = faker.date.soon({ refDate: checkin, days: 30 });

    return {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      totalprice: 100,
      depositpaid: true,
      bookingdates: {
        checkin: checkin.toISOString().split('T')[0],
        checkout: checkout.toISOString().split('T')[0]
      },
      additionalneeds: 'with window'
    };
  }
}
