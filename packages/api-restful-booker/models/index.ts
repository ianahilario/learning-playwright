import { APIRequestContext, request } from '@playwright/test';
import { API_BASE_URL } from '../constants/api';
import { BookingDetailsAPI } from './bookings/get-booking-details';
import { sendAPIRequest } from '../../../commons/api';
import { getEnv } from '../../../commons/utils';
import { BookingCreateAPI } from './bookings/create-booking';

export class ResfulBookerAPIs {
  readonly apiRequestContext: APIRequestContext;
  readonly bookingDetails: BookingDetailsAPI;
  readonly bookingCreate: BookingCreateAPI;

  constructor(apiRequestContext: APIRequestContext) {
    this.apiRequestContext = apiRequestContext;
    this.bookingDetails = new BookingDetailsAPI(apiRequestContext);
    this.bookingCreate = new BookingCreateAPI(apiRequestContext);
  }
}

export async function getAPIRequestContext(
  username?: string,
  password?: string
) {
  const baseContext = {
    baseURL: API_BASE_URL,
    timeout: 10_000,
    'Content-Type': 'application/json'
  };
  const apiRequestContext = await request.newContext(baseContext);
  const authResponse = await sendAPIRequest(apiRequestContext, {
    http_method: 'POST',
    endpoint: '/auth',
    data: {
      username: username ?? getEnv('RESTFUL_BOOKER_USERNAME'),
      password: password ?? getEnv('RESTFUL_BOOKER_PASSWORD')
    }
  });

  const token = (await authResponse.json()).token;

  if (!token) {
    throw new Error('getAPIRequestContext(): Token is undefined');
  }

  const finalApiRequestContext = await request.newContext({
    extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    ...baseContext
  });

  return finalApiRequestContext;
}
