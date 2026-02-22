import { test as base } from '@playwright/test';
import { getAPIRequestContext, ResfulBookerAPIs } from '../models';

interface testFixtures {
  restfulBookerApi: ResfulBookerAPIs;
}

export const test = base.extend<testFixtures>({
  restfulBookerApi: async ({}, use) => {
    const apiRequestContext = await getAPIRequestContext();
    await use(new ResfulBookerAPIs(apiRequestContext));
  }
});
