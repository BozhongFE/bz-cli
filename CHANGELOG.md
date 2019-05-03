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
