const { existsSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { expect } = require('chai');
const rc = require('../../libs/config');

describe('libs/config.js', () => {
  it('.bzrc', () => {
    const homedir = process.env.HOME || `${process.env.HOMEDRIVE}${process.env.HOMEPATH}`;
    const spmrcfile = resolve(homedir, '.', '.bzrc');
    expect(rc.spmrcfile).to.equal(spmrcfile);
  });

  it('event: echo', () => {
    const infos = rc.echo();
    expect(infos[0]).to.equal(`; bzrc ${rc.spmrcfile}`);
    if (existsSync(rc.spmrcfile)) {
      expect(infos[1]).to.equal(readFileSync(rc.spmrcfile, 'utf8'));
    }
  });

  it('event: echo --json', () => {
    const infos = rc.echo(true);
    if (existsSync(rc.spmrcfile)) {
      expect(infos[1]).to.deep.equal(rc.config());
    }
  });
});
