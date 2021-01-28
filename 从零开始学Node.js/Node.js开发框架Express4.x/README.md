## ����express��Ŀ
 - ������Ŀ
	`express -e nodejs-demo`
 - ������ĿĿ¼������`package-lock.json`
	`cd nodejs-demo && npm install`
 - ������Ŀ
	`npm start`
***
## Express
![���������ͼƬ����](https://img-blog.csdnimg.cn/2021012822111192.png)
 - bin, ���������Ŀ�Ľű��ļ�
 - node_modules, ������е���Ŀ�����⡣
 - public����̬�ļ�(css,js,img)
 - routes��·���ļ�(MVC�е�C,controller)
 - views��ҳ���ļ�(Ejsģ��)
 - package.json����Ŀ�������ü���������Ϣ
 - app.js��Ӧ�ú��������ļ�
	```javascript
	app.js
	// ����������
	var createError = require('http-errors');
	var express = require('express');
	var path = require('path');
	var cookieParser = require('cookie-parser');
	var logger = require('morgan');
	
	// ����·�ɿ���
	var indexRouter = require('./routes/index');
	var usersRouter = require('./routes/users');
	
	// ������Ŀʵ��
	var app = express();
	
	// ����EJSģ�������ģ���ļ�λ�ã�Ҳ����ʹ��jade������ģ������
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	
	//������־���������
	app.use(logger('dev'));
	//�������ݽ�����
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	//����cookie������
	app.use(cookieParser());
	//���徲̬�ļ�Ŀ¼
	app.use(express.static(path.join(__dirname, 'public')));
	
	//ƥ��·����·��
	app.use('/', indexRouter);
	app.use('/users', usersRouter);
	
	//404������
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	  next(createError(404));
	});
	
	//��������������������500������
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
 - ./bin/www�ļ�
	```javascript
	#!/usr/bin/env node
	//��Ŀ��������
	//www�ļ�Ҳ��node�Ľű������ڷ������ú���������
	
	/**
	 * Module dependencies.
	 * ��������
	 */
	
	var app = require('../app');
	var debug = require('debug')('nodejs-demo:server');
	var http = require('http');
	
	/**
	 * Get port from environment and store in Express.
	 * ���������˿�
	 */
	
	var port = normalizePort(process.env.PORT || '3000');
	app.set('port', port);
	
	/**
	 * Create HTTP server.
	 * ����HTTP����ʵ��
	 */
	
	var server = http.createServer(app);
	
	/**
	 * Listen on provided port, on all network interfaces.
	 * ���������������˿�
	 */
	
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
	
	/**
	 * Normalize a port into a number, string, or false.
	 * �˿ڱ�׼������
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
	 * HTTP�쳣�¼�������
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
	 * �¼��󶨺���
	 */
	
	function onListening() {
	  var addr = server.address();
	  var bind = typeof addr === 'string'
	    ? 'pipe ' + addr
	    : 'port ' + addr.port;
	  debug('Listening on ' + bind);
	}
	
	```
 - Bootstrap������

	```html
	<!DOCTYPE html>
	<html>
	
	<head>
	  <title>
	    <%= title %>
	  </title>
	  <!-- 
	      Bootstrap������
	      �����ֶ�����Bootstrap��ŵ���Ŀ��
	      Ҳ����ʹ��Bootcss�����ṩ��CDNԴ����Bootstrap
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
