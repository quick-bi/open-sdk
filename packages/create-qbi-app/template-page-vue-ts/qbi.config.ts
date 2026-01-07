import { defineConfig } from '@quickbi/qbi-dev-tools';
import { VueLoaderPlugin } from 'vue-loader';

export default defineConfig({
  entry: {
    BIComponentMeta: './src/meta.ts',
    BIComponent: './src/index.ts',
  },
  devServer: {
    port: 8001,
    host: '127.0.0.1',
    server: {
      type: 'https',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          experimentalInlineMatchResource: true,
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  externals: {
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
  },
});
