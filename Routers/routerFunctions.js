const db = require("../data/db-Config");
const bcrypt = require("bcryptjs")

module.exports = {
  getAll, hashPW, addNew
};

function getAll() {
  return db("users");
}

function hashPW (req, res, next) {
    const user = req.body
    const hash = bcrypt.hashSync(user.password)
    user.password = hash
    next()
}

function addNew (user) {
    return db("users").insert(user)
}

// function generateToken(user) {
//     const payload = {
//         subject: 
//     }
// }
