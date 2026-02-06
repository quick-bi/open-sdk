# @quickbi/qbi-dev-tools

This is a building tool for Quick BI custom components.

## Usage

### Install

with npm:

```bash
npm i -D qbi-dev-tools
```

with pnpm:

```bash
pnpm add -D qbi-dev-tools
```

with yarn:

```bash
yarn add -D qbi-dev-tools
```

### configuration

add a file named `qbi.config.ts` to your project root directory.

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

### starting dev server

```bash
qdt start
```

### building the project

```bash
qdt build
```

### bundle the project

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
