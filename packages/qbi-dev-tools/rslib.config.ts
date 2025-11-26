import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: ['node 18'],
      source: {
        entry: {
          index: './src/index.ts',
          cli: './src/cli/index.ts',
        },
      },
      dts: true,
    },
    {
      format: 'cjs',
      syntax: ['node 18'],
      source: {
        entry: {
          index: './src/index.ts',
          cli: './src/cli/index.ts',
        },
      },
    },
  ],
});
