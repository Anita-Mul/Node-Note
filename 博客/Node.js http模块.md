 ## Properties
```javascript
//该属性列出了所有支持HTTP方法
http.METHODS

//此属性列出了所有HTTP状态代码及其描述
http.STATUS_CODES
```
## 方法
**http.createServer()**
 - 返回http.Server该类的新实例。
	```javascript
	const server = http.createServer((req, res) => {
	  //handle every single request with this callback
	})
	```

**http.request()**
 - 向服务器发出HTTP请求，创建http.ClientRequest该类的实例。

**http.get()**
 - 与相似http.request()，但会自动将HTTP方法设置为GET，并req.end()自动调用。

[http-module](https://nodejs.dev/learn/the-nodejs-http-module)