# create-qbi-app

[English](./README.md) | 简体中文

快速创建 Quick BI 自定义组件项目的脚手架。

## 使用

三种方式开始：

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

## 模板

可以使用 `-t` / `--template` 选项直接指定模板，跳过交互式提问：

```bash
npm init qbi-app@latest my-app -t chart-react-ts
```

可用模板：

| 组件类型           | 模板                                                   |
| ------------------ | ------------------------------------------------------ |
| 自定义图表         | `chart-react-ts` / `chart-vue-ts` / `chart-vanilla-ts` |
| 图表自定义菜单     | `menu-chart-react-ts`                                  |
| 仪表板自定义菜单   | `menu-dashboard-react-ts`                              |
| 电子表格自定义菜单 | `menu-workbook-react-ts`                               |
| 自定义页面         | `page-react-ts` / `page-vue-ts` / `page-vanilla-ts`    |

项目名必须以字母开头，且只能包含 `a-z`、`0-9`、`-`、`_`。

## 下一步

自定义组件的开发流程请参考[帮助文档](https://help.aliyun.com/zh/quick-bi/user-guide/getting-started-1)。

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
