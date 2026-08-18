import { RspackDevServer } from '@rspack/dev-server';
import { rspack } from '@rspack/core';
import { getRspackConfig, shutdown } from '../../utils';

export default async (options: StartOption) => {
  const { configFile } = options;
  const config = await getRspackConfig(configFile);

  if (!config.devServer) {
    throw new Error('devServer is disabled in the config, cannot start dev server');
  }

  const compiler = rspack(config);
  const devServer = new RspackDevServer(config.devServer, compiler);

  await devServer.start();

  shutdown(process, () => {
    devServer.stop();
  });
};

interface StartOption {
  configFile: string;
}
