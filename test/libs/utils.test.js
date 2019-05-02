const { writeFileSync, existsSync, unlinkSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { expect } = require('chai');
const chalk = require('chalk');
const { cwd, _debug, _error, exists, getPackage } = require('../../libs/utils');

describe('libs/utils.js', () => {
  it('cwd', () => {
    expect(cwd).to.equal(process.env.PWD || process.env.INIT_CWD || process.cwd() || '');
  });

  it('debug: true', () => {
    const ret = _debug(true, 1, 'hello', true);
    expect(ret[0]).to.equal(chalk.gray('[DEBUG]'));
    expect(ret[1]).to.equal(chalk.magenta(1));
    expect(ret[2]).to.equal(chalk.magenta('hello'));
    expect(ret[3]).to.equal(chalk.magenta(true));
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

  it('exists: true', () => {
    const name = 'exists.true.txt';
    const filepath = resolve(__dirname, name);
    writeFileSync(filepath, 'hello', 'utf-8');
    if (!existsSync(filepath)) {
      // eslint-disable-next-line no-console
      console.warn('exists:true\'s unit test error self');
    }
    expect(exists(resolve(__dirname, name))).to.equal(true);
    expect(exists(resolve(cwd, 'test/libs', name))).to.equal(true);
    expect(exists(resolve('test/libs', name))).to.equal(true);
    unlinkSync(filepath);
  });
  it('exists: false', () => {
    expect(exists('random.txt')).to.equal(false);
    expect(exists('hello')).to.equal(false);
  });

  it('getPackage: current package.json', () => {
    const pkg = getPackage();
    expect(pkg).to.equal(require('../../package.json'));
  });

  it('getPackage: cwd\'s root package.json', () => {
    const pkg = getPackage();
    let pkgfs = readFileSync(resolve(cwd, 'package.json'), 'utf-8');
    expect(pkg).to.deep.equal(JSON.parse(pkgfs));
  });
});