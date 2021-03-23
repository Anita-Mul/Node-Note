var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/node_modules'));
app.engine('art', require('express-art-template'));

/**
 * 在 script 里配一下
 * "test": "echo \"Error: no test specified\" && exit 1",
 * "pro": "set NODE_ENV=production&& node app.js",
 */

if(process.env.NODE_ENV === "production") {
  console.log('线上环境');
} else {
  console.log('开发环境');
}

app.listen(app.get('port'), function(){
  console.log( 'Express started in ' + app.get('env') + 'mode on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
