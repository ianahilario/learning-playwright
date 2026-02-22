export enum Tags {
  SMOKE = '@smoke',
  UNSATISFACTORY = '@unsatisfactory',
  STAGING_ONLY = '@new',
  FAILED = '@failed',
  MOBILE = '@mobile',
  CROSS_BROWSER = '@cross-browser',
  A11Y = '@a11y'
}

export enum Teams {
  TEAM_NAME = '@team-name'
}
export class TestTags {
  static setTestTags(options: { team: Teams; tags?: Tags[] }): string[] {
    const testTags: string[] = [];
    testTags.push(options.team);
    testTags.push(...(options.tags ?? []));

    return testTags;
  }
}
