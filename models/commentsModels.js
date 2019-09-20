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
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order_by || "desc");
};
