var express = require('express');
var router = express.Router();

// require controllers functions
const authController = require('./../app/controllers/AuthController');

router.use('/', authController);

module.exports = router;
