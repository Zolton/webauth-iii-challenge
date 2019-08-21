const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("./routerFunctions");
const jwt = require("jsonwebtoken");
const restricted = require("./authMiddlware")

// Base URL - /api/restricted

// router.get("/", (req, res)=>{
//     res.status(200).json({Hello: "from authRouter"})
// })

router.get("/", restricted, (req, res) => {
  User.getAll()
    .then(post => {
      res.status(200).json({Hello: "Welcome back", Username: req.user, post});
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

router.post("/register", User.hashPW, (req, res) => {
  const user = req.body;
  User.addNew(user)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

router.post("/login", (req, res) => {
 // let {username, password} = req.body
 let username = req.body.username
 let password = req.body.password
  User.findUser(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
       const token = User.generateToken(user);
        res.status(200).json({ Welcome: "heres your token", token });
      } else {
        res.status(401).json({ Error: "Invalid Credentials"});
      }
    })
    .catch(error => {
      res.status(500).json({ Error: "Please send credentials"});
    });
});

router.post("/find", (req, res) => {
  User.findUser(username)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

module.exports = router;
