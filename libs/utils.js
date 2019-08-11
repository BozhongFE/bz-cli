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
  removes(files, removes, data) {
    if (!removes) {
      return false;
    }
    const fileNames = Object.keys(files);
    const removeMap = {};
    Object.keys(removes).forEach(glob => {
      fileNames.forEach(file => {
        if (match(file, glob, { dot: true })) {
          const condition = removes[glob];
          if (utils.evaluate(condition, data)) {
            removeMap[file] = true;
          }
        }
      });
    });
    fileNames.forEach(file => {
      if (!removeMap[file]) {
        delete files[file];
      }
    });
  },
};