# bz-cli

一个播种前端命令行工具

## 使用方法

目前 `bz-cli` 被占用，全局安装用 github 地址来安装

```bash
npm i -g https://github.com/BozhongFE/bz-cli
bz <command> [options]
```


## config

配置命令行工具

### command

```bash
bz config set <key> <value>
bz config delete <key>
bz config list [--json]
```

### cli config

```bash
bz config set config /xxx/xxx.json
```

```json
{
  "global": {
    "XXX_XXX_COM": "http://xxx.xxx.com",
  },
  "htmlblock": {
    "url": "cms => htmlblock => publish url"
  }
}
```

## less

根据当前项目下的 package.json.application.less[] 配置编译 `less`

```bash
bz less [options]
```

配置规范如下：
```json
{
  "name": "project name",
  ...
  "application": {
    "less": [
      {
        "from": "less/style.less",
        "to": "css/style.css"
        ...
      }
    ]
  }
}
```

### [options]

+ -w, --watch

监听文件变化，内部监听 `./**/*.less`

### package.json

+ package.json.browserslist

内置了 [`autoprefixer`](https://github.com/postcss/autoprefixer) 来处理浏览器前缀兼容问题，参数可以配置到这里

+ package.json.application

`bz-cli` 的配置项内容

+ package.json.application.less

`less` 命令对应的配置项，详细请看下面

### package.json.application.less

+ less[].debug

`debug` 模式，默认值：`true`
ps: `application.debug` < `application.less[].debug`

+ less[].from

`less` 的源文件，默认为 `./less/style.less`

+ less[].to

`less` 的目标文件，默认为 `./css/style.css`

+ less[].options

[`lesscss`](http://lesscss.org/usage/#less-options) 的 `options` 配置

+ less[].cssmin

是否压缩 `css`，默认值：`false`

+ less[].cleanCSS

压缩 `css` 用的是 [`clean-css`](https://github.com/jakubpawlowicz/clean-css)插件，这里是 `clean-css` 的 `options` 配置

+ less[].header

支持 `css` 头部注释自定义，用的是 [`gulp-header`](https://github.com/tracker1/gulp-header) 插件

+ less[].base64

默认小图转 [`base64`](https://github.com/Wenqer/gulp-base64)，此参数用于配置 `base64`


## js

根据当前项目下的 package.json.application.js[] 配置合并压缩 `js`

```bash
bz js [options]
```

配置规范如下：
```json
{
  "name": "project name",
  ...
  "application": {
    "js": [
      {
        "from": [ "js/index.less" ],
        "to": "js/index_bundle.js",
        "for": "首页脚本"
        ...
      }
    ]
  }
}
```

### [options]

+ -w, --watch

监听文件变化，监听 `package.json.application.js[].from`

### package.json

+ package.json.application

`bz-cli` 的配置项内容

+ package.json.application.js

`js` 命令对应的配置项，详细请看下面

### package.json.application.js

+ js[].debug

`debug` 模式，默认值：`true`
ps: `application.debug` < `application.js[].debug`

+ js[].from

`js` 的源文件集合（数组）

+ js[].to

`js` 的目标文件（合并压缩后的文件）

+ js[].concat

合并 `js`，默认每个 `js` 独立占用一行  
[`concat`](https://github.com/gulp-community/gulp-concat) 的配置

+ js[].jsmin

是否压缩 `js`，默认值：`false`，压缩用的是 `uglifyjs`

+ js[].uglifyjs

[`uglifyjs`](https://github.com/terinjokes/gulp-uglify) 的 `options` 配置

+ js[].header

支持 `js` 顶部注释自定义，用的是 [`gulp-header`](https://github.com/tracker1/gulp-header) 插件

+ js[].for

默认自带有顶部注释内容，其中有个 `for` 属性说明，可在这里配置，用于说明合并后文件的作用

## html

把当前项目下的 _*.html 文件编译成 *.html
ps：构建全部 _*.html 时，只构建一天之内修改过的文件

```bash
bz html [options]
```

### [options]

+ -w, --watch

监听文件变化，内部监听 `./**/_*.html`、`./package.html`