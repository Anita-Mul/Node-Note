var express = require('express');
var bodyParser = require('body-parser');
const credentials = require('./credentials');
var cookieParser = require('cookie-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));
app.engine('art', require('express-art-template'));

// ————————————————————————————————————————————————————————
// npm install --save cookie parser
// 完成这个配置之后
// 你就可以在任何能访问到响应对象的地方设置cookie或签名cookie：
app.use(require('cookie-parser')(credentials.cookieSecret));

// 设置cookie
/**
 * 1. 前两个参数为cookie的键值，第三个参数为一个对象，可以设置cookie的各种属性
 *    res.cookie("name","zlfan",{maxAge: 1000*60*60})
 * 
 * 2. 第三个参数:
 *    res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true })
 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
 * 
 * 3. 第三个参数的相关属性
 *    domain：作用：多个域名共享cookie，如设置domin为.zlfan.com，则 aaa.zlfan.com 和 bbb.zlfan.com 这两个域名均可以访问cookie
 *    Expires：过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday,09-Nov-99 23:12:40 GMT
 *    maxAge：最大失效时间（毫秒），设置在多少时间后失效
 *    secure：当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
 *    Path：表示 cookie 影响到的路径，如 path=/temp，只有这个路径能访问到cookie
 *    httpOnly：默认是false，当为true时，只能服务器端进行获取，JS等前端语言无法获取cookie
 *              禁止js获取到cookie，从而保证了安全性
 *    singed：表示是否签名加密 cookie, 设为 true 会对这个 cookie 签名，在使用中间件时传入加密参数app.use(cookParser('zlfan'))，这样就需要用res.signedCookies 而不是 res.cookies 访问它。被篡改的签名 cookie 会被服务器拒绝，并且 cookie值会重置为它的原始值。
 * 
 * 4. 可以设置多重的cookie
 *    res
 *    .status(201)
 *    .cookie('access_token', 'Bearer ' + token, {
 *      expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
 *    })
 *    .cookie('test', 'test')
 *    .redirect(301, '/admin')
 * 
 * 5. domain
 *    可以设置encode：
 *      默认的encoding（默认以十六进制）
 *      res.cookie('some_cross_domain_cookie', 'http://mysubdomain.example.com', { domain: 'example.com' })
 *      Result: 'some_cross_domain_cookie=http%3A%2F%2Fmysubdomain.example.com; Domain=example.com; Path=/'
 *      
 *      res.cookie('some_cross_domain_cookie', 'http://mysubdomain.example.com', { domain: 'example.com', encode: String })
 *      Result: 'some_cross_domain_cookie=http://mysubdomain.example.com; Domain=example.com; Path=/;'
 * 
 * 6. maxAge 和 httpOnly
 *      res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
 * 
 * 7. 您可以传递一个对象作为value参数，然后将其序列化为JSON并由bodyParser() 中间件解析
 *    res.cookie('cart', { items: [1, 2, 3] })
 *    res.cookie('cart', { items: [1, 2, 3] }, { maxAge: 900000 })
 * 
 * 8. 签名cookie
 *    签名cookie更适合做敏感数据，因为用它可以验证cookie数据的完整性，有助于放置中间人攻击
 *    有效的签名放在req.signedCookies对象中
 */

// 获取cookie
/**
 * 1. 获取cookie
 *    req.cookies.name
 */

// 删除Cookie
/**
 * res.clearCookie('name')
 */

// 签名cookie
// 设置密钥，用来对cookie签名和解析, Express可以由此确定cookie的内容是否被篡改过
// 这个网站可以生成随机的密匙
// https://preshing.com/20110811/xkcd-password-generator/
app.use(cookieParser('a cool secret'));

// ————————————————————————————————————————————————————————
app.get('/setCookie', function(req, res){
  res.cookie("name","zlfan",{maxAge: 1000*60*60})
  res.send("设置cookie");
});

app.get('/getCookie', function(req, res){
  const name = req.cookies.name;
  res.send("获取到cookie："+name);
  console.log(name);
});

app.get('/clearCookie', function(req, res){
  res.clearCookie('name');
  res.redirect('/getCookie');
});

// 打开控制台，在application中的cookie可以找到
// s%3Aefg.7FJDuO2E9LMyby6%2Bo1fGQ3wkIHGB9v1CDVWod8NQVAo
// .号左边是cookie的值，右边是服务器上用SHA-1 HMAC生成的加密哈希值。
// 如果这个签名cookie的值被篡改，那么服务器上对cookie的解签会失败，在node中输出的req.signedCookies将为false。
// 如果cookie完好无损地传上来，那么将会被正确解析：
app.get('/signedCookie', function(req, res){
  res.cookie('anita', 'efg', {signed: true, maxAge: 60 * 1000, httpOnly: true});
  console.log(req.cookies, req.url, req.signedCookies);
  res.end('signed cookie');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});