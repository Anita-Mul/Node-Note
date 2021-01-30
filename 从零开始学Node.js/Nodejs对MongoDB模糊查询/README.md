 - 精确查询
当`{‘name’:’未来警察’}`时，精确匹配到一条记录。
 - 模糊查询
	`{‘name’:/未来/}`，匹配到了多条记录。

***
## 代码：
 - movieRouter.js
	```javascript
	var express = require('express');
	var router = express.Router();
	var movieDao = require('./Movie');
	
	
	//模糊查询
	router.get('/add', function (req, res, next) {
	    var query = {};
	    if (req.query.m2) {
	        //可以把m2字符串变成正则表达式
	        //如果m2是'未'
	        //new之后变成了/未/
	        query.name = new RegExp(req.query.m2);
	        console.log(query.name);
	    }
	    movieDao.findByName(query.name, function (err, list) {
	        if (err) {
	            console.log(err);
	            return;
	        }
	        console.log(list);
	    })
	});
	
	
	module.exports = router;
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
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021013020534093.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
