"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.follow = follow;
exports.natives = void 0;

var _resolve = require("resolve");

var _assert = _interopRequireDefault(require("assert"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.keys(_resolve.core).forEach(key => {
  // 'resolve' hardcodes the list to host's one, but i need
  // to be able to allow 'worker_threads' (target 12) on host 8
  (0, _assert.default)(typeof _resolve.core[key] === 'boolean');
  _resolve.core[key] = true;
});
const natives = _resolve.core;
exports.natives = natives;

function follow(x, opts) {
  // TODO async version
  return new Promise(resolve => {
    resolve((0, _resolve.sync)(x, {
      basedir: opts.basedir,
      extensions: opts.extensions,
      readFileSync: file => {
        opts.readFile(file);
        return _fs.default.readFileSync(file);
      },
      packageFilter: (config, base) => {
        opts.packageFilter(config, base);
        return config;
      }
    }));
  });
}