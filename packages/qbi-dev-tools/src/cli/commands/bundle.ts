import { zip } from 'compressing';
import path from 'node:path';
import fs from 'node:fs';
import { getRspackConfig, safeReadJson } from '../../utils';

export default async (option: PackOption) => {
  const { configFile } = option;
  const packageJSONFile = path.resolve(process.cwd(), 'package.json');
  const packageJSON = safeReadJson(packageJSONFile);
  const config = await getRspackConfig(configFile);
  const output = config.output?.path as string;

  const name = [packageJSON?.name, packageJSON?.version].filter(Boolean).join('-');

  const stream = new zip.Stream();
  const files = fs.readdirSync(output);

  for (const file of files) {
    const subpath = path.resolve(output, file);
    stream.addEntry(subpath);
  }

  stream.addEntry(packageJSONFile);

  const writeStream = fs.createWriteStream(path.resolve(process.cwd(), `${name}.zip`));

  await new Promise<void>((res, rej) => {
    stream.pipe(writeStream).on('finish', res).on('error', rej);
  });
};

interface PackOption {
  configFile: string;
}
