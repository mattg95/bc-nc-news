const connection = require("../connections.js");

function returnAllTopics() {
  return connection.select("*").from("topics");
}

module.exports = returnAllTopics;
