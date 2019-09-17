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

exports.writeComment = (req, res, next) => {
  return connection("comments")
    .insert({
      author: req.body.username,
      article_id: req.params.article_id,
      body: req.body.body
    })
    .returning("*");
};

exports.fetchComments = article_id => {
  return connection("comments")
    .select("*")
    .where("article_id", article_id);
};
