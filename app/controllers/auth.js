var express = require('express');
const elasticClient = require('./../../config/database');
var authRouter = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

authRouter.post("/registration", async (req, res) => {
  try {
    // Get user input
    const { username, password } = req.body.params;

    // Validate user input
    if (!(username && password)) {
      res.status(422).send("Username and password is required");
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
      return res.status(409).send("User already exists");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    let user = await elasticClient.index({
      index: 'users',
      body: {
        username,
        password: encryptedPassword,
        onlineStatus: 'online'
      }
    });

    // create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // return new user
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = authRouter;
