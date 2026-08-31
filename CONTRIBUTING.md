# Contributing

[简体中文](./CONTRIBUTING.zh-CN.md)

## Setup

Node.js >= 22.20.0, pnpm 10.

```bash
pnpm i && pnpm build
```

## Scripts

```bash
pnpm -F <package> <script>   # per-package
pnpm build                   # all packages
pnpm lint                    # oxlint
pnpm format                  # oxfmt
```

## Commits

[Conventional commits](https://www.conventionalcommits.org/), enforced by commitlint + husky.
Scope = package name without `@quickbi/` (e.g. `create-qbi-app`, `qbi-dev-tools`); `deps` for bumps.

## Changesets

User-facing changes need a changeset:

```bash
pnpm exec changeset
```

Commit the generated `.changeset/<name>.md` with your code. Skip for pure internal changes (build, CI, comments).

## Pull requests

1. Branch off `main`.
2. Pass `pnpm build && pnpm lint && pnpm format:check`.
3. Attach a changeset if applicable.
4. Describe **why** the change exists, not just what it does.

The publish workflow opens a version PR after merge; a maintainer lands it.

## Issues

Open a [GitHub issue](https://github.com/quick-bi/open-sdk/issues) with package version, Node/pnpm version, reproduction steps, and expected vs. actual behavior. For Quick BI platform questions, check the [docs](https://help.aliyun.com/zh/quick-bi/) first.

Contributions are licensed under [MIT](./LICENSE).
