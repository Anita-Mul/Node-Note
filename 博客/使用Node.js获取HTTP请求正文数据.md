## ʹ��Node.js��ȡHTTP������������
1. ��ȡget��������
	```javascript
	//Express������һ��API������ֱ��ͨ��req.query����ȡ����
	var comment = req.query;
	```
2. ��ȡPOST���������
	```javascript
	// ʹ�õ���������body-parse
	var express = require('express');
	var bodyParse = require('body-parse');
	
	var app = express();
	
	//ֻҪ����������ã�����req��������ϻ�����һ�����ԣ�body
	app.use(bodyParse.urlencoded({extended:false}));
	app.use(bodyParse.json());
	```
3. �����ʹ��express����Node.js��ʹ��express
	```javascript
	const server = http.createServer((req, res) => {
	  let data = '';
	  req.on('data', chunk => {
	    data += chunk;
	  })
	  req.on('end', () => {
	    JSON.parse(data).todo // 'Buy the milk'
	  })
	})
	```
