# @quickbi/qbi-dev-tools

This is a building tool for Quick BI custom components, powered by [Rspack](https://rspack.dev/).

## Usage

### Install

with npm:

```bash
npm i -D @quickbi/qbi-dev-tools
```

with pnpm:

```bash
pnpm add -D @quickbi/qbi-dev-tools
```

with yarn:

```bash
yarn add -D @quickbi/qbi-dev-tools
```

### Configuration

Add a file named `qbi.config.ts` to your project root directory:

```ts
// qbi.config.ts
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
```

The config accepts a full Rspack `Configuration` (e.g. `externals`, `resolve`, ...), or a function that receives the builtin config and returns the merged one:

```ts
export default defineConfig(config => {
  config.externals = { react: 'React' };
  return config;
});
```

By default it builds two UMD entries: `BIComponentMeta` from `./src/meta.ts` (component meta info) and `BIComponent` from `./src/index.ts` (component implementation), output to `dist/`. You only need to declare the entries you want to override.

Built-in capabilities:

- TypeScript / JavaScript(X) compilation via SWC
- CSS / Less / Sass, with CSS Modules support (`*.module.css|less|scss`)
- Assets (images, fonts, icons) inlined as data URLs when smaller than 100KB
- Dev server at `https://127.0.0.1:8001` by default, serving `./public` with CORS enabled

### Commands

All commands accept `--config [path]` to specify the config file (defaults to `./qbi.config.ts`).

Starting dev server:

```bash
qdt start
```

Building the project for production:

```bash
qdt build
```

Bundling the build output into a zip for uploading to Quick BI (produces `<name>-<version>.zip` in your project root):

```bash
qdt bundle
```

## Debugging

Install the dependencies:

```bash
pnpm i
```

Build the library:

```bash
pnpm build
```

Build the library in watch mode:

```bash
pnpm dev
```
