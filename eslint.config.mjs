import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';

export default [
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    ignores: ['**/dist/**', 'packages/create-qbi-app/template-*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      parserOptions: {
        project: ['./packages/*/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
