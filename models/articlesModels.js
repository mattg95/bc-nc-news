const connection = require("../connections.js");

exports.returnArticles = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id: article_id });
};

exports.patchArticles = (article_id, inc_votes) => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id: article_id })
    .increment({ votes: inc_votes })
    .returning("*");
};

exports.writeComment = req => {
  return connection("comments")
    .insert({
      author: req.body.username,
      article_id: req.params.article_id,
      body: req.body.body
    })
    .returning("*");
};

exports.fetchComments = (article_id, query) => {
  return connection("comments")
    .select("*")
    .where("article_id", article_id)
    .orderBy(query.sort_by || "created_at", query.order_by || "desc");
};

exports.fetchAllArticles = () => {
  return connection("articles")
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id");
};
