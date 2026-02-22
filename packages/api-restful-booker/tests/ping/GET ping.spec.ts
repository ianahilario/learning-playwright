import { expect } from '@playwright/test';
import { test } from '../../fixtures/api-restful-booker';
import { Tags, Teams, TestTags } from '../../../../commons/test-tags';

test(
  'endpoint is up',
  { tag: TestTags.setTestTags({ team: Teams.TEAM_NAME, tags: [Tags.SMOKE] }) },
  async ({ request }) => {
    const response = await request.get(`${process.env.API_BASE_URL}/ping`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
  }
);
