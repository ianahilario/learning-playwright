import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import stylisticJs from '@stylistic/eslint-plugin-js';
import playwright from 'eslint-plugin-playwright'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ['**/node_modules', 'playwright-report', 'test-results']
  },
  ...compat.extends('plugin:@typescript-eslint/stylistic'),
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      "playwright/expect-expect": [
      "error",
      {
        "assertFunctionNames": ["isCorrectProductData", "isCorrectSorting"]
      }
    ]
    },
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      '@stylistic/js': stylisticJs
    },

    files: ['**/**.{ts}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: true,
        tsconfigRootDir: '.'
      }
    },
    rules: {
      'no-empty': 'error',
      'no-useless-escape': 'off',
      'no-empty-pattern': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-const': 'warn',
      'no-unused-vars': 'error',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ],
      'space-infix-ops': ['error'],
      '@stylistic/js/indent': ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/await-thenable': 'error',
      "jest/expect-expect": [
        "error",
        {
          "assertFunctionNames": ["expect"],
          "additionalTestBlockFunctions": []
        }
  ]
    }
  }
];
