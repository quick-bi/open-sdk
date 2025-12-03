# @quickbi/qbi-dev-tools

This is a building tool for Quick BI custom components.

## Usage

### Install

with npm:

```
npm i -D qbi-dev-tools
```

with pnpm:

```
pnpm add -D qbi-dev-tools
```

with yarn:

```
yarn add -D qbi-dev-tools
```

### configuration

add a file named `qbi.config.ts` to your project root directory.

```qbi.config.ts
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

```
qdt start
```

### building the project

```
qdt build
```

### bundle the project

```
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
