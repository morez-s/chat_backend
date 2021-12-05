var express = require('express');
const elasticClient = require('./../../config/database');
var chatController = express.Router();
var authMiddleware = require('./../middlewares/AuthMiddleware');

const jwt = require('jsonwebtoken');
const JDate = require('jalali-date');

chatController.get('/users', authMiddleware, async (req, res) => {
  try {
    // Get users list
    const usersList = await elasticClient.search({
      index: 'users'
    });
    
    // return users list
    return res.status(200).json(usersList.hits.hits);
  } catch (err) {
    console.log(err);
  }
});

chatController.post('/users/:receiverUserId/messages', authMiddleware, async (req, res) => {
  try {
    // Get user input
    const { text } = req.body.params;

    // Validate user input
    if (!(text)) {
      return res.status(422).send('Message is required');
    }

    // get senderUserId from bearer token sent in request headers
    let senderUserId;
    jwt.verify(req.headers.authorization.substr(7), process.env.TOKEN_KEY, function(err, decodedToken) {
      senderUserId = decodedToken.user_id;
    });

    // get current timestamp
    let date = new JDate;
    date = date.format('YYYY/MM/DD');
    let time = new Date();
    time = 
      (time.getHours() < 10 ? '0' : '') + time.getHours() +
      ":" +
      (time.getMinutes() < 10 ? '0' : '') + time.getMinutes() +
      ":" +
      (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
    const timestamp = date + '-' + time;

    // store message in database
    let message = await elasticClient.index({
      index: 'messages',
      body: {
        sender_user_id: senderUserId,
        receiver_user_id: req.params.receiverUserId,
        text,
        timestamp
      }
    });

    // return new message
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
  }
});

module.exports = chatController;
