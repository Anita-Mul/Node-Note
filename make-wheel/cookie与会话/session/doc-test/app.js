var express = require('express');
var bodyParser = require('body-parser');
// 引入express-session
var session = require('express-session');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));
app.engine('art', require('express-art-template'));

app.get('', function(req, res){

});

app.post('', function(req, res){

});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});