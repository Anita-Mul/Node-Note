## 1.配置Mongoose
`npm install --save mongoose`
 - 增加`models`目录
	`mkdir models`
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130154147864.png)
 - mongodb.js文件
	```javascript
	const mongoose = require('mongoose');
	mongoose.connect('mongdb://localhost/nodejs', { useNewUrlParser: true, useUnifiedTopology: true });
	exports.mongoose = mongoose;
	```
 - Movie.js
	```javascript
	const mongodb = require('./mongodb');
	const Schema = mongodb.mongoose.Schema;
	
	const MovieSchema = new Schema({
	    name: String,
	    alias: [String],
	    publish: Date,
	    create_date: { type: Date, default: Date.now },
	    images: {
	        coverSmall: String,
	        coverBig: String,
	    },
	    source: [{
	        source: String,
	        link: String,
	        swfLink: String,
	        quality: String,
	        version: String,
	        lang: String,
	        subtitle: String,
	        create_date: { type: Date, default: Date.now }
	    }]
	});
	const Movie = mongodb.mongoose.model('Movie', MovieSchema);
	
	
	const MovieDAO = function () { };
	MovieDAO.prototype.save = function (obj, callback) {
	    var instance = new Movie(obj);
	    instance.save(function (err) {
	        callback(err);
	    });
	};
	
	
	MovieDAO.prototype.findByName = function (name, callback) {
	    Movie.findOne({ name: name }, function (err, obj) {
	        callback(err, obj);
	    });
	}
	module.exports = new MovieDAO();
	```
****
## 修改HTML页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130172641599.png)

```html
<% include header.ejs %>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span8">
                <form>
                    <fieldset>
                        <legend>
                            <%=label%>
                        </legend>
                        <textarea id="c_editor" name="c_editor" rows="10" <%=(movie?'"movie='+movie+'"':'') %>></textarea>
                        <button id=" c_save" type="button" class="btn btn-primary">保存</button>
                        <div id="#msg"></div>
                    </fieldset>
                    <form>
            </div>
        </div>
    </div>
<% include footer.ejs %>
```

***
## 路由部分
 - 在routes中添加路由模块
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130165044109.png)

	```javascript
	var express = require('express');
	var router = express.Router();
	var movieDao = require('../models/Movie');
	
	
	/* GET users listing. */
	//增加
	router.get('/add', movieAdd);
	
	//提交
	router.post('/add', doMovieAdd);
	
	//编辑查询
	router.get('/:name', movieAdd);
	
	//JSON数据
	router.get('/json/:name', function (req, res, next) {
	    movieDao.findByName(req.params.name, function (err, obj) {
	        res.send(obj);
	    })
	});
	
	// ——————————————————————————————————————————————————————————
	
	function movieAdd(req, res, next) {
	    if (req.params.name) {//update
	        return res.render('movie', {
	            title: req.params.name + '|电影|管理|moive.me',
	            label: '编辑电影:' + req.params.name,
	            movie: req.params.name
	        });
	    } else {
	        return res.render('movie', {
	            title: '新增加|电影|管理|moive.me',
	            label: '新增加电影',
	            movie: false
	        });
	    }
	}
	
	function doMovieAdd(req, res, next) {
	    var json = req.body.content;
	    json = JSON.parse(json);
	
	    if (json._id) {//update
	    } else {//insert
	        movieDao.save(json, function (err) {
	            if (err) {
	                res.send({ 'success': false, 'err': err });
	            } else {
	                res.send({ 'success': true });
	            }
	        });
	    }
	}
	
	// ——————————————————————————————————————————————————————————
	module.exports = router;
	```
 - 写movie.js脚本和movie.json文件
	```json
	//movie.json
	{
	    "name": "未来警察",
	    "alias": [
	        "Future X-Cops ",
	        "Mei loi ging chaat"
	    ],
	    "publish": "2010-04-29",
	    "images": {
	        "coverBig": "/img/movie/1_big.jpg",
	        "coverSmall": "/img/movie/1_small.jpg"
	    },
	    "source": [
	        {
	            "source": "优酷",
	            "link": "http://www.youku.com",
	            "swfLink": "http://player.youku.com/player.php/sid/XMTY4NzM5ODc2/v.swf",
	            "quality": "高清",
	            "version": "正片",
	            "lang": "汉语",
	            "subtitle": "中文字幕"
	        },
	        {
	            "source": "搜狐",
	            "link": "http://tv.sohu.com",
	            "swfLink": "http://share.vrs.sohu.com/75837/v.swf&topBar=1&autoplay=false&plid=3860&pub_catecode=",
	            "quality": "高清",
	            "version": "正片",
	            "lang": "汉语",
	            "subtitle": "中文字幕"
	        }
	    ]
	}
	```
	

	```javascript
	//movie.js文件
	$(function () {
	    var mdata = {};
	    var url = '/public/javascripts/movie.json';
	
	    var movie = $('#c_editor').attr('movie')
	    if (movie) {
	        url = '/movie/json/' + movie;
	    }
	
	    $.getJSON(url, function (data) {
	        mdata = data;
	        render_editor_form(mdata);
	        render_event_form(mdata);
	    });
	
	    var render_editor_form = function (data) {
	        $('#c_editor').val($.toJSON(data));
	    };
	
	    var render_event_form = function () {
	        $('#c_save').on('click', function (event) {
	          
	            var data = {};
	            data.content = JSON.stringify(mdata);
	            $.ajax({
	                type: "POST",
	                url: '/movie/add',
	                data: data,
	                success: function (data, textStatus) {
	                    if (data.success) {
	                        $('#msg').html('成功保存!');
	                        $('#msg').addClass('alert alert-success');
	                        $(location).attr('href', '/movie/' + mdata.name);
	                    } else {
	                        $('#msg').html(data.err);
	                        $('#msg').addClass('alert alert-error');
	                    }
	                }
	            });
	        });
	    };
	});
	```
