## 对应文件及文件夹的用处
1. models: 存放操作数据库的文件
2. public: 存放静态文件，如样式、图片等
3. routes: 存放路由文件
4. views: 存放模板文件
5. index.js: 程序主文件
6. package.json: 存储项目名、描述、作者、依赖等等信息

***

## 安装依赖模块
运行以下命令安装所需模块：

```sh
npm i config-lite connect-flash connect-mongo ejs express express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save
npm i https://github.com:utatti/express-formidable.git --save # 从 GitHub 安装 express-formidable 最新版，v1.0.0 有 bug
```

对应模块的用处：

1. `express`: web 框架
2. `express-session`: session 中间件
3. `connect-mongo`: 将 session 存储于 mongodb，结合 express-session 使用
4. `connect-flash`: 页面通知的中间件，基于 session 实现
5. `ejs`: 模板
6. `express-formidable`: 接收表单及文件上传的中间件
7. `config-lite`: 读取配置文件
8. `marked`: markdown 解析
9. `moment`: 时间格式化
10. `mongolass`: mongodb 驱动
11. `objectid-to-timestamp`: 根据 ObjectId 生成时间戳
12. `sha1`: sha1 加密，用于密码加密
13. `winston`: 日志
14. `express-winston`: express 的 winston 日志中间件

后面会详细讲解这些模块的用法。

***
## 4.2.3 ESLint
全局安装 eslint：

```sh
npm i eslint -g
```

运行：

```sh
eslint --init
```

初始化 eslint 配置，依次选择：

-> Use a popular style guide  
-> Standard  
-> JSON

> 注意：如果 Windows 用户使用其他命令行工具无法上下切换选项，切换回 cmd。

eslint 会创建一个 .eslintrc.json 的配置文件，同时自动安装并添加相关的模块到 devDependencies。这里我们使用 Standard 规范，其主要特点是不加分号。

***
### 4.2.4 EditorConfig

EditorConfig 是一个保持缩进风格的一致的工具，当多人共同开发一个项目的时候，往往会出现每个人用不同编辑器的情况，而且有的人用 tab 缩进，有的人用 2 个空格缩进，有的人用 4 个空格缩进，EditorConfig 就是为了解决这个问题而诞生。

- VS Code 需要装一个插件：EditorConfig for VS Code

在 myblog 目录下新建 .editorconfig 的文件，添加如下内容：

```
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
tab_width = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

这里我们使用 2 个空格缩进，tab 长度也是 2 个空格。trim_trailing_whitespace 用来删除每一行最后多余的空格，insert_final_newline 用来在代码最后插入一个空的换行。

***
## config-lite
我们通常将配置写到一个配置文件里，如 config.js 或 config.json。本地开发环境、测试环境和线上环境，不同环境的配置不同（如：MongoDB 的地址），我们不可能每次部署时都要去修改引用 config.test.js 或者 config.production.js。config-lite 模块正是你需要的。
[config-lite](https://www.npmjs.com/package/config-lite) 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（`NODE_ENV`）的不同加载 config 目录下不同的配置文件。如果不设置 `NODE_ENV`，则读取默认的 default 配置文件，如果设置了 `NODE_ENV`，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 `NODE_ENV=test node app` 启动，则 config-lite 会依次降级查找 `config/test.js`、`config/test.json`、`config/test.node`、`config/test.yml`、`config/test.yaml` 并合并 default 配置; 如果程序以 `NODE_ENV=production node app` 启动，则 config-lite 会依次降级查找 `config/production.js`、`config/production.json`、`config/production.node`、`config/production.yml`、`config/production.yaml` 并合并 default 配置。

config-lite 还支持冒泡查找配置，即从传入的路径开始，从该目录不断往上一级目录查找 config 目录，直到找到或者到达根目录为止。

在 myblog 下新建 config 目录，在该目录下新建 default.js，添加如下代码：

**config/default.js**

```js
module.exports = {
  port: 3000,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'
}
```

配置释义：

1. `port`: 程序启动要监听的端口号
2. `session`: express-session 的配置信息，后面介绍
3. `mongodb`: mongodb 的地址，以 `mongodb://` 协议开头，`myblog` 为 db 名
