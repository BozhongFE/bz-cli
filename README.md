# bz-cli

一个播种前端命令行工具，详细请看[bz-cli-wiki](https://github.com/BozhongFE/bz-cli/wiki)

## 使用方法

```bash
# 默认最新代码，不推荐
npm install -g https://github.com/BozhongFE/bz-cli
# tag 形式安装，推荐，请自行查看最新的 tag 版本号
npm install -g https://github.com/BozhongFE/bz-cli#v1.0.0
bz <command> [options]
```

## 命令列表

```bash
bz config
bz less
bz css
bz js
bz html
bz build
```

### bz build - V1.1.0新增
> 用于组件打包，默认打包[pageage.json[name]].umd.js和esm.js，可在执行路径下新建自定义打包配置文件build.config.js
```javascript
// 示例
const curDirPath = process.cwd();
const config = require(curDirPath + '/package.json');
const path = require('path');
const name = config.name;

exports = {
  'dist-esm': {
    input: curDirPath + '/src/index.js',
    format: 'es',
    moduleName: name,
    output: path.join(curDirPath + '/dist/', name + '.esm.js'),
    hasExternal: true,
  },
  'dist-core-esm': {
    input: curDirPath + '/src/module/core.js',
    format: 'es',
    moduleName: name,
    output: path.join(curDirPath + '/dist/', name + '-core.esm.js'),
    hasExternal: true,
  },
  'dist-axios-esm': {
    input: curDirPath + '/src/index-taro.js',
    format: 'es',
    moduleName: name,
    output: path.join(curDirPath + '/dist/', name + '-taro.esm.js'),
    hasExternal: true,
  }
}
```