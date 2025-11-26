import cac from 'cac';
import path from 'node:path';
import start from './commands/start';
import build from './commands/build';
import bundle from './commands/bundle';
import packageJson from '../../package.json';

export async function cli() {
  const cli = cac('qdt');
  const defaultConfigFile = path.resolve(process.cwd(), 'qbi.config.ts');

  cli
    .command('start', 'Start dev server')
    .option('--config [config]', 'Config file path', {
      default: defaultConfigFile,
    })
    .action(async options => {
      process.env.NODE_ENV = 'development';
      await start({ configFile: options.config });
    });

  cli
    .command('build', 'Build the project')
    .option('--config [config]', 'Config file path', {
      default: defaultConfigFile,
    })
    .action(async options => {
      process.env.NODE_ENV = 'production';
      await build({ configFile: options.config });
    });

  cli
    .command('bundle', 'Bundle the project')
    .option('--config [config]', 'Config file path', {
      default: defaultConfigFile,
    })
    .action(async options => {
      await bundle({ configFile: options.config });
    });

  cli.help();
  cli.version(packageJson.version);

  cli.parse();
}
