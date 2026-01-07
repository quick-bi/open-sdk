import path from 'node:path';
import * as sass from 'sass-embedded';
import { fileURLToPath } from 'node:url';
import type { Configuration, RuleSetUseItem } from '@rspack/core';
import {
  ProgressPlugin,
  CssExtractRspackPlugin,
  LightningCssMinimizerRspackPlugin,
  SwcJsMinimizerRspackPlugin,
} from '@rspack/core';

interface Option {
  mode: Configuration['mode'];
}

export const builtinEntry = {
  meta: {
    import: path.resolve(process.cwd(), './src/meta.ts'),
    library: {
      name: 'BIComponentMeta',
      type: 'umd',
    },
  },
  main: {
    import: path.resolve(process.cwd(), './src/index.ts'),
    library: {
      name: 'BIComponent',
      type: 'umd',
    },
  },
};

export function getBuiltinConfig({ mode = 'development' }: Option): Configuration {
  const config: Configuration = {
    mode,
    bail: mode === 'production',
    devtool: mode === 'development' ? 'eval-cheap-module-source-map' : false,
    entry: builtinEntry,
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      pathinfo: false,
      filename: '[name].js',
      clean: true,
      library: {
        name: '[name]',
        type: 'umd',
      },
    },
    optimization: {
      concatenateModules: false,
      minimize: mode === 'production',
      minimizer: [
        new SwcJsMinimizerRspackPlugin({
          minimizerOptions: { compress: true },
        }),
        new LightningCssMinimizerRspackPlugin(),
      ],
      splitChunks: false,
      runtimeChunk: false,
      usedExports: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [swcrc('ts')],
        },
        {
          test: /\.(js|mjs|jsx)$/,
          exclude: /node_modules/,
          use: [swcrc('js')],
        },
        {
          test: /\.m?js$/,
          include: /node_modules/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: styleSheetLoaders({ mode, loader: 'css-loader' }),
          sideEffects: true,
        },
        {
          test: /\.less$/,
          exclude: /\.module\.less$/,
          use: styleSheetLoaders({ mode, loader: 'less-loader' }),
          sideEffects: true,
        },
        {
          test: /\.s[a|c]ss$/,
          exclude: /\.module\.(scss|sass)$/,
          use: styleSheetLoaders({ mode, loader: 'sass-loader' }),
          sideEffects: true,
        },
        // css modules
        {
          test: /\.module\.css$/,
          use: styleSheetLoaders({
            mode,
            loader: 'css-loader',
            module: true,
          }),
        },
        {
          test: /\.module\.less$/,
          use: styleSheetLoaders({
            mode,
            loader: 'less-loader',
            module: true,
          }),
        },
        {
          test: /\.module\.(scss|sass)$/,
          use: styleSheetLoaders({
            mode,
            loader: 'sass-loader',
            module: true,
          }),
        },
        {
          test: /\.(woff|ttf|ico|woff2|jpg|jpeg|png|webp|gif|svg|eot)$/i,
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024,
            },
          },
          type: 'asset',
        },
      ],
    },
    resolveLoader: {
      modules: [
        path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../'), // pnpm
        path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../node_modules'),
        path.resolve(process.cwd(), 'node_modules'),
        'node_modules',
      ],
    },
    resolve: {
      modules: ['node_modules', path.resolve(process.cwd(), 'node_modules')],
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.css', '.less', '.sass', '.scss'],
    },
    plugins: [
      new ProgressPlugin(),
      new CssExtractRspackPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    devServer: {
      host: '127.0.0.1',
      port: 8001,
      server: {
        type: 'https',
      },
      open: true,
      static: {
        directory: path.resolve(process.cwd(), 'public'),
        publicPath: '/',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
      hot: false,
      client: false,
    },
  };

  return config;
}

function swcrc(type: 'ts' | 'js'): RuleSetUseItem {
  return {
    loader: 'builtin:swc-loader',
    options: {
      jsc: {
        target: 'es5',
        externalHelpers: false,
        parser: {
          syntax: 'ecmascript',
          decorators: true,
          jsx: true,
          dynamicImport: true,
          privateMethod: true,
          functionBind: false,
          exportDefaultFrom: true,
          exportNamespaceFrom: true,
          topLevelAwait: false,
          importMeta: false,
          ...(type === 'ts'
            ? {
                syntax: 'typescript',
                tsx: true,
                decoratorsBeforeExport: true,
                optionalCatchBinding: true,
                classProperties: true,
                privateMethods: true,
                preserveAllComments: false,
              }
            : {}),
        },
        transform: {
          legacyDecorator: true,
        },
        loose: false,
        keepClassNames: false,
      },
    },
  };
}

function styleSheetLoaders(option: {
  mode: Configuration['mode'];
  loader: 'css-loader' | 'less-loader' | 'sass-loader';
  module?: boolean;
}): RuleSetUseItem[] {
  const { mode, loader, module } = option;

  const cssLoader: RuleSetUseItem = {
    loader: 'css-loader',
    options: {
      sourceMap: mode === 'development',
    },
  };

  const cssModuleLoader: RuleSetUseItem = {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: mode === 'development',
      modules: true,
    },
  };

  const sassLoader: RuleSetUseItem = {
    loader: 'sass-loader',
    options: {
      sourceMap: mode === 'development',
      implementation: sass,
      api: 'modern-compiler',
    },
  };

  const lessLoader: RuleSetUseItem = {
    loader: 'less-loader',
    options: {
      sourceMap: mode === 'development',
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  };

  const getLoaders = (rules: RuleSetUseItem[]): RuleSetUseItem[] =>
    module
      ? [CssExtractRspackPlugin.loader, cssModuleLoader, ...rules]
      : [CssExtractRspackPlugin.loader, cssLoader, ...rules];

  switch (loader) {
    case 'less-loader':
      return getLoaders([lessLoader]);
    case 'sass-loader':
      return getLoaders([sassLoader]);
    case 'css-loader':
    default:
      return getLoaders([]);
  }
}
