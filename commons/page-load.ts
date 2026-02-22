import { Locator, Page } from 'playwright';
import { expect, Response, test } from '@playwright/test';

export async function waitForPageToLoad(
  page: Page,
  url?: string | RegExp,
  locator?: Locator
) {
  if (url !== undefined) {
    if (url instanceof RegExp) {
      await page.waitForURL(url, { timeout: 10_000 });
    } else {
      await page.waitForURL((currentUrl) => currentUrl.href.includes(url), {
        timeout: 10_000
      });
    }
  }

  if (locator !== undefined) {
    await locator.waitFor({ state: 'visible', timeout: 30_000 });
  }
}

export async function waitForApiResponse(
  page: Page,
  api: {
    endpoint: string | RegExp;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  },
  options?: {
    statusCode?: number | number[];
    timeout?: number;
    isRequired?: boolean;
  }
) {
  const isRequired = options?.isRequired || true;
  const response =
    await test.step(`Waiting for response from '${api.method} ${api.endpoint}'`, async () => {
      let response;
      try {
        response = await page.waitForResponse(
          (res) =>
            typeof api.endpoint === 'string'
              ? res.url().includes(api.endpoint)
              : api.endpoint instanceof RegExp
                ? api.endpoint.test(res.url())
                : false && res.request().method() === api.method,
          { timeout: options?.timeout || 20_000 }
        );
      } catch (error) {
        // Handle timeout or error gracefully
        response = null;
      }

      if (!response && isRequired) {
        throw new Error(
          `waitForApiResponse(): Request to ${api.endpoint} timed out or returned no response.`
        );
      }

      if (options?.statusCode) {
        if (Array.isArray(options.statusCode)) {
          expect(
            options.statusCode,
            `waitForApiResponse(): Status code is one of: ${options.statusCode} - ${response.url()}`
          ).toContain(response.status());
          return response;
        } else {
          expect(
            response.status(),
            `waitForApiResponse(): Status code is: ${options.statusCode} - ${response.url()}`
          ).toBe(options.statusCode);
        }
      }

      return response;
    });
  return response;
}

export async function waitForPollingResponse(
  page: Page,
  endpoint: string | RegExp,
  validateResponse?: (response: any) => boolean,
  timeout = 90_000
): Promise<void> {
  let lastValidResponse: any = null;
  let lastError: Error | null = null;

  const listener = async (response: Response) => {
    try {
      const urlMatches =
        typeof endpoint === 'string'
          ? response.url().includes(endpoint)
          : endpoint instanceof RegExp
            ? endpoint.test(response.url())
            : false;
      if (!urlMatches) return;
      if (response.status() >= 400) return;

      try {
        const json = await response.json();
        if (!validateResponse || validateResponse(json)) {
          lastValidResponse = json;
        }
      } catch (jsonError) {
        // Don't set lastValidResponse, keep waiting for next response
        // Don't throw error, just continue waiting
        console.log(
          `JSON parsing failed for ${response.url()}, continuing to wait...`
        );
        return;
      }
    } catch (e) {
      // Don't set lastError for JSON parsing issues, only for other errors
      if (
        !(e instanceof Error) ||
        !e.message.includes('No resource with given identifier')
      ) {
        lastError = e as Error;
      }
    }
  };

  page.on('response', listener);

  try {
    await expect
      .poll(
        () => {
          if (lastError) throw lastError;
          if (!validateResponse) return lastValidResponse !== null;
          return (
            lastValidResponse !== null && validateResponse(lastValidResponse)
          );
        },
        {
          message: `waitForPollingResponse(): ${endpoint} response is ok and valid`,
          timeout,
          intervals: [5_000]
        }
      )
      .toBe(true);
  } finally {
    page.off('response', listener);
  }
}
