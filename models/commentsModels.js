const connection = require("../connections.js");

exports.writeComment = (username, article_id, body) => {
  return connection("comments")
    .insert({
      author: username,
      article_id: article_id,
      body: body
    })
    .returning("*");
};

exports.fetchComments = (article_id, sort_by, order_by) => {
  return connection("comments")
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order_by || "desc")
    .then(comments => {
      if (!comments.length)
        return Promise.all([comments, checkArticleExists(article_id)]);
      return [comments];
    });
};

const checkArticleExists = article_id => {
  return connection("articles")
    .first("articles.*")
    .where("article_id", article_id)
    .then(article => {
      if (!article)
        return Promise.reject({ status: 404, msg: "route not found" });
    });
};

exports.changeComment = (comment_id, inc_votes) => {
  return connection("comments")
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment({ votes: inc_votes })
    .returning("*")
    .then(comment => comment[0]);
};

exports.destroyComment = comment_id => {
  return connection("comments")
    .where("comment_id", comment_id)
    .delete("*");
};
