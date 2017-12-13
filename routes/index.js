var express = require('express');
var router = express.Router();
var isAuth = require('./isAuthenticated');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/dashboard', isAuth, function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});



module.exports = router;
