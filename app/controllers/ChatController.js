var express = require('express');
const elasticClient = require('./../../config/database');
var chatController = express.Router();
var authMiddleware = require('./../middlewares/AuthMiddleware');

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

module.exports = chatController;
