const connection = require("../connections.js");

function returnUser(req) {
  return connection
    .select("*")
    .from("users")
    .where({ username: req.username })
    .then(users => {
      if (!users.length) {
        return Promise.reject({ status: 404, msg: "route not found" });
      }
    });
}
module.exports = returnUser;
