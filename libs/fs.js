/**
 * 读取文件
 */
const { existsSync, readFileSync } = require('fs');
const { error } = require('./log');

const cache = new Map();

const cfs = module.exports = {
  /**
   * 读取文件
   * @param {path} file 文件路径
   * @param {object} options 可选参数
   *    - @subparam {string} options.type 格式化类型，默认 json
   *    - @subparam {boolean} options.cache 是否使用缓存，默认 true
   * @return 返回文件内容
   */
  getFile: (file, options = { cache: true }) => {
    if (!options.cache || !cache.has(file)) {
      cache.set(file, cfs.readFile(file, options.type));
    }
    return cache.get(file);
  },
  /**
   * 获取缓存
   */
  getCache: (file) => cache.get(file),
  /**
   * 读取文件内容
   * @param {path} file 文件路径
   * @param {string} type 格式化内容的类型，默认使用 getFileType 的值
   * @return {string} 返回文件内容格式化后的数据
   */
  readFile: (file, type) => {
    if (!type) type = cfs.getFileType(file);
    const typeMap = {
      json: {},
    };
    if (!existsSync(file)) {
      return typeMap[type] ? typeMap[type] : '';
    }
    let data = readFileSync(file, 'utf8');
    if (type === 'json') {
      try {
        data = JSON.parse(data);
      } catch(err) {
        error(file, 'libs/fs readFile JSON.parse error');
        // eslint-disable-next-line no-console
        console.error(err);
        data = {};
      }
    }
    return data;
  },
  /**
   * 获取文件的数据类型
   * @param {path} file 文件路径
   * @return {string|undefined} 返回文件的数据类型，例如：**.json => json; **.txt => txt
   */
  getFileType(file) {
    const type = file.match(/\.([^.]+)$/i);
    if (type && type.length >= 2) return type[1];
    return void 0;
  },
};