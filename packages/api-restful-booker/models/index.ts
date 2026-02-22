import { APIRequestContext, request } from '@playwright/test';
import { API_BASE_URL } from '../constants/api';
import { BookingDetailsAPI } from './bookings/get-booking-details';
import { sendAPIRequest } from '../../../commons/api';
import { getEnv } from '../../../commons/utils';

export async function getAPIRequestContext(
  username?: string,
  password?: string
) {
  const baseContext = {
    baseURL: API_BASE_URL,
    timeout: 10_000
  };
  const apiRequestContext = await request.newContext(baseContext);
  const authResponse = await sendAPIRequest(apiRequestContext, {
    http_method: 'POST',
    endpoint: '/auth',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username: username ?? getEnv('RESTFUL_BOOKER_USERNAME'),
      password: password ?? getEnv('RESTFUL_BOOKER_PASSWORD')
    }
  });

  const token = (await authResponse.json()).token;

  const finalApiRequestContext = await request.newContext({
    extraHTTPHeaders: token,
    ...baseContext
  });

  return finalApiRequestContext;
}

export class ResfulBookerAPIs {
  readonly apiRequestContext: APIRequestContext;
  readonly bookingDetails: BookingDetailsAPI;

  constructor(apiRequestContext: APIRequestContext) {
    this.apiRequestContext = apiRequestContext;
    this.bookingDetails = new BookingDetailsAPI(apiRequestContext);
  }
}
