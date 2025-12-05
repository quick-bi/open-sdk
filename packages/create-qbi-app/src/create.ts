import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export async function createApp(projectName: string, template: string) {
  let targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    targetDir = path.resolve(process.cwd(), `${projectName}_1`);
  }

  const templateDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), `../template-${template}`);
  const pkgInfo = pkgFromUserAgent();
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  fs.mkdirSync(targetDir, { recursive: true });
  copy(templateDir, targetDir);

  // update package.json
  const pkgFile = path.join(targetDir, `package.json`);
  const pkg = JSON.parse(fs.readFileSync(path.join(targetDir, `package.json`), 'utf-8'));
  pkg.name = projectName;
  fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n');

  // done message
  let doneMessage = '';
  doneMessage += `Create Success. Now run:\n`;
  doneMessage += `\n  cd ${path.relative(process.cwd(), targetDir)}`;
  doneMessage += `\n  ${[pkgManager, 'install'].join(' ')}`;
  doneMessage += `\n  ${[pkgManager, 'run start'].join(' ')}`;

  return doneMessage;
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function pkgFromUserAgent(userAgent = process.env.npm_config_user_agent) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}
