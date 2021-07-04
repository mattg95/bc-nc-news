const connection = require("../knex.js");

function returnAllTopics() {
  return connection.select("*").from("topics");
}

module.exports = returnAllTopics;
