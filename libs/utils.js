const path = require('path');
const { existsSync } = require('fs');
const { log } = console;
const chalk = require('chalk');
const cwd = process.env.PWD || process.env.INIT_CWD || process.cwd() || '';

const _debug = (isDebug, ...args) => {
  if (!isDebug) return false;
  args = args.map(item => chalk.magenta(item));
  return [chalk.gray('[DEBUG]'), ...args];
};

const _error = (...args) => {
  args = args.map(item => chalk.bold.red(item));
  return [chalk.gray('[ERROR]'), ...args];
};

module.exports = {
  cwd,
  debug(...args) {
    const ret = _debug(...args);
    if (ret) log.call(null, ...ret);
  },
  error(...args) {
    log.call(null, ..._error(...args));
  },
  exists(filepath) {
    return existsSync(path.resolve(cwd, filepath));
  },
  getPackage() {
    return require(path.resolve(cwd, 'package.json'));
  },
  // 内部函数，用于单元测试
  _debug,
  _error
};