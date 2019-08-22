const db = require("../data/db-Config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll,
  findLog,
  findUser,
  hashPW,
  addNew,
  generateToken,
  hashSeed
};

function getAll() {
  return db("users");
}

function findUser(user) {
  return db("users").where({ username: user });
}

function findLog(user) {
  return db("users").where({ username: user });
}

function hashSeed(password) {
  const hash = bcrypt.hashSync(password);
  const password = hash;
  return password;
}

function hashPW(req, res, next) {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash;
  next();
}

function addNew(user) {
  return db("users").insert(user);
}

function generateToken(user) {
  //let user = req.body
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = process.env.SECRET;
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secret, options);
}

// problem is .then is an async promise - doesn't run with the
function loginCheck(req, res, next) {
  let user = req.body;
  console.log(user);
  let username = req.body.username;
  let password = req.body.password;
  findUser({ username })
    //.first()
    .then(user => {
      // user is undefined, or an empty array without first()
      // async problems, most likely
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ Welcome: "heres your token", token });
      } else {
        res.status(401).json({ Error: "Invalid Credentials", user });
      }
    })
    .catch(error => {
      res.status(500).json({ Error: "500 server error", password });
    })
}

