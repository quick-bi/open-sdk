import type { Compiler } from '@rspack/core';
import { Compilation, sources } from '@rspack/core';
import { safeReadJson } from '../utils';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { init, parse } from 'es-module-lexer';

const name = 'PackageJsonPlugin';
const member = 'createBIComponent';
const libs = ['bi-open-sdk', 'bi-open-react-sdk', 'bi-open-vue-sdk', 'bi-open-menu-sdk', 'bi-open'];

export class PackageJsonPlugin {
  private mainEntry: string;

  constructor(mainEntry: string) {
    this.mainEntry = mainEntry;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(name, compilation => {
      compilation.hooks.processAssets.tapPromise({ name, stage: Compilation.PROCESS_ASSETS_STAGE_REPORT }, async () => {
        const filename = 'package.json';
        const packageJson = safeReadJson(path.resolve(process.cwd(), filename));
        packageJson.webpack = {
          externals: compilation.options.externals,
        };
        const importedLibs = Object.keys({ ...packageJson.devDependencies, ...packageJson.dependencies }).filter(dep =>
          libs.includes(dep),
        );
        await init;
        const source = fs.readFileSync(this.mainEntry, { encoding: 'utf-8' });
        const [imports] = parse(source);
        const matched = imports.find(
          item => importedLibs.includes(item.n!) && new RegExp(`\\b${member}\\b`).test(source.slice(item.ss, item.se)),
        );
        const lib = matched?.n;

        if (lib) {
          const latestRevisalVersion = await getRevisalLatestVersion(lib);
          if (latestRevisalVersion) {
            packageJson.revisalInfo = {
              version: latestRevisalVersion,
            };
          }
        }

        compilation.assets[filename] = new sources.RawSource(JSON.stringify(packageJson));
      });
    });
  }
}

async function getRevisalLatestVersion(lib: string) {
  const mod = path.resolve(process.cwd(), `node_modules`, lib);
  if (fs.existsSync(mod)) {
    try {
      const packageJson = safeReadJson(path.resolve(mod, 'package.json'));
      if (packageJson.main) {
        let libEntry = path.resolve(mod, packageJson.main);
        if (fs.existsSync(libEntry)) {
          if (fs.statSync(libEntry).isDirectory()) {
            libEntry = path.resolve(libEntry, 'index.js');
          }

          // 使用 pathToFileURL 确保在 Windows 上路径被正确转换为 file:// URL
          const {
            default: { LATEST_VERSION },
          } = await import(pathToFileURL(libEntry).href);
          return LATEST_VERSION as string;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      console.error(e);
      // return '4.1'
    }
  }
}
