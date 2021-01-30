var express = require('express');
var router = express.Router();
var movieDao = require('./Movie');


//模糊查询
router.get('/add', function (req, res, next) {
    var query = {};
    if (req.query.m2) {
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
