import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { sendAPIRequest } from '../../../../commons/api';

export class BookingDetailsAPI {
  constructor(private apiRequestContext: APIRequestContext) {
    this.apiRequestContext = apiRequestContext;
  }

  async sendRequest(bookingId: string): Promise<APIResponse> {
    const response = await sendAPIRequest(this.apiRequestContext, {
      http_method: 'GET',
      endpoint: `/booking/${bookingId}`
    });

    return response;
  }

  async getBookingDetails(bookingId: string): Promise<any> {
    const responseBody = await this.sendRequest(bookingId).then(
      async (response) => {
        await expect(response.status(), `Status code is 200`).toBe(200);
        return response.json();
      }
    );

    return responseBody;
  }
}
