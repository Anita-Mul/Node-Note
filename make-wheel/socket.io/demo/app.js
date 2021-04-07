var app = require('express')();
var server = require('http').Server(app);
// 注意，io(<端口号>) 将为你创建一个http服务。
var io = require('socket.io')(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  /**
   * socket.on('private message', function (from, msg) {
      console.log('I received a private message by ', from, ' saying ', msg);
     });

     socket.on('disconnect', function () {
        io.emit('user disconnected');
     });
   */
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});