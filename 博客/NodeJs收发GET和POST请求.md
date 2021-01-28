#### 接收GET
1. express框架接收：
	```javascript
	const express = require('express');
	app = express();
	
	app.get('/', function (req, res) {
	    var url = req.query.url;
	    var name = req.query.name;
	    console.log(url, name);
	});
	
	app.listen(3000, function () {
	    console.log('app is running at port 3000');
	});
	
	```
2. 接收GET
	```javascript
	var http = require('http');
	var url = require('url');
	var util = require('util');
	
	//req 请求信息   res返回信息
	http.createServer(function (req, res) {
	    res.writeHeader(200, { 'Content-Type': 'text/javascript;charset=UTF-8' });  //状态码+响应头属性
	
	    // 解析 url 参数
	    var params = url.parse(req.url, true).query;  //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
	    res.write("网站名：" + params.name);
	    res.write("\n");
	    res.write("网站 URL：" + params.url);
	    res.end();
	
	}).listen(3000);
	```
3. 发送GET
	```javascript
	var http = require('http');
	
	var qs = require('querystring');
	
	var data = {
	    a: 123,
	    time: new Date().getTime()
	};//这是需要提交的数据 
	
	
	var content = qs.stringify(data);
	
	var options = {
	    hostname: '127.0.0.1',
	    port: 3000,
	    path: '/pay/pay_callback?' + content,
	    method: 'GET'
	};
	
	var req = http.request(options, function (res) {
	    console.log('STATUS: ' + res.statusCode);
	    console.log('HEADERS: ' + JSON.stringify(res.headers));
	    res.setEncoding('utf8');
	    res.on('data', function (chunk) {
	        console.log('BODY: ' + chunk);
	    });
	});
	
	req.on('error', function (e) {
	    console.log('problem with request: ' + e.message);
	});
	
	req.end();
	```
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210128142940320.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
4. 接收POST
	```javascript
	var http = require('http');
	var querystring = require('querystring');
	
	var postHTML =
	    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
	    '<body>' +
	    '<form method="post">' +
	    '网站名： <input name="name"><br>' +
	    '网站 URL： <input name="url"><br>' +
	    '<input type="submit">' +
	    '</form>' +
	    '</body></html>';
	
	http.createServer(function (req, res) {
	    //暂存请求体信息
	    var body = "";
	
	    //请求链接
	    console.log(req.url);
	
	    //每当接收到请求体数据，累加到post中
	    req.on('data', function (chunk) {
	        body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
	        console.log("chunk:", chunk);
	    });
	
	    console.log(body);
	    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
	    req.on('end', function () {
	        // 解析参数
	        body = querystring.parse(body);  //将一个字符串反序列化为一个对象
	        console.log("body:", body);
	        // 设置响应头部信息及编码\<br><br>      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
	        if (body.name && body.url) { // 输出提交的数据
	            res.write("网站名：" + body.name);
	            res.write("<br>");
	            res.write("网站 URL：" + body.url);
	        } else {  // 输出表单
	            res.write(postHTML);
	        }
	        res.end();
	    });
	}).listen(3000);
	```

5. 发送POST

	```javascript
	var http = require('http');
	var querystring = require('querystring');
	
	var contents = querystring.stringify({
	    name: 'byvoid',
	    email: 'byvoid@byvoid.com',
	    address: 'Zijing'
	});
	
	var options = {
	    host: 'www.byvoid.com',
	    path: '/application/node/post.php',
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        'Content-Length': contents.length
	    }
	}
	
	var req = http.request(options, function (res) {
	    res.setEncoding('utf8');
	    res.on('data', function (data) {
	        console.log("data:", data);   //一段html代码
	    });
	});
	
	req.write(contents);
	req.end;
	```
