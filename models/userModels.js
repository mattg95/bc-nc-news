const connection = require("../connections.js");

function returnUser(params) {
  return connection
    .select("*")
    .from("users")
    .where({ username: params.username })
    .then(users => {
      if (!users.length) {
        return Promise.reject({ status: 404, msg: "route not found" });
      }
      return users;
    });
}
module.exports = returnUser;
