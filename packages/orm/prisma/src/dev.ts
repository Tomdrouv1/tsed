#!/usr/bin/env node

try {
  require("tsconfig-paths/register");
  require("ts-node/register/transpile-only");
  require("./generator.ts");
} catch (er) {
  console.log(er);
  process.exit(-1);
}
