var express = require('express');
const elasticClient = require('./../../config/database');
var authController = express.Router();
var authMiddleware = require('./../middlewares/AuthMiddleware');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

authController.post('/registration', async (req, res) => {
  try {
    // Get user input
    const { username, password, password_confirmation } = req.body.params;

    // Validate user input
    if (!(username && password && password_confirmation)) {
      return res.status(422).send('وارد کردن تمام فیلدها الزامی است');
    }

    // validate password and password confirmation
    if (password != password_confirmation) {
      return res.status(422).send('تکرار رمز عبور اشتباه وارد شده است')
    }

    // check if user already exist
    const existingUser = await elasticClient.search({
      index: 'users',
      body: {
        query: {
          match: {
            username
          }
        }
      }
    });
    if (existingUser.hits.hits.length) {
      return res.status(409).send('نام کاربری قبلا انتخاب شده است');
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    let user = await elasticClient.index({
      index: 'users',
      body: {
        username,
        password: encryptedPassword,
        online_status: 'online'
      }
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      }
    );

    // save user token
    user.token = token;

    // return new user
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

authController.post('/login', async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body.params;

    // Validate user input
    if (!(username && password)) {
      return res.status(422).send('وارد کردن نام کاربری و کلمه عبور الزامی است');
    }
    
    // check if user exist in our database
    let user = await elasticClient.search({
      index: 'users',
      body: {
        query: {
          match: {
            username
          }
        }
      }
    });
    const userId = user.hits.hits[0]._id;
    user = user.hits.hits[0]._source;

    // check password
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (user && passwordCheck) {
      // Create token
      const token = jwt.sign(
        { user_id: userId, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        }
      );

      // save user token
      user.token = token;

      // update user online status
      elasticClient.update({
        index: 'users',
        id: userId,
        body: {
          doc: {
            online_status: 'online'
          }
        }
      });

      // save user online status
      user.online_status = 'online';

      // return user information
      return res.status(200).json(user);
    }

    return res.status(401).send('نام کاربری یا کلمه عبور اشتباه است');
  } catch (err) {
    console.log(err);
  }
});

authController.delete('/logout', authMiddleware, async (req, res) => {
  try {
    // get userId from bearer token sent in request headers
    let userId;
    jwt.verify(req.headers.authorization.substr(7), process.env.TOKEN_KEY, function(err, decodedToken) {
      // get userId
      userId = decodedToken.user_id;

      // destroy user token
    });

    // update user online status
    elasticClient.update({
      index: 'users',
      id: userId,
      body: {
        doc: {
          online_status: 'offline'
        }
      }
    });

    // return response
    return res.status(200).send('کاربر با موفقیت از حساب کاربری خود خارج شد');
  } catch (err) {
    console.log(err);
  }
});

module.exports = authController;
