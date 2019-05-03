const path = require('path');
const { existsSync, readFileSync } = require('fs');
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

const _info = (...args) => {
  args = args.map(item => chalk.bold.white(item));
  return [chalk.gray('[INFO]'), ...args];
};

const debug = (...args) => {
  const ret = _debug(...args);
  if (ret) log.call(null, ...ret);
};
const error = (...args) => {
  log.call(null, ..._error(...args));
};
const info = (...args) => {
  log.call(null, ..._info(...args));
};

module.exports = {
  cwd,
  debug,
  error,
  info,
  exists(filepath) {
    return existsSync(path.resolve(cwd, filepath));
  },
  getPackageSrc() {
    return path.resolve(cwd, 'package.json');
  },
  getPackage(pkgSrc = path.resolve(cwd, 'package.json')) {
    let pkg;
    try {
      pkg = readFileSync(pkgSrc, 'utf-8');
      pkg = JSON.parse(pkg);
    } catch(err) {
      return false;
    }
    return pkg;
  },
  // 内部函数，用于单元测试
  _debug,
  _error,
  _info
};