# QuickBI Open SDK

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

## Development

Requirements: Node.js >= 22.20.0, pnpm 10.

```bash
pnpm i          # install dependencies
pnpm build      # build all packages
pnpm lint       # lint with oxlint
pnpm format     # format with oxfmt
```

Commits are checked by commitlint ([conventional commits](https://www.conventionalcommits.org/)) via husky.

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

Before publishing, record your changes:

```bash
pnpm exec changeset
```

Then commit the generated changeset file along with your code. The release workflow will create a version PR that bumps versions, updates changelogs and publishes packages to npm.
