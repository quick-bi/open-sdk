import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    ignores: [
      '**/dist/**',
      'packages/create-qbi-app/template-*',
      '**/eslint.config.mjs',
      '**/rslib.config.ts',
      '**/commitlint.config.mjs',
    ],
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
]);
