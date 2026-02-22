import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

type HTTPMethods = 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE';

interface APIRequestData {
  http_method: HTTPMethods;
  base_url?: string;
  endpoint: string;
  headers?: any;
  query_params?: any;
  data?: object;
}

const RETRYABLE_STATUS_CODES = [503, 520];

export async function sendAPIRequest(
  apiRequestContext: APIRequestContext,
  apiRequestData: APIRequestData
): Promise<APIResponse> {
  const requestId = getXRequestId();
  const url = `${apiRequestData.base_url ? apiRequestData.base_url : ''}${apiRequestData.endpoint}`;
  const headers = {
    ...apiRequestData.headers,
    'X-Request-Id': requestId
  };
  const data = {
    params: apiRequestData.query_params,
    data: apiRequestData.data === undefined ? {} : apiRequestData.data,
    headers: headers
  };

  let request: () => Promise<APIResponse>;
  switch (apiRequestData.http_method) {
    case 'POST':
      request = () => apiRequestContext.post(url, data);
      break;
    case 'GET':
      request = () => apiRequestContext.get(url, data);
      break;
    case 'PATCH':
      request = () => apiRequestContext.patch(url, data);
      break;
    case 'PUT':
      request = () => apiRequestContext.put(url, data);
      break;
    case 'DELETE':
      request = () => apiRequestContext.delete(url, data);
      break;
    default:
      throw new Error(
        `sendAPIRequest(): Unsupported HTTP method: ${apiRequestData.http_method}`
      );
  }

  let response: APIResponse = {} as APIResponse;
  await expect(
    async () => {
      response = await request();
      expect(RETRYABLE_STATUS_CODES).not.toContain(response.status());
    },
    `sendAPIRequest(): Retry '${apiRequestData.http_method} ${url}' until status is not in ${RETRYABLE_STATUS_CODES.join(', ')}`
  ).toPass({
    intervals: [3_000],
    timeout: 20_000
  });

  return response;
}

function getXRequestId(): string {
  return `qa-${faker.string.uuid()}`;
}
