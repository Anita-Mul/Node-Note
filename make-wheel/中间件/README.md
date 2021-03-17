 - 如果你想让某个路由匹配所有路径，只需用/*
 - 回调函数的参数：
    如果有2个或3个参数，头两个参数是请求和响应对象，第三个参数是next函数。如果有4个参数，它就变成了错误处理中间件，第一个参数变成了错误对象，然后依次是请求、响应和next对象。
 - 如果你不调用next()，则应该发送一个响应到客户端（res.send、res.json、res.render等）；如果你不这样做，客户端会被挂起并最终导致超时。
 - 中间件必须是一个函数
```javascript
// lib/tourRequiresWaiver.js
module.exports = function(req, res, next){
	var cart = req .session.cart;
	if(!cart) return next();
	if(cart.some(function(item){ return item.product.requiresWaiver })){
		if( !cart.warnings ) cart.warnings = [];
		cart.warnings.push('One or more of your selected tours' + 'requires a waiver.');
	};
	next();
};
```
 - 这样引入这个中间件
```javascript
app.use(require('./lib/requiresWaiver.js'));
```
 - 更常见的做法是输出一个以中间件为属性的对象
```javascript
module.exports = {
  checkWaivers: function(req, res, next) { next(); },
  checkGuestCounts: function(req, res, next) { next(); }
};
```
 - 然后可以像以下这样连入中间件
```javascript
var cartValidation = require('./lib/cartValidation.js');
app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);
```


