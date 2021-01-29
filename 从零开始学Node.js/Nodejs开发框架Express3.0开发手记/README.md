 - supervisor / nodemon每次修改代码后，都会重写启动
		`npm install -- save-dev supervisor`
		`npm install --save-dev nodemon`
***
## Node中Session的使用
 - 为什么使用session
	```bash
	 session运行在服务器端,当客户端第一次访问服务器时，可以将客户的登陆信息保存。
	
	 当客户访问其他界面时，可以判断客户的登陆状态,做出提示。
	
	 可以保存一些客户的常用信息，当客户端再次获取常用信息时，不必再从数据库中进行查询。
	
	 session可以与redis或数据库等结合做持久化操作，当服务器挂掉时也不会导致某些客户信息(购物车)消失。
	```
 - session的工作流程

	```bash
	当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生成一个类似于key,value的键值对，
	
	然后将key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带key(cookie)，找到对应的session(value)。
	
	客户的信息都保存在session中。
	```
 - nodejs中采用express-session使用session
	`npm install --save express-session`
	

	```javascript
	//app.js配置session
	//secret:一个String类型的字符串，作为服务器端生成session的签名。
	//resave:(是否允许)当客户端并行发送多个请求时，其中一个请求在另一个请求结束时对session进行修改覆盖并保存。默认为true。但是(后续版本)有可能默认失效，所以最好手动添加。
	//saveUninitialized:初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。cookie:设置返回到前端key的属性，默认值为{ path: '/', httpOnly: true, secure: false, maxAge: null }
	
	app = express();
	var session = require('express-session');
	app.use(session({
	    secret: 'keyboard cat',
	    resave: false,
	    saveUninitialized: true,
	    cookie: { secure: false }
	}));
	```
	```javascript
	express-session的一些方法：
	Session.destroy():删除session，当检测到客户端关闭时调用。
	Session.reload():当session有修改时，刷新session。
	Session.regenerate()：将已有session初始化。
	Session.save()：保存session。
	```
	```javascript
	// 访问login路由时需要先在req的session中保持用户的信息
	router.get('/login', function(req, res, next) {
	    var user={
	          name:"david",
	          age:"22"
	    }
	    req.session.user=user;
	    res.render('index', {
	          title: 'the test for nodejs session' ,
	    });
	});
	
	// 登录时需要判断改用户是否登录
	router.get('/', function(req, res, next) {
	    if(req.session.user){
	        var user=req.session.user;
	        var name=user.name;
	        res.send('你好'+name+'，欢迎登录。');
	    }else{
	        res.send('你还没有登录，先登录下再试试！');
	    }
	});
	```
***
## 页面提示
 - 在user.js中添加错误提示
	```javascript
	router.post('/login', function (req, res, next) {
	  const user = {
	    username: 'admin',
	    password: 'admin'
	  };
	
	  if (req.body.username === user.username &&
	    req.body.password === user.password) {
	    req.session.user = user;
	    res.redirect('/users/home');
	  }
	
	  //添加错误提示
	  req.session.error = '用户名或密码不正确';
	  res.redirect('/users/login');
	});
	```
- 在app.js中添加
	```javascript
	app.use(function (req, res, next) {
	  res.locals.user = req.session.user;
	  const err = req.session.error;
	  req.session.error = null;
	  res.locals.message = '';
	  if (err) res.locals.message = '<div class = "alert alert-error">' + err + '</div>';
	  next();
	});
	```
 - 修改user.js
	```javascript
	router.get('/login', function (req, res, next) {
	  res.render('login', { title: '用户登录', message: res.locals.message });
	});
	```
 - 修改login.ejs
	```html
	<% include header.ejs %>
	    <div class="container-fluid">
	        <form class="form-horizontal" method="post">
	            <fieldset>
	                <legend>用户登陆</legend>
	                <!-- 添加这句，不能是<%= message %>要不就把html语句直接输出了 -->
	                <%- message %>
	                    <div class="control-group">
	                        <label class="control-label" for="username">用户名</label>
	                        <div class="controls">
	                            <input type="text" class="input-xlarge" id="username" name="username">
	                        </div>
	                    </div>
	                    <div class="control-group">
	                        <label class="control-label" for="password">密码</label>
	                        <div class="controls">
	                            <input type="password" class="input-xlarge" id="password" name="password">
	                        </div>
	                    </div>
	                    <div class="form-actions">
	                        <button type="submit" class="btn btn-primary">登陆</button>
	                    </div>
	            </fieldset>
	        </form>
	    </div>
	    <% include footer.ejs %>
	```
****
## 页面访问控制
 - 页面访问控制
	```javascript
	//页面访问控制
	
	//如果允许访问用户登陆页面，用户是没有登录的
	router.get('/login', notAuthentication)
	
	//如果允许访问用户登出链接，用户是登录上去的
	router.get('/logout', authentication)
	
	//如果允许访问用户主页，用户是已经登录的
	router.get('/home', authentication)
	
	//如果用户已经登录，返回真
	function authentication(req, res, next) {
	  if (!req.session.user) {
	    req.session.error = '请先登录';
	    return res.redirect('/users/login');
	  }
	
	  next();
	}
	
	//如果用户没有登录，返回真
	function notAuthentication(req, res, next) {
	  if (req.session.user) {
	    req.session.error = '已登陆';
	    return res.redirect('/users');
	  }
	  next();
	}
	```
