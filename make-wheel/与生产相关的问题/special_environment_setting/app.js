var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/node_modules'));

// ——————————————————————————————————————————————————————————
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// 将日志输出到特定的日志
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
// app.use(morgan('default', {stream: accessLogStream}));

// 自定义format
// 输出的结果是 [joke] GET / 304
// morgan.format('joke', '[joke] :method :url :status');
// app.use(morgan('joke'));

// 自定义token
// 在浏览器中访问: http://127.0.0.1:3000?from=app
// [joke] GET /?from=app 200 app
// morgan.token('from', function(req, res){
//   return req.query.from || '-';
// });
// morgan.format('joke', '[joke] :method :url :status :from');
// app.use(morgan('joke'));

// 高级使用
// const FileStreamRotator = require('file-stream-rotator');
// // 储存的目录
// const logDirectory = path.join(__dirname, 'log');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// // 按照日期来存放日志
// const accessLogStream = FileStreamRotator.getStream({
//   date_format: 'YYYYMMDD',
//   filename: path.join(logDirectory, 'access-%DATE%.log'),
//   frequency: 'daily',
//   verbose: false,
// })
// app.use(morgan('combined', {stream: accessLogStream}))

// 日志写入数据库
// const TestLog = require('./advert');
// const dbStream = {
//   write: function(line) {
//     const log = new TestLog({
//       message: line,
//     });
//     log.save((err, result) => {
//       if(err){
//         console.log(err);
//       }
//       console.log('success');
//     })
//   }
// }
// app.use('short', {stream: dbStream});

// 在生产环境中，使用express-logger; 在开发环境中使用Morgan
switch(app.get('env')){
  case 'development':
    app.use(require('morgan')('dev'));
    break;
  case 'production':
    app.use(require('express-logger')({
      path: __dirname + '/log/expressLogger.log'
    }));
    break;
}

app.get('/', function(req, res){
  res.send({ success: true});
});

if(process.env.NODE_ENV === "production") {
  console.log('线上环境');
} else {
  console.log('开发环境');
}

app.listen(app.get('port'), function(){
  console.log( 'Express started in ' + app.get('env') + ' mode on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
