import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/**.{ts}"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: '.',
      },
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      'no-empty': 'warn',
      'no-useless-escape': 'warn',
      'no-empty-pattern': 'warn',
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'never',
          exports: 'never',
          functions: 'never',
        },
      ],
      "space-infix-ops": ["error"],
      '@stylistic/js/indent': ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
    },
  },
];