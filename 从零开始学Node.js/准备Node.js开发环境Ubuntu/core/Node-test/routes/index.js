// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

var express = require('express');
var router = express.Router();
var myUtil = require('./myUtil');
var $ = require('jQuery');

router.get('/', function (req, res) {
  var url = "http://movie.douban.com/subject/11529526";
  console.log(url);
  myUtil.get(url, function (content, status) {
    console.log("status:=" + status);
    res.send(content);
  });
});

module.exports = router;


