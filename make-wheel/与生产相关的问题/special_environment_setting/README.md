## 将日志打印到本地文件
```javascript
// 将日志输出到特定的日志
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('default', {stream: accessLogStream}));
```
## 核心API
`morgan(format, options)`
 - format: 可选（定义了几种日志格式，每种格式都有对应的名称）
   > combined: ::1 - - [23/Mar/2021:00:38:54 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"

   > short: ::1 - GET / HTTP/1.1 304 - - 5.164 ms

   > default:（默认）::1 - - [Tue, 23 Mar 2021 00:39:42 GMT] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
 - option: 可选，配置项
   > stream: 日志的输出流配置，默认是process.stdout

   > skip: 是否跳过日志记录:
   ```javascript
   // 默认是false
   // EXAMPLE: only log error responses
   morgan('combined', {
     skip: function (req, res) { return res.statusCode < 400 }
   })
   ```
   > immediate: 布尔值，默认是false。当为true时，一收到请求，就记录日志；如果为false，则在请求返回后，再记录日志。

***

## 自定义日志格式
 - format: 日志格式，本质是代表日志格式的字符串
 - token: format的组成部分，比如上面的`:method`、`:url`即使所谓的token。
 - `morgan.format(name, format);  // 自定义日志格式`
 - `morgan.token(name, fn);  // 自定义token`

## 自定义format
```javascript
// 自定义format
// 输出的结果是 [joke] GET / 304
morgan.format('joke', '[joke] :method :url :status');
app.use(morgan('joke'));
```

## 自定义token
```javascript
// 自定义token
// 在浏览器中访问: http://127.0.0.1:3000?from=app
// [joke] GET /?from=app 200 app
morgan.token('from', function(req, res){
  return req.query.from || '-';
});
morgan.format('joke', '[joke] :method :url :status :from');
app.use(morgan('joke'));

app.get('/', function(req, res){
  res.send({ success: true});
});
```
***
## 高级使用
###### 日志切割
> 如果一个线上应用，所有的日志都放到一个本地文件中，文件会变的非常大，影响性能，不便于查看。这时候，就需要日志分割了
```javascript
// 高级使用
const FileStreamRotator = require('file-stream-rotator');
// 储存的目录
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// 按照日期来存放日志
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false,
})
app.use(morgan('combined', {stream: accessLogStream}))
```
## 日志写入数据库
> 在文档上，并没有找到合适的扩展接口
日志写入本地文件，最关键的两行代码如下
```javascript
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('short', {stream: accessLogStream}));
```
在`morgan`内部的实现如下：
```javascript
// 如果自己提供了输出流，就用自己的，如果没有提供，就默认是process.stdio
var stream = opts.stream || process.stdout;
// 伪代码，根据format、token的定义，生成日志
var logString = createLogString(); 
// 这里就可以看出如果体积提供了一个具有write函数的对象，那么就可以将logString保存进去
stream.write(logString);
```
```javascript
// 日志写入数据库
const TestLog = require('./advert');
const dbStream = {
  write: function(line) {
    const log = new TestLog({
      message: line,
    });
    log.save((err, result) => {
      if(err){
        console.log(err);
      }
      console.log('success');
    })
  }
}
app.use('short', {stream: dbStream});
```

## 在生产环境和开发环境分别使用不同的API
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "pro": "set NODE_ENV=production&& node app.js",
  "dev": "set NODE_ENV=development&& node app.js"
},
```
```javascript
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
```