const db = require("../data/db-Config");

module.exports = {
  getAll, addNew
};

function getAll() {
  return db("users");
}

function addNew (user) {
    return db("users").insert(user)
}

// function generateToken(user) {
//     const payload = {
//         subject: 
//     }
// }
