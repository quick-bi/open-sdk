#!/usr/bin/env node
function start() {
  import('../dist/index.cjs').then((mod) => mod.cli());
}

start();
