# QuickBI Open SDK

English | [简体中文](./README.zh-CN.md)

This is a monorepo of Quick BI Open SDK, providing the toolchain for building custom components for [Quick BI](https://help.aliyun.com/zh/quick-bi/).

## Packages

| Package                                            | Description                                                      |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| [create-qbi-app](./packages/create-qbi-app)        | Scaffold a new Quick BI custom component project                 |
| [@quickbi/qbi-dev-tools](./packages/qbi-dev-tools) | Dev server, build and bundle tool for Quick BI custom components |

## Getting started

Create a project with one command:

```bash
npm init qbi-app@latest my-app
cd my-app
npm i
npm run start
```

You can also pick a template directly with `-t`:

```bash
npm init qbi-app@latest my-app -t chart-react-ts
```

Available templates:

| Component type           | Templates                                              |
| ------------------------ | ------------------------------------------------------ |
| Custom chart             | `chart-react-ts` / `chart-vue-ts` / `chart-vanilla-ts` |
| Custom menu of chart     | `menu-chart-react-ts`                                  |
| Custom menu of dashboard | `menu-dashboard-react-ts`                              |
| Custom menu of workbook  | `menu-workbook-react-ts`                               |
| Custom page              | `page-react-ts` / `page-vue-ts` / `page-vanilla-ts`    |

For how to develop and publish Quick BI custom components, please refer to the [documentation](https://help.aliyun.com/zh/quick-bi/user-guide/getting-started-1).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local setup, commit convention, changesets and the PR workflow. TL;DR:

```bash
pnpm i && pnpm build          # Node >= 22.20.0, pnpm 10
pnpm lint && pnpm format      # oxlint + oxfmt
pnpm exec changeset           # record user-facing changes
```

Commits follow [conventional commits](https://www.conventionalcommits.org/); releases are handled by [Changesets](https://github.com/changesets/changesets) via a publish workflow.
