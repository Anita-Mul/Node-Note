var express = require('express');
var bodyParser = require('body-parser');
var formidable = require('formidable');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));


// 配置模板引擎
app.engine('art', require('express-art-template'));
// ——————————————————————————————————————————————————————

app.get('/contest/vacation-photo', function(req, res){
  var now = new Date();
  res.render('form.art', { year: now.getFullYear(), month: now.getMonth() });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
      if(err) return res.redirect(303, '/error');
      console.log('received fields:');
      console.log(fields);
      console.log('received files:');
      console.log(files);
      res.redirect(303, '/thank-you');
  });
});

app.get('/thank-you', function(req, res){
  res.send({ success: true});
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
