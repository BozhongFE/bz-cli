const { writeFileSync, unlinkSync } = require('fs');
const { resolve } = require('path');
const { expect } = require('chai');
const cfs = require('../../libs/fs');

describe('libs/fs.js', () => {
  describe('getFileType', () => {
    it('getFileType: json', () => {
      const file1 = resolve(__dirname, '0001.json');
      const json1 = { a: 1 };
      writeFileSync(file1, JSON.stringify(json1), 'utf8');
      const type1 = cfs.getFileType(file1);
      expect(type1).to.equal('json');
      unlinkSync(file1);
    });

    it('getFileType: undefined', () => {
      const file2 = resolve(__dirname, '0002');
      writeFileSync(file2, 'test', 'utf8');
      const type2 = cfs.getFileType(file2);
      expect(type2).to.equal(void 0);
      unlinkSync(file2);
    });
  });

  describe('readFile', () => {
    const file3 = resolve(__dirname, '0003.json');
    const json3 = { b: 3 };
    writeFileSync(file3, JSON.stringify(json3), 'utf8');

    it('**.json: format: fileType(json)', () => {
      const content = cfs.readFile(file3);
      expect(content).to.deep.equal(json3);
    });

    it('**.json: format: json 2 txt', () => {
      const content = cfs.readFile(file3, 'txt');
      expect(content).to.equal(JSON.stringify(json3));
      unlinkSync(file3);
    });
    
    const file4 = resolve(__dirname, '0004.txt');
    const json4 = { c: 4 };
    writeFileSync(file4, JSON.stringify(json4), 'utf8');
    it('**.txt: format: fileType(txt)', () => {
      const content = cfs.readFile(file4);
      expect(content).to.equal(JSON.stringify(json4));
    });
    it('**.txt: format: txt 2 json', () => {
      const content = cfs.readFile(file4, 'json');
      expect(content).to.deep.equal(json4);
      unlinkSync(file4);
    });
  });

  describe('getCache', () => {
    it('getFile before/after', () => {
      const file5 = resolve(__dirname, '0005.json');
      const json5 = { d: { e: 5 } };
      writeFileSync(file5, JSON.stringify(json5), 'utf8');
      // before
      const cache = cfs.getCache(file5);
      expect(cache).to.deep.equal(void 0);
      // getFile
      const content = cfs.getFile(file5);
      expect(content).to.deep.equal(json5);
      // after
      const cache1 = cfs.getCache(file5);
      expect(cache1).to.deep.equal(content);
      unlinkSync(file5);
    });
  });

  describe('getFile', () => {
    const file7 = resolve(__dirname, '0007.json');
    const json7 = { g: 7 };
    writeFileSync(file7, JSON.stringify(json7), 'utf8');
    it('**.json: cache', () => {
      const content = cfs.getFile(file7);
      expect(content).to.deep.equal(json7);
    });

    it('**.json: no cache', () => {
      const newjson7 = { h: 7 };
      writeFileSync(file7, JSON.stringify(newjson7), 'utf8');

      const content = cfs.getFile(file7);
      expect(content).to.deep.equal(json7);

      const content1 = cfs.getFile(file7, { cache: false });
      expect(content1).to.deep.equal(newjson7);
      unlinkSync(file7);
    });
  });
});
