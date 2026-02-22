import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { sendAPIRequest } from '../../../../commons/api';

export class PingAPI {
  constructor(private apiRequestContext: APIRequestContext) {
    this.apiRequestContext = apiRequestContext;
  }

  async sendRequest(): Promise<APIResponse> {
    const response = await sendAPIRequest(this.apiRequestContext, {
      http_method: 'GET',
      endpoint: `/ping`
    });

    return response;
  }

  async getPing(): Promise<any> {
    const responseBody = await this.sendRequest().then(async (response) => {
      await expect(response.status(), `Status code is 201`).toBe(201);
      return response.json();
    });

    return responseBody;
  }
}
