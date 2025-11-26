import { rspack } from '@rspack/core';
import os from 'node:os';
import { getRspackConfig } from '../../utils';

export default async (option: BuildOption) => {
  const { configFile } = option;
  const config = await getRspackConfig(configFile);
  const compiler = rspack(config);

  return new Promise<void>((resolve, reject) => {
    compiler.run(function (err, stats) {
      if (err) {
        reject(err);
      }

      if (stats && stats.hasErrors()) {
        const info = stats.toJson();
        const msg = info.errors?.map(error => error.message).join(os.EOL + os.EOL);
        reject(new Error(msg));
      }

      compiler.close(() => {
        resolve();
      });
    });
  });
};

interface BuildOption {
  configFile: string;
}
