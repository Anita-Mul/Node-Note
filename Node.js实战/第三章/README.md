***
## 1.了解Node Web程序的结构
 - models——数据库模型
 - midleware——中间件组件
## 学习到的小技巧
1. `process.env.PORT` 可以通过命令行来设置
	`set port = 3000  `// 设置process.env.PORT为3000
	`set port = `  // 删除port环境变量
	`const port = process.env.PORT || 3000;` //如果port环境变量存在，就设置为环境变量，如果不存在，就设置为3000
2. 命令行设置端口号
	```javascript
	const express = require('express');
	const app = express();
	
	const port = process.env.PORT || 3000;
	
	app.listen(port, () => {
	    console.log("开始咯");
	});
	```
 - `PORT=3300 node index.js` 就是设置 `process.env.PORT`为3300

3. EJS指令`<%- 变量%>` 与`<%= 变量%>`的区别
	```bash
	// 用=号输出,就会被escapge转义编码 
	<%= VARIABLE_NAME %>
	
	// 用“-”输出原始内容, 不会被escape,
	<%- VARIABLE_NAME %>
	```
4. 删除指定id的写法
	```javascript
	app.delete('/articles/:id', (req, res, next) => {
	  const id = req.params.id;
	  Article.delete(id, (err) => {
	    if (err) return next(err);
	    res.send({ message: 'Deleted' });
	  });
	});
	```
5. 除了在网页中输入地址访问，也可以通过命令行访问
`$ node index.js`
`$ curl http://localhost:3000/articles`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210204214025859.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
可以用来删除文章
`curl -X DELETE http://localhost:3000/articles/0`

6. 配置body-parser
	```javascript
	//不支持编码为表单的请求消息体
	app.use(bodyParser.urlencoded({ extended: false }));
	//支持编码为JSON的请求消息体
	app.use(bodyParser.json());
	```
7. 以后都按照这个规则配置bootstrap
```javascript
app.js文件中
app.use(
    '/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

//应用bootstrap
<link rel="stylesheet" href="/css/bootstrap.css"> 
```
8. res.format()的用法
[res.format()](https://blog.csdn.net/sunq1982/article/details/77774424)
9. node-readability
	```javascript
	var read = require('node-readability');
	 
	read('http://howtonode.org/really-simple-file-uploads', function(err, article, meta) {
	  // Main Article
	  console.log(article.content);
	  // Title
	  console.log(article.title);
	 
	  // HTML Source Code
	  console.log(article.html);
	  // DOM
	  console.log(article.document);
	 
	  // Response Object from Request Lib
	  console.log(meta);
	 
	  // Close article to clean up jsdom and prevent leaks
	  article.close();
	});
	```
