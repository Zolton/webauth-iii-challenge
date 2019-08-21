const db = require("../data/db-Config");

module.exports = {
  getAll
};

function getAll() {
  return db("users");
}
