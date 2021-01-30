## 1.����Mongoose
`npm install --save mongoose`
 - ����`models`Ŀ¼
	`mkdir models`
	![���������ͼƬ����](https://img-blog.csdnimg.cn/20210130154147864.png)
 - mongodb.js�ļ�
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
## �޸�HTMLҳ��
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210130172641599.png)

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
                        <button id=" c_save" type="button" class="btn btn-primary">����</button>
                        <div id="#msg"></div>
                    </fieldset>
                    <form>
            </div>
        </div>
    </div>
<% include footer.ejs %>
```

***
## ·�ɲ���
 - ��routes�����·��ģ��
![���������ͼƬ����](https://img-blog.csdnimg.cn/20210130165044109.png)

	```javascript
	var express = require('express');
	var router = express.Router();
	var movieDao = require('../models/Movie');
	
	
	/* GET users listing. */
	//����
	router.get('/add', movieAdd);
	
	//�ύ
	router.post('/add', doMovieAdd);
	
	//�༭��ѯ
	router.get('/:name', movieAdd);
	
	//JSON����
	router.get('/json/:name', function (req, res, next) {
	    movieDao.findByName(req.params.name, function (err, obj) {
	        res.send(obj);
	    })
	});
	
	// ��������������������������������������������������������������������������������������������������������������������
	
	function movieAdd(req, res, next) {
	    if (req.params.name) {//update
	        return res.render('movie', {
	            title: req.params.name + '|��Ӱ|����|moive.me',
	            label: '�༭��Ӱ:' + req.params.name,
	            movie: req.params.name
	        });
	    } else {
	        return res.render('movie', {
	            title: '������|��Ӱ|����|moive.me',
	            label: '�����ӵ�Ӱ',
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
	
	// ��������������������������������������������������������������������������������������������������������������������
	module.exports = router;
	```
 - дmovie.js�ű���movie.json�ļ�
	```json
	//movie.json
	{
	    "name": "δ������",
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
	            "source": "�ſ�",
	            "link": "http://www.youku.com",
	            "swfLink": "http://player.youku.com/player.php/sid/XMTY4NzM5ODc2/v.swf",
	            "quality": "����",
	            "version": "��Ƭ",
	            "lang": "����",
	            "subtitle": "������Ļ"
	        },
	        {
	            "source": "�Ѻ�",
	            "link": "http://tv.sohu.com",
	            "swfLink": "http://share.vrs.sohu.com/75837/v.swf&topBar=1&autoplay=false&plid=3860&pub_catecode=",
	            "quality": "����",
	            "version": "��Ƭ",
	            "lang": "����",
	            "subtitle": "������Ļ"
	        }
	    ]
	}
	```
	

	```javascript
	//movie.js�ļ�
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
	                        $('#msg').html('�ɹ�����!');
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
## �漰����֪ʶ��
##### 1. ·��������
 - �����`app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));`�������õ�·��
	��˼����ҪѰ���ڷ���˵�`node_modules`�ļ�������ݱ���ͨ��`localhost:3000/node_modules/....`
		�������ط����õ�ʱ������������·���ķ���
		1. `/node_modules/....`�����`localhost:3000`
		2. ����һ�ְ������·��`../node_modules`������ڵ�ǰĿ¼
		3. ������ʹ�����·�����п��ܻ�������벻������
 - �����`app.use(express.static(path.join(__dirname, 'node_modules')));`ͬ��
	***
##### 2. JSON������
 - ����������ݿ���ʹ��JSON�ļ������ȵ���'jquery.json-2.4.js'�����
	```html
	<script src="/public/javascripts/jquery-1.9.1.min.js"></script>
	<script src="/public/javascripts/bootstrap.min.js"></script>
	<script src="/public/javascripts/jquery.json-2.4.js"></script>
	<script src="/public/javascripts/movie.js"></script>
	```
 - ǰ��˴���JSON
	json�������ͨ��JavaScript�洢���ԣ�json����װ���ַ�����������ǰ��̨��������
	��Ҫ������̨����Ҫ�Ȱ���װ����JSON�ַ���
	��ajax�ķ����������ģ�һ�����ַ���������Ҫ�����������ܼ򵥣������ȱ��JSON������С�
```javascript
//ʹ��getJSON��ȡ������JSON����
$.getJSON(url, function (data) {
     mdata = data;
     render_editor_form(mdata);
     render_event_form(mdata);
});

var render_event_form = function () {
        $('#c_save').on('click', function (event) {
            
            var data = {};
            //�������˴�����ת�����ַ���
            data.content = JSON.stringify(mdata);
            $.ajax({
                type: "POST",
                url: '/movie/add',
                data: data,
                //�������������ʽ�������ˣ�����������ɹ��Ժ����˷��ص�����
                success: function (data, textStatus) {
                    if (data.success) {
                        $('#msg').html('�ɹ�����!');
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

//��˵Ĵ��룺
function doMovieAdd(req, res, next) {
    var json = req.body.content;
    //���ַ�����ʽ��JSONת���ɶ�����ʽ��JSON����Ϊ�����ݿ���ʱ�������ַ�����ʽ
    json = JSON.parse(json);

    if (json._id) {//update
    } else {//insert
        movieDao.save(json, function (err) {
            if (err) {
                //�������Ķ������ͨ��ajax��success�����е�data��ȡ��
                res.send({ 'success': false, 'err': err });
            } else {
                res.send({ 'success': true });
            }
        });
    }
}
```
