import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    ignores: ['**/dist/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
