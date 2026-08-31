# 贡献指南

[English](./CONTRIBUTING.md)

## 环境

Node.js >= 22.20.0，pnpm 10。

```bash
pnpm i && pnpm build
```

## 命令

```bash
pnpm -F <package> <script>   # 单个包
pnpm build                   # 全部构建
pnpm lint                    # oxlint
pnpm format                  # oxfmt
```

## 提交

遵循 [约定式提交](https://www.conventionalcommits.org/)，由 commitlint + husky 校验。
scope 为去掉 `@quickbi/` 前缀的包名（如 `create-qbi-app`、`qbi-dev-tools`）；依赖升级用 `deps`。

## Changeset

影响用户的变更必须附带 changeset：

```bash
pnpm exec changeset
```

生成的 `.changeset/<name>.md` 随代码一起提交。纯内部改动（构建、CI、注释等）可省略。

## 拉取请求

1. 基于 `main` 开分支。
2. 本地通过 `pnpm build && pnpm lint && pnpm format:check`。
3. 必要时附 changeset。
4. 重点说明**为什么**要改，而不仅是改了什么。

合并后会由发布工作流开一个 version PR，由维护者合并并发布。

## Issue

请开 [GitHub issue](https://github.com/quick-bi/open-sdk/issues)，附包版本、Node/pnpm 版本、复现步骤、期望与实际行为。Quick BI 平台问题请先查[帮助文档](https://help.aliyun.com/zh/quick-bi/)。

提交即代表按 [MIT](./LICENSE) 授权。
