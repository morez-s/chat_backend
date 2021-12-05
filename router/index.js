var express = require('express');
var router = express.Router();

// controllers
const authController = require('./../app/controllers/AuthController');
const chatController = require('./../app/controllers/ChatController');

router.use('/auth', authController);
router.use('/chat', chatController);

module.exports = router;
