# create-qbi-app

Scaffolding your Quick BI custom component project.

## Usage

3 ways for you to getting start:

### npm

```bash
npm init qbi-app@latest my-app
cd my-app
npm i
npm run start
```

### pnpm

```bash
pnpm create qbi-app my-app
cd my-app
pnpm i
pnpm start
```

### yarn

```bash
yarn create qbi-app my-app
cd my-app
yarn i
yarn start
```

## Templates

You can pick a template directly with the `-t` / `--template` option instead of the interactive prompts:

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

The project name must start with a letter and can only contain `a-z`, `0-9`, `-`, `_`.

## Next step

Please refer to the [documentation](https://help.aliyun.com/zh/quick-bi/user-guide/getting-started-1) on how to develop Quick-BI custom components.

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
