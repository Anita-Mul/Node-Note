var express = require('express');
// 里面填写错误的发送发和密匙
var email = require('./email.js')({
  gmail: {
    user: '2659580957@qq.com',
    password: 'fnseppmezgnvdjai',
  }
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  email.send('anita_sun@126.com, 2659580957@qq.com', 'Hood River tous on sale today', 'hahhaaha');
  res.send({ success: true });
});

app.get('/error', function(req, res){
  email.emailError('error Ben', 'ooo.txt', 'wrong');
});


app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});