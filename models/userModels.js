const connection = require("../connections.js");

function returnUser(req) {
  return connection
    .select("*")
    .from("users")
    .where({ username: req.username });
}
module.exports = returnUser;
