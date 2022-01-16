var express = require('express');
var router = express.Router();

const { userProfile } = require('../controllers/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/user/profile', userProfile);

module.exports = router;
