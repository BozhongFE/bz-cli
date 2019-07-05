const { log } = console;
const chalk = require('chalk');

const _log = (type, color, ...args) => {
  args = args.map(item => chalk.bold[color](item));
  return [chalk.gray(`[${type.toUpperCase()}]`), ...args];
};

const _debug = (isDebug, ...args) => {
  if (!isDebug) return false;
  return _log('debug', 'magenta', ...args);
};

const _error = (...args) => _log('error', 'red', ...args);
const _info = (...args) => _log('info', 'white', ...args);

module.exports = {
  debug: (...args) => {
    const ret = _debug(...args);
    if (ret) log.call(null, ...ret);
  },
  error: (...args) => log.call(null, ..._error(...args)),
  info: (...args) => log.call(null, ..._info(...args)),
  // 内部函数，用于单元测试
  _debug,
  _error,
  _info
};