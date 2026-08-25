# @quickbi/qbi-dev-tools

[English](./README.md) | 简体中文

Quick BI 自定义组件的构建工具，基于 [Rspack](https://rspack.dev/)。

## 使用

### 安装

使用 npm：

```bash
npm i -D @quickbi/qbi-dev-tools
```

使用 pnpm：

```bash
pnpm add -D @quickbi/qbi-dev-tools
```

使用 yarn：

```bash
yarn add -D @quickbi/qbi-dev-tools
```

### 配置

在项目根目录创建 `qbi.config.ts` 文件：

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

配置支持传入完整的 Rspack `Configuration`（如 `externals`、`resolve` 等），也支持传入一个函数，接收内置配置并返回合并后的配置：

```ts
export default defineConfig(config => {
  config.externals = { react: 'React' };
  return config;
});
```

默认构建两个 UMD 入口：`BIComponentMeta` 来自 `./src/meta.ts`（组件元信息），`BIComponent` 来自 `./src/index.ts`（组件实现），产物输出到 `dist/`。只需声明要覆盖的入口即可。

内置能力：

- 通过 SWC 编译 TypeScript / JavaScript(X)
- CSS / Less / Sass，支持 CSS Modules（`*.module.css|less|scss`）
- 静态资源（图片、字体、图标）小于 100KB 时内联为 data URL
- 开发服务器默认运行在 `https://127.0.0.1:8001`，托管 `./public` 目录并开启 CORS

### 命令

所有命令均支持 `--config [path]` 指定配置文件（默认为 `./qbi.config.ts`）。

启动开发服务器：

```bash
qdt start
```

生产环境构建：

```bash
qdt build
```

将构建产物打包为 zip，用于上传到 Quick BI（在项目根目录生成 `<name>-<version>.zip`）：

```bash
qdt bundle
```

## 调试

安装依赖：

```bash
pnpm i
```

构建：

```bash
pnpm build
```

以监听模式构建：

```bash
pnpm dev
```
