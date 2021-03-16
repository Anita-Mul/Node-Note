var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));

// req.xhr一个简便属性，如果请求由Ajax发起将会返回true
// req.accepts([types])一个简便的方法，用来确定客户端是否接受一个或一组指定的类型（可选类型可以是单个的MIME类型，如application/json、一个逗号分隔集合或是一个数组）。写公共API的人对该方法很感兴趣。假定浏览器默认始终接受HTML。
// req.accepts(['json', 'html'] 这个方法会返回这两个其中之一json/html
app.post('/process', function(req, res){
    if(req.xhr || req.accepts(['json', 'html']) === 'json'){
        // 下面这三句话用来解决跨域问题
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Header", "*");
        res.setHeader("Access-Control-Allow-Method", "*");
        res.send({ success: true });  // 屏幕上会输出 {"success":true}
    } else {
        res.redirect(303, '/thank-you');
    }
});

app.get('/', function(req, res){
    res.redirect(303, '/thank-you');
});

app.get('/thank-you', function(req, res){
    res.send({ success: true});
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
