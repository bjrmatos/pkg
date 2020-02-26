#!/usr/bin/env node
"use strict";

var _index = require("./index.js");

var _log = require("./log.js");

async function main() {
  if (process.env.CHDIR && process.env.CHDIR !== process.cwd()) {
    // allow to override cwd by CHDIR env var
    // https://github.com/resin-io/etcher/pull/1713
    process.chdir(process.env.CHDIR);
  }

  await (0, _index.exec)(process.argv.slice(2));
}

main().catch(error => {
  if (!error.wasReported) _log.log.error(error);
  process.exit(2);
});