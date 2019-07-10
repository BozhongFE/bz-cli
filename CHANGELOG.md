# Changelog

## 1.0.0-alpha.0

- [new] [cli] 初始化 `bz-cli`, 以及`eslint`, `mocha`
- [new] [libs] 新增 `libs/utils` 基础库，并编写对应的测试用例
- [new] [less] 新增基础 `less` 编译，基于 `gulp`、`gulp-less`

## 1.0.0-alpha.1

- [fix] [less] 编译后的文件名不对
- [new] [less] 新增 `css` 压缩功能
- [new] [less] 新增 `css` 前缀（`autoprefixer`）

## 1.0.0-alpha.2

- [new] [libs] 基础库新增 `info` 方法，并编写对应的测试用例
- [new] [less] 新增 `options` `-w` 监听文件变化

## 1.0.0-alpha.3

- [new] [libs] 重写 `getPackage`，改成动态加载 `package.json`
- [new] [libs] 新增 `getPackageSrc`，获取 `package.json` 对应的路径
- [new] [less] `watcher` 新增 `package.json` 监听
- [new] [less] 新增 `less[].header` 参数，用于添加 `css` 头部注释

## 1.0.0-alpha.4

- [new] [less] 新增小图转 `base64`

## 1.0.0-alpha.5

- [new] [js] 新增 `bz js` 命令，用于合并压缩 `js`

## 1.0.0-alpha.6

- [fix] [js] 修正合并 `js` 功能，header 为空出现 `undefined` 问题
- [new] [js] 新增压缩 `js` 开关

## 1.0.0-alpha.7

- [new] [config] 新增 `bz config` 命令，用于自定义工具命令的配置文件

## 1.0.0-alpha.8

- [optimize] [libs] 提取 log.js，新增 fs.js 处理文件读取，并对命令的依赖进行修改

## 1.0.0-alpha.9

- [new] [html] 新增 `bz html` 命令，用于构建html

## 1.0.0-alpha.10

- [new] [html] 新增 htmlblock 支持

## 1.0.0-alpha.11

- [fix] [html] htmlblock 兼容多参数

## 1.0.0-alpha.12

- [new] [css] 新增 `bz css` 命令，用于合并压缩 css