***
## 涉及到的知识点
##### 1. 路径的问题
 - 如果是`app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));`这样设置的路径
	意思就是要寻找在服务端的`node_modules`文件里的内容必须通过`localhost:3000/node_modules/....`
		在其他地方设置的时候有两种设置路径的方法
		1. `/node_modules/....`相对于`localhost:3000`
		2. 还有一种按照相对路径`../node_modules`，相对于当前目录
		3. 尽量少使用相对路径，有可能会出现意想不到错误
 - 如果是`app.use(express.static(path.join(__dirname, 'node_modules')));`同上
	***
##### 2. JSON的问题
 - 如果想在数据库中使用JSON文件，首先导入'jquery.json-2.4.js'这个包
	```html
	<script src="/public/javascripts/jquery-1.9.1.min.js"></script>
	<script src="/public/javascripts/bootstrap.min.js"></script>
	<script src="/public/javascripts/jquery.json-2.4.js"></script>
	<script src="/public/javascripts/movie.js"></script>
	```
 - 前后端传输JSON
	json对象可以通过JavaScript存储属性，json对象装成字符串经常用于前后台传输数据
	你要是往后台发，要先把它装换成JSON字符。
	从ajax的服务器发过的，一定是字符串，你想要把它解析，很简单，把它先变成JSON对象才行。
```javascript
//使用getJSON获取到的是JSON对象
$.getJSON(url, function (data) {
     mdata = data;
     render_editor_form(mdata);
     render_event_form(mdata);
});

var render_event_form = function () {
        $('#c_save').on('click', function (event) {
            
            var data = {};
            //如果往后端传，先转化成字符串
            data.content = JSON.stringify(mdata);
            $.ajax({
                type: "POST",
                url: '/movie/add',
                data: data,
                //按照上面的请求方式请求服务端，下面是请求成功以后服务端返回的数据
                success: function (data, textStatus) {
                    if (data.success) {
                        $('#msg').html('成功保存!');
                        $('#msg').addClass('alert alert-success');
                        $(location).attr('href', '/movie/' + mdata.name);
                    } else {
                        $('#msg').html(data.err);
                        $('#msg').addClass('alert alert-error');
                    }
                }
            });
        });
    };

//后端的代码：
function doMovieAdd(req, res, next) {
    var json = req.body.content;
    //将字符串形式的JSON转化成对象形式的JSON，因为往数据库存的时候是以字符串形式
    json = JSON.parse(json);

    if (json._id) {//update
    } else {//insert
        movieDao.save(json, function (err) {
            if (err) {
                //这个里面的对象可以通过ajax中success属性中的data获取到
                res.send({ 'success': false, 'err': err });
            } else {
                res.send({ 'success': true });
            }
        });
    }
}
```
