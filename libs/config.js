/* eslint-disable no-console */
const { existsSync, readFileSync } = require('fs');
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
