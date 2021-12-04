var express = require('express');
var router = express.Router();

// require controllers functions
const authRouter = require('./../app/controllers/auth');

router.use('/', authRouter);

module.exports = router;
