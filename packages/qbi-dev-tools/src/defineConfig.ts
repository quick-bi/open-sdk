import { Configuration } from '@rspack/core';
import { getBuiltinConfig, builtinEntry } from './builtinConfig';
import { isObject, mergeConfig } from './utils';
import { PackageJsonPlugin } from './plugins/PackageJsonPlugin';
import path from 'node:path';

/** bi-open 系列包名 (@quickbi/bi-open、bi-open、bi-open-*-sdk 等) */
const biOpenLib = /^(@quickbi\/)?bi-open(-.*)?$/;

export function defineConfig(config: Configuration | ((config: Configuration) => Configuration)) {
  const mode = process.env.NODE_ENV as Configuration['mode'];
  const builtinConfig = getBuiltinConfig({ mode });
  const userConfig = typeof config === 'function' ? config(builtinConfig) : config;
  const entry: typeof builtinEntry = builtinEntry;

  // pick entry from userConfig
  if (isObject(userConfig.entry)) {
    Object.entries(userConfig.entry).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const matched = Object.entries(entry).find(([k, v]) => k === key || (v as any).library.name === key);
        if (matched) {
          entry[matched[0] as keyof typeof builtinEntry].import = path.resolve(process.cwd(), value);
        }
      }
    });
  }

  const mergedConfig = mergeConfig(builtinConfig, userConfig) as Configuration;
  assertNoBiOpenExternals(mergedConfig.externals);
  mergedConfig.entry = entry;
  mergedConfig.plugins?.push(new PackageJsonPlugin(entry.main.import));

  return mergedConfig;
}

/** 收集 externals 中可静态解析的包名 (函数 / 正则形式无法静态解析, 跳过) */
function collectExternalNames(externals: unknown): string[] {
  if (typeof externals === 'string') {
    return [externals];
  }
  if (Array.isArray(externals)) {
    return externals.flatMap(collectExternalNames);
  }
  if (isObject(externals)) {
    return Object.keys(externals);
  }
  return [];
}

/**
 * bi-open 系列包禁止 external 化:
 * 1. bi-open 打进产物, 订正版本号 (LATEST_VERSION) 才能在构建期固化
 * 2. 平台运行时不提供 bi-open 全局变量, external 后 meta.js / main.js 也跑不起来
 */
function assertNoBiOpenExternals(externals: Configuration['externals']) {
  const names = collectExternalNames(externals).filter(name => biOpenLib.test(name));
  if (names.length) {
    throw new Error(`[qbi-dev-tools] externals 不允许包含 bi-open 系列包: ${names.join(', ')}`);
  }
}
