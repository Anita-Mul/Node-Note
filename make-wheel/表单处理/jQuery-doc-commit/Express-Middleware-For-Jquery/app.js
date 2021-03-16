/**
 * this is a part this i can't slove anymore, but wait a few times later, i will try it again.
 * 这个地址里存的就是原生的下载文件的包
 * https://github.com/blueimp/jQuery-File-Upload
 * 
 * 这个是适应nodejs环境的
 * https://github.com/aguidrevitch/jquery-file-upload-middleware
 * 我目前理解的意思就是examples是人家写好的，封装起来的，你只要使用require(‘jquery-file-upload-middleware’)
 * 就可以啦
 */
var express = require("express"),
    upload = require('jquery-file-upload-middleware');
    bodyParser = require('body-parser');
    path = require('path');
  
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join((__dirname + '/node_modules'))));
app.engine('art', require('express-art-template'));


// ————————————————————————————————————————————
// 配置上传中间件
// 动态上传目录和地址，隔离用户文件
upload.configure({
    uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads',
    imageVersions: {
        // 缩略图的宽度和高度
        thumbnail: {
            width: 80,
            height: 80
        }
    }
});

app.use('/upload', function(req, res, next){
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/uploads/'
        },
        uploadUrl: function () {
            return '/uploads'
        }
    })(req, res, next);
});

// app.use('/upload', function (req, res, next) {
//     // imageVersions are taken from upload.configure()
//     upload.fileHandler({
//         uploadDir: function () {
//             return __dirname + '/public/uploads/' + req.sessionID
//         },
//         uploadUrl: function () {
//             return '/uploads/' + req.sessionID
//         }
//     })(req, res, next);
// });

// —————————————————————————————————————————————

app.use('/upload', upload.fileHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// —————————————————————————————————————————————

app.get('/', function( req, res ){
    res.render('index.art');
});

// ———————— 放置访问、上传，处于安全性考虑————————
app.get('/upload', function( req, res ){
	res.redirect('/');
});

app.put('/upload', function( req, res ){
	res.redirect('/');
});

app.delete('/upload', function( req, res ){
	res.redirect('/');
});

// ——————————————————————————————————————————————————

// 覆盖全局配置
app.use('/upload2', upload.fileHandler({
    uploadDir: __dirname + '/public/uploads2',
    uploadUrl: '/uploads2',
    imageVersions: {
        thumbnail: {
            width: 100,
            height: 100
        }
    }
}));
// ——————————————————————————————————————————————————

// 更复杂的实例-案件
// 下载开始
upload.on('begin', function (fileInfo, req, res) { 
    // fileInfo structure is the same as returned to browser
    // { 
    //     name: '3 (3).jpg',
    //     originalName: '3.jpg',
    //     size: 79262,
    //     type: 'image/jpeg',
    //     delete_type: 'DELETE',
    //     delete_url: 'http://yourhost/upload/3%20(3).jpg',
    //     url: 'http://yourhost/uploads/3%20(3).jpg',
    //     thumbnail_url: 'http://youhost/uploads/thumbnail/3%20(3).jpg' 
    // }
});

// 下载中止
upload.on('abort', function (fileInfo, req, res) {

});

// 下载结束
upload.on('end', function (fileInfo, req, res) {

});

// 删除
upload.on('delete', function (fileInfo, req, res) {

});

// 错误
upload.on('error', function (e, req, res) {
    console.log(e.message);
});

// ——————————————————————————————————————————————————————————

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});


