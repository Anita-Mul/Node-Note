var express = require('express');
const app = require('../app');
var router = express.Router();



// ————————————————————————————————————————————————————————————

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


// ————————————————————————————————————————————————————————————

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: '用户登录', message: res.locals.message });
});

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

router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

router.get('/home', function (req, res, next) {
  // var user = {
  //   username: 'admin',
  //   password: 'admin'
  // };

  // res.render('home', { title: 'Home', user: user });
  res.render('home', { title: 'Home', user: req.session.user });
});


module.exports = router;

