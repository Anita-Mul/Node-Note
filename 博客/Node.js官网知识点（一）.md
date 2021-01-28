1. V8是支持Google Chrome浏览器的JavaScript引擎的名称。V8提供了运行JavaScript的运行时环境。
2. 如何退出Node.js程序
	 · 在控制台：ctrl + c
	 · `process`核心模块提供的`process.exit()`
	 · 成功退出：`process.exit(0);`
	 · 失败退出：`process.exit(1);`
	 · 也可以设置`process.exitCode = 1;`
	 · 如果使用`process.exit()`，那么任何当前待处理或正在运行的请求都将被中止。这不好。
	 · 也可以向该命令发送SIGTERM信号
	```javascript
	//首先node app.js
	//接着node test.js就终止了
	//app.js
	//SIGTERM是告诉进程正常终止的信号
	const express = require('express')

	const app = express()
	
	app.get('/', (req, res) => {
	    //console.log(process.pid);
	    res.send(process.pid)
	})
	
	const server = app.listen(3000, () => console.log('Server ready'))
	
	process.on('SIGTERM', () => {
	    server.close(() => {
	        console.log('Process terminated')
	    })
	})
	```
	```javascript
	//test.js
	process.kill(18236, 'SIGTERM')
	//process.kill(process.pid, 'SIGTERM')
	```
3. 如何使用Node.js REPL
	直接在控制台输入node可以打开命令行
	在编写代码的时候，如果tab按键，REPL将尝试自动编写
	输入JavaScript类的名称，例如Number，添加一个点并按tab。将显示该类所有的属性和方法
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126210820974.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
通过全局键入global. 按tab
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126210939378.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126211004421.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
输入第一行内容之后，按下Enter键，REPL将自动跳转到...开头的新行
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126211045882.png)
4. Node.js，从命令行接收参数
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210126212453178.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
	```javascript
	// 第一个元素是node命令的完整路径。
	// 第二个元素是正在执行的文件的完整路径。
	// 从第三个位置开始，所有其他参数都存在。
	
	//排除前两个参数的新数组
	const args = process.argv.slice(2)

	//node app.js joe
	const args = process.argv.slice(2)
	args[0]

	//node app.js name=joe
	const args = require('minimist')(process.argv.slice(2))
	args['name'] //joe
	```

5. 使用Node.js输出到命令行
	```javascript
	————————————————————————————————
	//清空控制台
	console.clear()
	————————————————————————————————
	//计数方法，首先输出count()括号里面的字符串，后面跟着:，再加上count()里面字符串出现的个数
	const x = 1
	const y = 2
	const z = 3
	console.count(
	    'The value of x is ' + x +
	    ' and has been checked .. how many times?'
	)
	console.count(
	    'The value of x is ' + x +
	    ' and has been checked .. how many times?'
	)
	console.count(
	    'The value of y is ' + y +
	    ' and has been checked .. how many times?'
	)
	// The value of x is 1 and has been checked .. how many times?: 1
	// The value of x is 1 and has been checked .. how many times?: 2
	// The value of y is 2 and has been checked .. how many times?: 1
	————————————————————————————
	// console.trace() 打印堆栈跟踪
	const function2 = () => console.trace()
	const function1 = () => function2()
	function1()
	/*
	Trace
	    at function2 (repl:1:33)
	    at function1 (repl:1:25)
	    at repl:1:1
	    at ContextifyScript.Script.runInThisContext (vm.js:44:33)
	    at REPLServer.defaultEval (repl.js:239:29)
	    at bound (domain.js:301:14)
	    at REPLServer.runBound [as eval] (domain.js:314:12)
	    at REPLServer.onLine (repl.js:440:10)
	    at emitOne (events.js:120:20)
	    at REPLServer.emit (events.js:210:7) */
	——————————————————————————————
	
	// 计算花费的时间
	const doSomething = () => 	console.log('test')
	const measureDoingSomething = () => {
	    console.time('doSomething()')
	    //do something, and measure the time it takes
	    doSomething()
	    console.timeEnd('doSomething()')
	}
	measureDoingSomething() 
	/*
	test
	doSomething(): 4.260ms
	*/
	
	————————————————————————————————————

	// 为错误着色
	//这个是底层原理
	console.log('\x1b[33m%s\x1b[0m', 'hi!') 
	
	//可以 npm install chalk
	const chalk = require('chalk')
	console.log(chalk.yellow('hi!'))

	————————————————————————————————————
	// 创建进度条（npm install progress）
	// 此代码段创建了一个10步进度条，每100毫秒完成一次步。当条完成时，我们清除间隔：
	const ProgressBar = require('progress')

	const bar = new ProgressBar(':bar', { total: 10 })
	const timer = setInterval(() => {
	    bar.tick()
	    if (bar.complete) {
	        clearInterval(timer)
	    }
	}, 100)
	
	```
6. 接受来自Node.js命令行的输入
	· 提供了`readline`模块
	```javascript
	const readline = require('readline').createInterface({
	  input: process.stdin,
	  output: process.stdout
	})
	
	readline.question(`What's your name?`, name => {
	  console.log(`Hi ${name}!`)
	  readline.close()
	})
	```
	· `Inquirer.js`允许您执行许多操作，例如询问多项选择，具有单选按钮，确认等（是一个最佳选择）
	```javascript
	const inquirer = require('inquirer')
	
	var questions = [
	  {
	    type: 'input',
	    name: 'name',
	    message: "What's your name?"
	  }
	]
	
	inquirer.prompt(questions).then(answers => {
	  console.log(`Hi ${answers['name']}!`)
	})
	```
	[inquirier](https://www.npmjs.com/package/inquirer?activeTab=readme)	