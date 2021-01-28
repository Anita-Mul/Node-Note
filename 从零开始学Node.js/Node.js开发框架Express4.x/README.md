## 建立express项目
 - 创建项目
	`express -e nodejs-demo`
 - 进入项目目录，创建`package-lock.json`
	`cd nodejs-demo && npm install`
 - 启动项目
	`npm start`
***
## Express
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021012822111192.png)
 - bin, 存放启动项目的脚本文件
 - node_modules, 存放所有的项目依赖库。
 - public，静态文件(css,js,img)
 - routes，路由文件(MVC中的C,controller)
 - views，页面文件(Ejs模板)
 - package.json，项目依赖配置及开发者信息
 - app.js，应用核心配置文件
	```javascript
	app.js
	// 加载依赖库
	var createError = require('http-errors');
	var express = require('express');
	var path = require('path');
	var cookieParser = require('cookie-parser');
	var logger = require('morgan');
	
	// 加载路由控制
	var indexRouter = require('./routes/index');
	var usersRouter = require('./routes/users');
	
	// 创建项目实例
	var app = express();
	
	// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模板引擎
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	
	//定义日志和输出级别
	app.use(logger('dev'));
	//定义数据解析器
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	//定义cookie解析器
	app.use(cookieParser());
	//定义静态文件目录
	app.use(express.static(path.join(__dirname, 'public')));
	
	//匹配路径和路由
	app.use('/', indexRouter);
	app.use('/users', usersRouter);
	
	//404错误处理
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  next(createError(404));
	});
	
	//开发环境和生产环境，500错误处理
	app.use(function (err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};
	
	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
	
	module.exports = app;
	```
 - ./bin/www文件
	```javascript
	#!/usr/bin/env node
	//项目启动代码
	//www文件也是node的脚本，用于分离配置和启动程序
	
	/**
	 * Module dependencies.
	 * 依赖加载
	 */
	
	var app = require('../app');
	var debug = require('debug')('nodejs-demo:server');
	var http = require('http');
	
	/**
	 * Get port from environment and store in Express.
	 * 定义启动端口
	 */
	
	var port = normalizePort(process.env.PORT || '3000');
	app.set('port', port);
	
	/**
	 * Create HTTP server.
	 * 创建HTTP服务实例
	 */
	
	var server = http.createServer(app);
	
	/**
	 * Listen on provided port, on all network interfaces.
	 * 启动网络服务监听端口
	 */
	
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
	
	/**
	 * Normalize a port into a number, string, or false.
	 * 端口标准化函数
	 */
	
	function normalizePort(val) {
	  var port = parseInt(val, 10);
	
	  if (isNaN(port)) {
	    // named pipe
	    return val;
	  }
	
	  if (port >= 0) {
	    // port number
	    return port;
	  }
	
	  return false;
	}
	
	/**
	 * Event listener for HTTP server "error" event.
	 * HTTP异常事件处理函数
	 */
	
	function onError(error) {
	  if (error.syscall !== 'listen') {
	    throw error;
	  }
	
	  var bind = typeof port === 'string'
	    ? 'Pipe ' + port
	    : 'Port ' + port;
	
	  // handle specific listen errors with friendly messages
	  switch (error.code) {
	    case 'EACCES':
	      console.error(bind + ' requires elevated privileges');
	      process.exit(1);
	      break;
	    case 'EADDRINUSE':
	      console.error(bind + ' is already in use');
	      process.exit(1);
	      break;
	    default:
	      throw error;
	  }
	}
	
	/**
	 * Event listener for HTTP server "listening" event.
	 * 事件绑定函数
	 */
	
	function onListening() {
	  var addr = server.address();
	  var bind = typeof addr === 'string'
	    ? 'pipe ' + addr
	    : 'port ' + addr.port;
	  debug('Listening on ' + bind);
	}
	
	```
 - Bootstrap界面框架

	```html
	<!DOCTYPE html>
	<html>
	
	<head>
	  <title>
	    <%= title %>
	  </title>
	  <!-- 
	      Bootstrap界面框架
	      可以手动下载Bootstrap库放到项目中
	      也可以使用Bootcss社区提供的CDN源加载Bootstrap
	     -->
	  <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.2/css/bootstrap.min.css">
	  <link rel='stylesheet' href='/stylesheets/style.css' />
	</head>
	
	<body>
	  <div class="well jumbotron">
	    <h1>
	      <%= title %>
	    </h1>
	    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or
	      information.</p>
	    <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
	  </div>
	  <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
	  <script src="http://cdn.bootcss.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	</body>
	
	</html>
	```
