# bz-cli

一个播种前端命令行工具

## 使用方法

```bash
npm i -g bz-cli
bz <command> [options]
```

## less

```bash
bz less
```

自动读取当前目录下的 package.json 配置文件，配置规范如下：
```json
{
  "name": "project name",
  ...
  "application": {
    "less": [
      {
        "from": "less/style.less",
        "to": "css/style.css"
      }
    ]
  }
}
```

ps: debug模式： application.debug < application.less[].debug

## 历史版本

### 0.0.1

|version|description|
|---|---|
|0.0.1|初始化命令行工具, 以及eslint, mocha|
|0.0.1|新增libs/utils基础库，并编写对应的测试用例|
|0.0.1|新增基础less编译，基于gulp、gulp-less|
