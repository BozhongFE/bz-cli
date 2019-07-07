const path = require('path');
const { existsSync } = require('fs');
const cwd = process.env.PWD || process.env.INIT_CWD || process.cwd() || '';

let debounceTimeout;
module.exports = {
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
  }
};