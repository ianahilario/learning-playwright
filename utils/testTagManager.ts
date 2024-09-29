interface TEST_TAGS {
  suite: string;
  to_run_in_env: string[];
}

const TEST_SUITE = {
  SMOKE: '@p1',
  FULL: '@full',
  VISUAL: '@visual'
};

const TEST_ENV = {
  STAGING: '@staging',
  UAT: '@uat',
  PROD: '@production'
};

function tagBuilder(tags: TEST_TAGS) {
  const testTags = [tags.suite];

  tags.to_run_in_env.forEach((env) => {
    testTags.push(env);
  });

  return testTags;
}

export const TAG_P1 = tagBuilder({
  suite: TEST_SUITE.SMOKE,
  to_run_in_env: [TEST_ENV.STAGING, TEST_ENV.UAT]
});

export const SMOKE_TEST = tagBuilder({
  suite: TEST_SUITE.SMOKE,
  to_run_in_env: [TEST_ENV.STAGING, TEST_ENV.UAT]
});
