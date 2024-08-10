var express = require('express');
var router = express.Router();
const userController = require('../controllers/User.js');

/* GET home page. */
router.get('/', function(req, res){
  res.redirect('/log-in');
});

router.get('/log-in', userController.log_in_get);

router.post('/log-in', userController.log_in_post);

router.get('/sign-up', function(req, res) {
  res.render('sign_up',{
    title: 'Sign Up',
  });
});

router.post('/sign-up', userController.sign_up_post);

router.get('/home', function(req, res){
  res.render('home', {
    title: 'home',
  });
});

module.exports = router;
