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
