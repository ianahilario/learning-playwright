import { JIRA_BASE_URL } from '../constants/jira';
import { TEST_RISKS_COVERED } from '../constants/risk-coverage';
import {
  RiskAnnotationTypes,
  TestAnnotationTypes
} from '../constants/test-annotations';

const featureAndStoryList = {
  authentication: ['able to log in hosted login when user is active'],
  checkout: ['able to process an order successfully'],
  a11y: [
    'should not have automatically detectable WCAG A violations',
    'should not have automatically detectable WCAG AA violations'
  ]
} as const;

type FeatureList = keyof typeof featureAndStoryList;
type StoryFor<F extends FeatureList> = (typeof featureAndStoryList)[F][number];

type RiskList = keyof typeof TEST_RISKS_COVERED;
type RiskFor<R extends RiskList> = (typeof TEST_RISKS_COVERED)[R][number];

type FeatureStoryPair<F extends FeatureList = FeatureList> = {
  [K in F]: { feature: K; story: StoryFor<K> };
}[F];

type RiskPair<R extends RiskList = RiskList> = {
  [K in R]: { riskCategory: K; riskDescription: RiskFor<K> };
}[R];

export type PlaywrightAnnotations = {
  type: string;
  description?: string;
}[];

export class TestAnnotations {
  static setTestInfo(options: {
    featureStories: FeatureStoryPair[];
    scenario: string;
    risks: RiskPair[];
  }): PlaywrightAnnotations {
    const featureStoryAnnotations: PlaywrightAnnotations = [];
    options.featureStories.forEach(({ feature, story }) => {
      featureStoryAnnotations.push({
        type: TestAnnotationTypes.FEATURE,
        description: feature
      });

      featureStoryAnnotations.push({
        type: TestAnnotationTypes.STORY,
        description: story
      });
    });

    const riskAnnotations: PlaywrightAnnotations = [];
    if (options.risks) {
      options.risks.forEach(({ riskCategory, riskDescription }) => {
        riskAnnotations.push({
          type: RiskAnnotationTypes.CATEGORY,
          description: riskCategory
        });

        riskAnnotations.push({
          type: RiskAnnotationTypes.DESCRIPTION,
          description: riskDescription
        });
      });
    }

    return [
      {
        type: TestAnnotationTypes.SET_ALLURE_TEST_INFO,
        description: 'true'
      },
      {
        type: TestAnnotationTypes.TEST_DESCRIPTION,
        description: options.scenario
      },
      ...featureStoryAnnotations,
      ...riskAnnotations
    ];
  }

  static setOpenBugInfo(options: {
    ticketId: string[];
  }): PlaywrightAnnotations {
    return options.ticketId.map((ticket) => ({
      type: TestAnnotationTypes.OPEN_BUG,
      description: `${JIRA_BASE_URL}/browse/${ticket}`
    }));
  }

  static setResolvedBugInfo(options: {
    ticketId: string[];
  }): PlaywrightAnnotations {
    return options.ticketId.map((ticket) => ({
      type: TestAnnotationTypes.RESOLVED_BUG,
      description: `${JIRA_BASE_URL}/browse/${ticket}`
    }));
  }

  static setUnsatisfactoryReason(reason: string): PlaywrightAnnotations {
    return [
      {
        type: TestAnnotationTypes.UNSATISFACTORY_REASON,
        description: `${reason}`
      }
    ];
  }
}
