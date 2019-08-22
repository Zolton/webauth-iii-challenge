const jwt = require("jsonwebtoken");
const secret = process.env.SECRET

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ Error: "Bad token" });
      } else {
        req.user = { username: decodedToken.usrname };
        next();
      }
    });
  } else {
    res.status(400).json({ Error: "No Token present" });
  }
};
