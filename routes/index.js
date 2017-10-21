var express = require('express');
var router = express.Router();
var nconf = require('../libs/common/nconf');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'viashots production' });
});

module.exports = router;
