const jwt = require("jsonwebtoken");
const config = process.env;

const authMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  // check if user is logged in 
  if (!bearerToken) {
    return res.status(401).send('ابتدا باید وارد حساب کاربری شوید');
  }

  jwt.verify(bearerToken.substr(7), process.env.TOKEN_KEY, function(err, decodedToken) {
    if (err) {
      return res.status(401).send('توکن موجود نیست');
    }
  });

  return next();
};

module.exports = authMiddleware;
