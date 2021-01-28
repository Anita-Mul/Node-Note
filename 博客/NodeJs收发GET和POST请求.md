#### ����GET
1. express��ܽ��գ�
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
2. ����GET
	```javascript
	var http = require('http');
	var url = require('url');
	var util = require('util');
	
	//req ������Ϣ   res������Ϣ
	http.createServer(function (req, res) {
	    res.writeHeader(200, { 'Content-Type': 'text/javascript;charset=UTF-8' });  //״̬��+��Ӧͷ����
	
	    // ���� url ����
	    var params = url.parse(req.url, true).query;  //parse���ַ���ת�ɶ���,req.url="/?url=123&name=321"��true��ʾparams��{url:"123",name:"321"}��false��ʾparams��url=123&name=321
	    res.write("��վ����" + params.name);
	    res.write("\n");
	    res.write("��վ URL��" + params.url);
	    res.end();
	
	}).listen(3000);
	```
3. ����GET
	```javascript
	var http = require('http');
	
	var qs = require('querystring');
	
	var data = {
	    a: 123,
	    time: new Date().getTime()
	};//������Ҫ�ύ������ 
	
	
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
	![���������ͼƬ����](https://img-blog.csdnimg.cn/20210128142940320.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
4. ����POST
	```javascript
	var http = require('http');
	var querystring = require('querystring');
	
	var postHTML =
	    '<html><head><meta charset="utf-8"><title>����̳� Node.js ʵ��</title></head>' +
	    '<body>' +
	    '<form method="post">' +
	    '��վ���� <input name="name"><br>' +
	    '��վ URL�� <input name="url"><br>' +
	    '<input type="submit">' +
	    '</form>' +
	    '</body></html>';
	
	http.createServer(function (req, res) {
	    //�ݴ���������Ϣ
	    var body = "";
	
	    //��������
	    console.log(req.url);
	
	    //ÿ�����յ����������ݣ��ۼӵ�post��
	    req.on('data', function (chunk) {
	        body += chunk;  //һ��Ҫʹ��+=�����body=chunk����Ϊ����favicon.ico��body�����{}
	        console.log("chunk:", chunk);
	    });
	
	    console.log(body);
	    //��end�¼�������ͨ��querystring.parse��post����Ϊ������POST�����ʽ��Ȼ����ͻ��˷��ء�
	    req.on('end', function () {
	        // ��������
	        body = querystring.parse(body);  //��һ���ַ��������л�Ϊһ������
	        console.log("body:", body);
	        // ������Ӧͷ����Ϣ������\<br><br>      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
	        if (body.name && body.url) { // ����ύ������
	            res.write("��վ����" + body.name);
	            res.write("<br>");
	            res.write("��վ URL��" + body.url);
	        } else {  // �����
	            res.write(postHTML);
	        }
	        res.end();
	    });
	}).listen(3000);
	```

5. ����POST

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
	        console.log("data:", data);   //һ��html����
	    });
	});
	
	req.write(contents);
	req.end;
	```
