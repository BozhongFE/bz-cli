/**
 * 命令行工具的配置文件
 */
/* eslint-disable no-console */
const { existsSync, readFileSync } = require('fs-extra');
const cliConfig = require('node-cli-config');

const rc = module.exports = cliConfig({
  dir: '.',
  file: '.bzrc',
});

rc.echo = (isJson) => {
  const infoArr = [`; bzrc ${rc.spmrcfile}`];
  if (existsSync(rc.spmrcfile)) {
    infoArr.push(isJson ? rc.config() : readFileSync(rc.spmrcfile, 'utf8'));
  }
  return infoArr;
};

// rc.apprc = () => {
//   const apprc = rc.get('config');
//   if (existsSync(apprc)) {
//     error('请检查 bz-cli 的 config 配置文件是否存在');
//     return error(`config = ${configFile}`);
//   }
//   const config = bzConf.parseJson(configFile);
//   if (!config) {
//     return error(`${configFile} 必须是 JSON 格式`);
//   }
// };