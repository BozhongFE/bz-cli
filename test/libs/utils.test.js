const { writeFileSync, existsSync, unlinkSync } = require('fs');
const { resolve } = require('path');
const { expect } = require('chai');
const { cwd, exists, getPackageSrc, debounce } = require('../../libs/utils');

describe('libs/utils.js', () => {
  it('cwd', () => {
    expect(cwd).to.equal(process.env.PWD || process.env.INIT_CWD || process.cwd() || '');
  });

  describe('exists', () => {
    it('true', () => {
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
    it('false', () => {
      expect(exists('random.txt')).to.equal(false);
      expect(exists('hello')).to.equal(false);
    });
  });

  it('getPackageSrc', () => {
    const pkgSrc = getPackageSrc();
    expect(pkgSrc).to.equal(resolve(cwd, 'package.json'));
    expect(pkgSrc).to.equal(resolve(__dirname, '../../package.json'));
  });

  describe('debounce', () => {
    it('normal', (done) => {
      let times = 0;
      debounce(() => times += 1);
      debounce(() => {
        times += 1;
        expect(times).to.equal(1);
        done();
      });
    });

    it('not timeout: 100ms', (done) => {
      let times = 0;
      debounce(() => times += 1);
      setTimeout(() => debounce(() => {
        times += 1;
        expect(times).to.equal(1);
        done();
      }), 100);
    });

    it('timeout: 120ms', (done) => {
      let times = 0;
      debounce(() => times += 1);
      setTimeout(() => debounce(() => {
        times += 1;
        expect(times).to.equal(2);
        done();
      }), 120);
    });
  });
});
