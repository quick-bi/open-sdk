import { RspackDevServer } from '@rspack/dev-server';
import { rspack } from '@rspack/core';
import { getRspackConfig, shutdown } from '../../utils';

export default async (options: StartOption) => {
  const { configFile } = options;
  const config = await getRspackConfig(configFile);
  const compiler = rspack(config);
  const devServer = new RspackDevServer(config.devServer!, compiler);

  await devServer.start();

  shutdown(process, () => {
    devServer.stop();
  });
};

interface StartOption {
  configFile: string;
}
