const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("./routerFunctions");

// Base URL - /api/restricted

// router.get("/", (req, res)=>{
//     res.status(200).json({Hello: "from authRouter"})
// })

router.get("/", (req, res) => {
  User.getAll()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

router.post("/register",  User.hashPW, (req, res) => {
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
  User.loginUser()
    .then(loggedIn => {
      res.status(200).json(loggedIn);
    })
    .catch(error => {
      res.status(500).json({ Error: "Server status: 500" });
    });
});

module.exports = router;
