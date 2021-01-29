 - supervisor / nodemonÿ���޸Ĵ���󣬶�����д����
		`npm install -- save-dev supervisor`
		`npm install --save-dev nodemon`
***
## Node��Session��ʹ��
 - Ϊʲôʹ��session
	```bash
	 session�����ڷ�������,���ͻ��˵�һ�η��ʷ�����ʱ�����Խ��ͻ��ĵ�½��Ϣ���档
	
	 ���ͻ�������������ʱ�������жϿͻ��ĵ�½״̬,������ʾ��
	
	 ���Ա���һЩ�ͻ��ĳ�����Ϣ�����ͻ����ٴλ�ȡ������Ϣʱ�������ٴ����ݿ��н��в�ѯ��
	
	 session������redis�����ݿ�Ƚ�����־û����������������ҵ�ʱҲ���ᵼ��ĳЩ�ͻ���Ϣ(���ﳵ)��ʧ��
	```
 - session�Ĺ�������

	```bash
	����������ʷ����������͵�һ������ʱ���������˻ᴴ��һ��session��������һ��������key,value�ļ�ֵ�ԣ�
	
	Ȼ��key(cookie)���ص������(�ͻ�)�ˣ�������´��ٷ���ʱ��Я��key(cookie)���ҵ���Ӧ��session(value)��
	
	�ͻ�����Ϣ��������session�С�
	```
 - nodejs�в���express-sessionʹ��session
	`npm install --save express-session`
	

	```javascript
	//app.js����session
	//secret:һ��String���͵��ַ�������Ϊ������������session��ǩ����
	//resave:(�Ƿ�����)���ͻ��˲��з��Ͷ������ʱ������һ����������һ���������ʱ��session�����޸ĸ��ǲ����档Ĭ��Ϊtrue������(�����汾)�п���Ĭ��ʧЧ����������ֶ���ӡ�
	//saveUninitialized:��ʼ��sessionʱ�Ƿ񱣴浽�洢��Ĭ��Ϊtrue�� ����(�����汾)�п���Ĭ��ʧЧ����������ֶ���ӡ�cookie:���÷��ص�ǰ��key�����ԣ�Ĭ��ֵΪ{ path: '/', httpOnly: true, secure: false, maxAge: null }
	
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
	express-session��һЩ������
	Session.destroy():ɾ��session������⵽�ͻ��˹ر�ʱ���á�
	Session.reload():��session���޸�ʱ��ˢ��session��
	Session.regenerate()��������session��ʼ����
	Session.save()������session��
	```
	```javascript
	// ����login·��ʱ��Ҫ����req��session�б����û�����Ϣ
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
	
	// ��¼ʱ��Ҫ�жϸ��û��Ƿ��¼
	router.get('/', function(req, res, next) {
	    if(req.session.user){
	        var user=req.session.user;
	        var name=user.name;
	        res.send('���'+name+'����ӭ��¼��');
	    }else{
	        res.send('�㻹û�е�¼���ȵ�¼�������ԣ�');
	    }
	});
	```
***
## ҳ����ʾ
 - ��user.js����Ӵ�����ʾ
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
	
	  //��Ӵ�����ʾ
	  req.session.error = '�û��������벻��ȷ';
	  res.redirect('/users/login');
	});
	```
- ��app.js�����
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
 - �޸�user.js
	```javascript
	router.get('/login', function (req, res, next) {
	  res.render('login', { title: '�û���¼', message: res.locals.message });
	});
	```
 - �޸�login.ejs
	```html
	<% include header.ejs %>
	    <div class="container-fluid">
	        <form class="form-horizontal" method="post">
	            <fieldset>
	                <legend>�û���½</legend>
	                <!-- �����䣬������<%= message %>Ҫ���Ͱ�html���ֱ������� -->
	                <%- message %>
	                    <div class="control-group">
	                        <label class="control-label" for="username">�û���</label>
	                        <div class="controls">
	                            <input type="text" class="input-xlarge" id="username" name="username">
	                        </div>
	                    </div>
	                    <div class="control-group">
	                        <label class="control-label" for="password">����</label>
	                        <div class="controls">
	                            <input type="password" class="input-xlarge" id="password" name="password">
	                        </div>
	                    </div>
	                    <div class="form-actions">
	                        <button type="submit" class="btn btn-primary">��½</button>
	                    </div>
	            </fieldset>
	        </form>
	    </div>
	    <% include footer.ejs %>
	```
****
## ҳ����ʿ���
 - ҳ����ʿ���
	```javascript
	//ҳ����ʿ���
	
	//�����������û���½ҳ�棬�û���û�е�¼��
	router.get('/login', notAuthentication)
	
	//�����������û��ǳ����ӣ��û��ǵ�¼��ȥ��
	router.get('/logout', authentication)
	
	//�����������û���ҳ���û����Ѿ���¼��
	router.get('/home', authentication)
	
	//����û��Ѿ���¼��������
	function authentication(req, res, next) {
	  if (!req.session.user) {
	    req.session.error = '���ȵ�¼';
	    return res.redirect('/users/login');
	  }
	
	  next();
	}
	
	//����û�û�е�¼��������
	function notAuthentication(req, res, next) {
	  if (req.session.user) {
	    req.session.error = '�ѵ�½';
	    return res.redirect('/users');
	  }
	  next();
	}
	```
