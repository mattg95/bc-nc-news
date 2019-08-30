const connection = require("../connections.js");

function returnArticles(req) {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id: req.article_id });
}
module.exports = returnArticles;
