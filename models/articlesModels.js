const connection = require("../connections.js");

exports.returnArticles = (req, res, next) => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id: req.article_id });
};

exports.patchArticles = (req, res, next) => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id: req.params.article_id })
    .increment({ votes: req.body.inc_votes })
    .returning("*");
};
