var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));
app.engine('art', require('express-art-template'));

// ————————————————————————————————————————————————————
// 从广义上来说，有两种实现会话的方式
//    把所有的东西都存到cookie里
//    只在cookie里存一个唯一标识，其它东西都存在服务器上（推荐）
// 
// 内存会话的缺陷：
// 重启服务器后会话信息就消失了。更糟的是，如果你扩展了多台服务器，那么每次请求可能是由不同的服务器处理的，所以会话数据有时在那里，有时不在。

// 安装和配置
app.use(require('express-session')({
  // 一个 String 类型的字符串，作为服务器端生成 session 的签名。
  secret: 'keyboard cat',
  // 强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。 don't save session if unmodified
　// resave: true,
  // 强制将未初始化的 session 存储。当新建了一个 session 且未设定属性或值时，它就处于
  // 未初始化状态。在设定一个 cookie 前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默
  // 认：true）。建议手动添加。
  saveUninitialized: true,
  // 返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置。
  name: 'name',
　cookie: {maxAge: 60000},
}));

// 设置session
// req.session.userName = 'Anita';
// 对于会话而言：不是用请求对象获取值，用响应对象设置值，它全都是在请求对象上操作的。
app.get('/setSession', function(req, res){
  req.session.userName = 'Anita';
  var colorScheme = req.session.colorScheme || 'dark';
});

// 删除session
// req.session.userName = null;  // 这样是不起作用的
// delete req.session.colorSchema; // 这样会移除'colorSchema'

// —————————————————————————————————————————————————————

// 用会话实现即显消息
// flash message middleware
app.use(function(req, res, next){
	// 如果会话中有flash对象，将它添加到上下文中，然后清除它
	// 这个太强了
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});


app.get('/newsletter', function(req, res){
	res.render('newsletter.art');
});

// 如何使用即显消息
function NewsletterSignup(){
};

NewsletterSignup.prototype.save = function(cb){
	cb();
};

// 邮箱的正则
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

app.post('/newsletter', function(req, res){
	var name = req.body.name || '', email = req.body.email || '';
	// 如果输入的邮箱不合法
	if(!email.match(VALID_EMAIL_REGEX)) {
    // req.xhr一个简便属性，如果请求由Ajax发起将会返回true。
		if(req.xhr) return res.json({ error: 'Invalid name email address.' });
		req.session.flash = {
			type: 'danger',
			intro: 'Validation error!',
			message: 'The email address you entered was  not valid.',
		};
		return res.redirect(303, '/newsletter');
	}

	new NewsletterSignup({ name: name, email: email }).save(function(err){
		if(err) {
			if(req.xhr) return res.json({ error: 'Database error.' });
			req.session.flash = {
				type: 'danger',
				intro: 'Database error!',
				message: 'There was a database error; please try again later.',
			};
			return res.redirect(303, '/newsletter');
		}
		if(req.xhr) return res.json({ success: true });
		req.session.flash = {
			type: 'success',
			intro: 'Thank you!',
			message: 'You have now been signed up for the newsletter.',
		};
		return res.redirect(303, '/newsletter');
	});
});


app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});