const path = require('path');
const { existsSync } = require('fs');
const match = require('minimatch');
const chalk = require('chalk');
const cwd = process.env.PWD || process.env.INIT_CWD || process.cwd() || '';

let debounceTimeout;
const utils = module.exports = {
  cwd,
  exists(filepath) {
    return existsSync(path.resolve(cwd, filepath));
  },
  getPackageSrc() {
    return path.resolve(cwd, 'package.json');
  },
  debounce(callback) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(callback, 120);
  },
  isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]';
  },
  /**
   * Evaluate an expression in meta.json in the context of
   * prompt answers data.
   */
  evaluate(exp, data) {
    /* eslint-disable no-new-func */
    const fn = new Function('data', 'with (data) { return ' + exp + '}');
    try {
      return fn(data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(chalk.red('Error when evaluating filter condition: ' + exp));
    }
  },
  filters(files, filters, data) {
    if (!filters) {
      return false;
    }
    const fileNames = Object.keys(files);
    Object.keys(filters).forEach(glob => {
      fileNames.forEach(file => {
        if (match(file, glob, { dot: true })) {
          const condition = filters[glob];
          if (!utils.evaluate(condition, data)) {
            delete files[file];
          }
        }
      });
    });
  },
  matchs(files, matchs, data, isEval = true) {
    if (!matchs) {
      return false;
    }
    const fileNames = Object.keys(files);
    const matchMap = {};
    Object.keys(matchs).forEach(glob => {
      fileNames.forEach(file => {
        if (match(file, glob, { dot: true })) {
          const condition = matchs[glob];
          if (isEval && utils.evaluate(condition, data)) {
            matchMap[file] = true;
          } else if (!isEval && condition) {
            matchMap[file] = true;
          }
        }
      });
    });
    fileNames.forEach(file => {
      if (!matchMap[file]) {
        delete files[file];
      }
    });
  },
};