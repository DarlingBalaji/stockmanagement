var express = require('express');
var router = express.Router();

const { signup, login } = require('../controllers/auth');

// ROUTES
router.post('/auth/signup', signup); // SIGNUP ROUTE
router.post('/auth/login', login); // SIGNIN ROUTE

module.exports = router;