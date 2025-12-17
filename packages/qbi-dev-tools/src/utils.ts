import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import type { Configuration } from '@rspack/core';

export function shutdown(proc: NodeJS.Process, fn: (code?: number) => void) {
  proc.on('exit', code => {
    fn(code);
  });

  // Ctrl+C
  proc.on('SIGINT', () => {
    fn();
    process.exit();
  });

  // kill pid (for example: nodemon restart)
  proc.on('SIGUSR1', () => {
    fn();
    process.exit();
  });
  proc.on('SIGUSR2', () => {
    fn();
    process.exit();
  });
  proc.on('SIGTERM', () => {
    fn();
    process.exit();
  });
}

export function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function arraify<T>(target: T | T[]): T[] {
  return Array.isArray(target) ? target : [target];
}

export function mergeConfig(defaults: Record<string, any>, overrides: Record<string, any>) {
  const merged: Record<string, any> = { ...defaults };
  for (const key in overrides) {
    const value = overrides[key];
    if (value == null) {
      continue;
    }

    const existing = merged[key];

    if (existing == null) {
      merged[key] = value;
      continue;
    }

    if (Array.isArray(existing) || Array.isArray(value)) {
      merged[key] = [...arraify(existing), ...arraify(value)];
      continue;
    }
    if (isObject(existing) && isObject(value)) {
      merged[key] = mergeConfig(existing, value);
      continue;
    }

    merged[key] = value;
  }
  return merged;
}

export function pick(obj: Record<string, any>, keys: string[]) {
  return keys.reduce<Record<string, any>>((acc, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export function safeReadJson(filePath: string, defaultValue: any = null) {
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  return safeParseJson(content, defaultValue);
}

export function safeParseJson(json: string, defaultValue: any = null) {
  try {
    return JSON.parse(json);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: any) {
    return defaultValue;
  }
}

export async function getRspackConfig(configFile: string): Promise<Configuration> {
  if (fs.existsSync(configFile)) {
    // 使用 pathToFileURL 确保在 Windows 上路径被正确转换为 file:// URL
    const { default: defineConfig } = await import(pathToFileURL(configFile).href);

    return defineConfig;
  } else {
    throw new Error('config file not found');
  }
}
