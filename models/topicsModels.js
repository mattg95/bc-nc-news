const connection = require("../connections.js");

function returnAllTopics() {
  return connection.select("*").from("topics");
  // .then(topics => {
  //   if (!topics) return next({ status: 404, msg: "route not found" });
  // });
}

module.exports = returnAllTopics;
