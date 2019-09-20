const connection = require("../connections.js");

exports.returnArticles = id => {
  return connection("articles")
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.body",
      "articles.created_at",
      "articles.votes"
    )
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", id)
    .returning("*");
};

exports.changeArticles = (id, inc_votes) => {
  return connection("articles")
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.body",
      "articles.created_at",
      "articles.votes"
    )
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", id)
    .increment({ votes: inc_votes })
    .returning("*");
};

exports.fetchAllArticles = (sort_by, order, author, topic) => {
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
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .returning("*");
};
