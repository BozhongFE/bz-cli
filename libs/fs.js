/**
 * 读取文件
 */
const { readFileSync, writeFileSync, ensureDirSync } = require('fs-extra');
const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const { isBinaryFileSync } = require('isbinaryfile');
const normalizeFilePaths = require('./normalizeFilePaths');

module.exports = {
  async readFiles(context, options = {
    hasContent: true,
    ignore: [],
  }) {
    const files = await globby(['**'], {
      cwd: context,
      onlyFiles: true,
      gitignore: true,
      ignore: ['**/node_modules/**', '**/.git/**', '**/.DS_Store/**'].concat(options.ignore || []),
      dot: true
    });
    const res = {};
    for (const file of files) {
      const name = path.resolve(context, file);
      if (!options.hasContent) {
        res[file] = '';
      } else {
        res[file] = isBinaryFileSync(name)
          ? fs.createReadStream(name)
          : readFileSync(name, 'utf-8');
      }
    }
    return normalizeFilePaths(res);
  },
  async writeFileTree (dir, files, previousFiles) {
    if (process.env.VUE_CLI_SKIP_WRITE) {
      return false;
    }
    if (previousFiles) {
      await deleteRemovedFiles(dir, files, previousFiles);
    }
    Object.keys(files).forEach((name) => {
      const filePath = path.join(dir, name);
      ensureDirSync(path.dirname(filePath));
      if (files[name].pipe) {
        // fix stream file, example: png
        files[name].pipe(fs.createWriteStream(filePath));
      } else {
        writeFileSync(filePath, files[name]);
      }
    });
  }
};

function deleteRemovedFiles (directory, newFiles, previousFiles) {
  // get all files that are not in the new filesystem and are still existing
  const filesToDelete = Object.keys(previousFiles)
    .filter(filename => !newFiles[filename]);

  // delete each of these files
  return Promise.all(filesToDelete.map(filename => {
    return fs.unlink(path.join(directory, filename));
  }));
}