 ## Properties
```javascript
//�������г�������֧��HTTP����
http.METHODS

//�������г�������HTTP״̬���뼰������
http.STATUS_CODES
```
## ����
**http.createServer()**
 - ����http.Server�������ʵ����
	```javascript
	const server = http.createServer((req, res) => {
	  //handle every single request with this callback
	})
	```

**http.request()**
 - �����������HTTP���󣬴���http.ClientRequest�����ʵ����

**http.get()**
 - ������http.request()�������Զ���HTTP��������ΪGET����req.end()�Զ����á�

[http-module](https://nodejs.dev/learn/the-nodejs-http-module)