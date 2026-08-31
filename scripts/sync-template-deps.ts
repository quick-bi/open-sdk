import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dep = '@quickbi/qbi-dev-tools';

const devToolsVersion: string = JSON.parse(
  readFileSync(join(root, 'packages/qbi-dev-tools/package.json'), 'utf8'),
).version;
const range = `^${devToolsVersion}`;

const templatesDir = join(root, 'packages/create-qbi-app');
let updated = 0;

for (const name of readdirSync(templatesDir).sort()) {
  if (!name.startsWith('template-')) continue;
  const pkgPath = join(templatesDir, name, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  let changed = false;
  for (const section of ['dependencies', 'devDependencies', 'peerDependencies'] as const) {
    if (pkg[section]?.[dep] && pkg[section][dep] !== range) {
      pkg[section][dep] = range;
      changed = true;
    }
  }
  if (changed) {
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    updated++;
    console.log(`updated ${name}: ${dep} -> ${range}`);
  }
}

console.log(`synced ${updated} template(s) to ${dep}@${range}`);
