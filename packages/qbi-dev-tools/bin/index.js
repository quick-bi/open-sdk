#!/usr/bin/env node
function start() {
  import('../dist/cli.cjs').then(mod => mod.cli());
}

start();
