***
## 1.�˽�Node Web����Ľṹ
 - models�������ݿ�ģ��
 - midleware�����м�����
## ѧϰ����С����
1. `process.env.PORT` ����ͨ��������������
	`set port = 3000  `// ����process.env.PORTΪ3000
	`set port = `  // ɾ��port��������
	`const port = process.env.PORT || 3000;` //���port�����������ڣ�������Ϊ������������������ڣ�������Ϊ3000
2. ���������ö˿ں�
	```javascript
	const express = require('express');
	const app = express();
	
	const port = process.env.PORT || 3000;
	
	app.listen(port, () => {
	    console.log("��ʼ��");
	});
	```
 - `PORT=3300 node index.js` �������� `process.env.PORT`Ϊ3300

3. EJSָ��`<%- ����%>` ��`<%= ����%>`������
	```bash
	// ��=�����,�ͻᱻescapgeת����� 
	<%= VARIABLE_NAME %>
	
	// �á�-�����ԭʼ����, ���ᱻescape,
	<%- VARIABLE_NAME %>
	```
4. ɾ��ָ��id��д��
	```javascript
	app.delete('/articles/:id', (req, res, next) => {
	  const id = req.params.id;
	  Article.delete(id, (err) => {
	    if (err) return next(err);
	    res.send({ message: 'Deleted' });
	  });
	});
	```
5. ��������ҳ�������ַ���ʣ�Ҳ����ͨ�������з���
`$ node index.js`
`$ curl http://localhost:3000/articles`
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210204214025859.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
��������ɾ������
`curl -X DELETE http://localhost:3000/articles/0`

6. ����body-parser
	```javascript
	//��֧�ֱ���Ϊ����������Ϣ��
	app.use(bodyParser.urlencoded({ extended: false }));
	//֧�ֱ���ΪJSON��������Ϣ��
	app.use(bodyParser.json());
	```
7. �Ժ󶼰��������������bootstrap
```javascript
app.js�ļ���
app.use(
    '/css/bootstrap.css',
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

//Ӧ��bootstrap
<link rel="stylesheet" href="/css/bootstrap.css"> 
```
8. res.format()���÷�
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
