import { Configuration } from '@rspack/core';
import { getBuiltinConfig, builtinEntry } from './builtinConfig';
import { isObject, mergeConfig } from './utils';
import { PackageJsonPlugin } from './plugins/PackageJsonPlugin';
import path from 'node:path';

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
  mergedConfig.entry = entry;
  mergedConfig.plugins?.push(new PackageJsonPlugin(entry.main.import));

  return mergedConfig;
}
