## 使用Node.js获取HTTP请求正文数据
1. 获取get请求数据
	```javascript
	//Express内置了一个API，可以直接通过req.query来获取数据
	var comment = req.query;
	```
2. 获取POST请求的数据
	```javascript
	// 使用第三方包：body-parse
	var express = require('express');
	var bodyParse = require('body-parse');
	
	var app = express();
	
	//只要加入这个配置，则在req请求对象上会多出来一个属性：body
	app.use(bodyParse.urlencoded({extended:false}));
	app.use(bodyParse.json());
	```
3. 如果不使用express想在Node.js中使用express
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
