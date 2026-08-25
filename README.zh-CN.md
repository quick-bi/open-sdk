# QuickBI Open SDK

[English](./README.md) | 简体中文

这是 Quick BI Open SDK 的 monorepo，提供为 [Quick BI](https://help.aliyun.com/zh/quick-bi/) 开发自定义组件的工具链。

## 包

| 包                                                 | 说明                                                |
| -------------------------------------------------- | --------------------------------------------------- |
| [create-qbi-app](./packages/create-qbi-app)        | 快速创建 Quick BI 自定义组件项目的脚手架            |
| [@quickbi/qbi-dev-tools](./packages/qbi-dev-tools) | Quick BI 自定义组件的本地开发服务器、构建与打包工具 |

## 快速开始

一条命令创建项目：

```bash
npm init qbi-app@latest my-app
cd my-app
npm i
npm run start
```

也可以用 `-t` 直接指定模板：

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

自定义组件的开发与发布流程，请参考[帮助文档](https://help.aliyun.com/zh/quick-bi/user-guide/getting-started-1)。

## 本地开发

环境要求：Node.js >= 22.20.0，pnpm 10。

```bash
pnpm i          # 安装依赖
pnpm build      # 构建所有包
pnpm lint       # 使用 oxlint 检查代码
pnpm format     # 使用 oxfmt 格式化代码
```

提交信息由 husky 调用 commitlint 校验（[约定式提交](https://www.conventionalcommits.org/)）。

## 版本发布

本仓库使用 [Changesets](https://github.com/changesets/changesets) 管理版本与发布。

发布前先记录变更：

```bash
pnpm exec changeset
```

然后将生成的 changeset 文件随代码一起提交。发布工作流会自动创建版本 PR，完成版本号升级、更新 changelog 并发布包到 npm。
