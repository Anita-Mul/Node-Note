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
