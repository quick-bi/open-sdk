import { defineConfig } from '@quickbi/qbi-dev-tools';

export default defineConfig({
  entry: {
    BIComponentMeta: './src/meta.ts',
    BIComponent: './src/index.ts',
  },
  devServer: {
    port: 3000,
    host: '127.0.0.1',
    server: {
      type: 'https',
    },
  },
});
