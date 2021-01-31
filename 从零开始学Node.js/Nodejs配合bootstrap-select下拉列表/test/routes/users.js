var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin/movie', {
    search: { type: '科幻' }
  });
  //res.render('admin/movie');
});

module.exports = router;
