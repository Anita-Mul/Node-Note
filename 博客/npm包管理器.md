1. 更新包
	`npm update`
	npm 将检查所有软件包是否有满足您的版本限制的较新版本。
您也可以指定一个包进行更新：
	`npm update <package-name>`
2. 使用-g进行全局安装
	`npm install -g lodash`
3. 如何使用或执行npm安装的软件包
	如果装的软件包是可执行文件，它将把可执行文件放在node_modules/.bin/文件夹下。
	`npm install cowsay`
	如何执行上面这个可执行文件呢？当然可以键入./node_modules/.bin/cowsay运行它
	也可以直接`npx cowsay hello worls`，npx将会自动找到程序包的位置
4. package.json指南
	```json
	{
	  //设置应用、程序包名字
	  //此属性可以作为GitHub仓库的名字
	  //名称必须少于214个字符，不能包含空格，只能包含小写字母，连字符（-）或下划线（_）
	  "name": "test-project",
	  //列出软件包作者名称
	  "author": "Joe <joe@whatever.com> (https://whatever.com)",
	  //列出贡献者的数组
	  "contributors": [
	    "Joe <joe@whatever.com> (https://whatever.com)",
	    "Joe <joe@whatever.com> (https://whatever.com)"
	  ],
	  //指定当前版本
	  //第一个数字是主要版本(后面有可能有重大改动)
	  //第二个数字是次要版本（引入向后兼容更改的发行版本）
	  //第三个数字是补丁程序版本（仅修复错误的发行版）
	  "version": "1.0.0",
	  //是应用程序/程序包的简要说明,对了解软件包内的内容特别有用
	  "description": "A Vue.js project",
	  //设置应用程序的入口点
	  "main": "src/main.js",
	  //private如果设置为true防止应用程序/软件包被意外发布到npm
	  "private": true,
	  //定义一组可以运行的节点脚本
	  //可以通过npm run XXX / yarn XXX 来运行
	  "scripts": {
	    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
	    "start": "npm run dev",
	    "unit": "jest --config test/unit/jest.conf.js --coverage",
	    "test": "npm run unit",
	    "lint": "eslint --ext .js,.vue src test/unit",
	    "build": "node build/build.js"
	  },
	  //设置npm安装为依赖项的软件包列表
	  "dependencies": {
	    "vue": "^2.5.2"
	  },
	  //设置npm安装为开发依赖项的软件包列表
	  "devDependencies": {
	    "autoprefixer": "^7.1.2",
	    "babel-core": "^6.22.1",
	    "babel-eslint": "^8.2.1",
	    "babel-helper-vue-jsx-merge-props": "^2.0.3",
	    "babel-jest": "^21.0.2",
	  },
	  //设置此程序包/应用程序在哪个版本的Node.js上运行
	  "engines": {
	    "node": ">= 6.0.0",
	    "npm": ">= 3.0.0",
	    "yarn": "^0.13.0",
	  },
	  //用于告诉您要支持哪些浏览器（及其版本）
	  "browserslist": [
	    "> 1%",
	    "last 2 versions",
	    "not ie <= 8"
	  ],
	  //链接到软件包问题跟踪器，最有可能是GitHub问题页面
	  "bugs": "https://github.com/whatever/package/issues",
	  //设置程序包主页
	  "homepage": "https://whatever.com/package",
	  //指示软件包的许可证
	  "license": "MIT",
	  //此属性包含与包功能相关的关键字数组
	  "keywords": [
	    "email",
	    "machine learning",
	    "ai"
	  ],
	  //指定此软件包储存库所在的位置
	  "repository": "github:whatever/testing",
	  //还可以显示设置版本控制系统
	  /*
	  "repository": {
	    "type": "git", //也可以是"type": "svn",
	    "url": "https://github.com/whatever/testing.git"  //"url": "..."
	  }
	  */
	}
	```
5. 安装开发依赖
	```bash
	npm install --save-dev <PACKAGENAME>
	yarn add --dev <PACKAGENAME>
	```
6. package-lock.json文件
	`npm install`可以用来重新生成package.json文件。
7. 查找npm软件包的安装版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127093224653.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
也可以打开package-lock.json文件来显示上面的效果。
`npm list -g`是相同的，但是对于全局安装的软件包
获取顶级软件包：`npm list --depth=0`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127093738815.png)
可以通过特定软件包名称来获取其版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210127093911120.png)
如果要查看npm存储库上软件包的最新可用版本，请运行npm view [package_name] version：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021012709401131.png)
8. 列出软件包所有先前版本
	![在这里插入图片描述](https://img-blog.csdnimg.cn/2021012709435093.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
9. 将所有Node.js依赖项更新为最新版本
	 `npm update` 将 package.json使用更新的版本进行更新
	 `npm update --no-save`不更新package.json
	 `npm outdated`  检查过时的软件包
	 [npm outdated](https://juejin.cn/post/6844903960784961543)
10. npm 的语义版本控制
	```bash
	所有版本都有3位数字：x.y.z
	第一位是主要版本
	第二个数字是次要版本
	第三位数是补丁版本
	
	`~`会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
	`^`会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
	>：您接受比您指定的版本更高的任何版本
	>=：您接受等于或高于您指定的版本的任何版本
	<=：您接受等于或低于您指定的版本的任何版本
	<：您接受低于您指定的任何版本
	=：您接受该确切版本
	-：您接受各种版本。例：2.1.0 - 2.6.2
	||：您组合套。例：< 2.1 || > 2.6
	```
11. 卸载npm软件包
	```bash 
	npm uninstall <package-name>
	
	//使用-S或者--save，还可以删除package.json文件中的引用
	npm uninstall -S <package-name>
	
	//如果该软件包是开发依赖，则必须使用-D/--save-dev标志将其从文件中删除
	npm uninstall -D <package-name>
	
	//如果软件包是全局安装的，则需要添加-g/--global标志
	npm uninstall -g <package-name>
	```
12. npm全局或本地软件包
	通常，所有软件包都应该在本地安装。
	不用管指令具体是什么，只要提供指令的包都建议使用全局安装；其它包打包是提供一个功能，用于解决某一需求，建议安装成本地包。
	使用`npm list -g --depth 0`，查看全局安装包
13. 安装
`npm install` 安装所有依赖
`npm install --production` 安装生产依赖
`npm install xx --save` 安装XX到生产环境依赖
`npm install --save-dev` 安装XX到开发环境依赖
14. npx Node.js包运行器
 **轻松运行本地命令**：Node.js开发人员过去通常将大多数可执行命令发布为全局包，以使它们立即位于路径中并可执行。“运行”会`npx commandname`自动在`node_modules`项目的文件夹中找到命令的正确引用，而无需知道确切的路径，也不需要在全局和用户路径中安装软件包。
**无需安装的命令执行**：`npx cowsay "Hello"`