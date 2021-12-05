const jwt = require("jsonwebtoken");
const config = process.env;

const authMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  // check if user is logged in 
  if (!bearerToken) {
    return res.status(401).send('Unauthenticated user');
  }

  jwt.verify(bearerToken.substr(7), process.env.TOKEN_KEY, function(err, decodedToken) {
    if (err) {
      return res.status(401).send('Incorrect user token');
    }
  });

  return next();
};

module.exports = authMiddleware;
