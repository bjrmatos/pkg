"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plusx = plusx;

var _fsExtra = require("fs-extra");

async function plusx(file) {
  const s = await (0, _fsExtra.stat)(file);
  const newMode = s.mode | 64 | 8 | 1;
  if (s.mode === newMode) return;
  const base8 = newMode.toString(8).slice(-3);
  await (0, _fsExtra.chmod)(file, base8);
}