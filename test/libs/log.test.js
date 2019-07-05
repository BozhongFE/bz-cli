const { expect } = require('chai');
const chalk = require('chalk');
const { _debug, _error, _info } = require('../../libs/log');

describe('libs/utils.js', () => {
  it('debug: true', () => {
    const ret = _debug(true, 1, 'hello', true);
    expect(ret[0]).to.equal(chalk.gray('[DEBUG]'));
    expect(ret[1]).to.equal(chalk.bold.magenta(1));
    expect(ret[2]).to.equal(chalk.bold.magenta('hello'));
    expect(ret[3]).to.equal(chalk.bold.magenta(true));
  });
  it('debug: false', () => {
    const ret1 = _debug(false, 1, 'hello', true);
    expect(ret1).to.equal(false);
    const ret2 = _debug(null, 1, 'hello', true);
    expect(ret2).to.equal(false);
  });

  it('error', () => {
    const ret = _error(1, 'hello', true);
    expect(ret[0]).to.equal(chalk.gray('[ERROR]'));
    expect(ret[1]).to.equal(chalk.bold.red(1));
    expect(ret[2]).to.equal(chalk.bold.red('hello'));
    expect(ret[3]).to.equal(chalk.bold.red(true));
  });

  it('info', () => {
    const ret = _info(1, 'hello', true);
    expect(ret[0]).to.equal(chalk.gray('[INFO]'));
    expect(ret[1]).to.equal(chalk.bold.white(1));
    expect(ret[2]).to.equal(chalk.bold.white('hello'));
    expect(ret[3]).to.equal(chalk.bold.white(true));
  });
});
