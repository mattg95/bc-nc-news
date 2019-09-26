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

exports.fetchComments = (article_id, sort_by, order) => {
  return connection("comments")
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .then(comments => {
      if (!comments.length) {
        return Promise.all([comments, checkArticleExists(article_id)]).then(
          ([comments]) => {
            return comments;
          }
        );
      }
      return Promise.reject({ status: 404, msg: "route not found" });
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
    .then(commentRes => {
      const [comment] = commentRes;
      if (!comment) {
        return Promise.reject({ status: 404, msg: "route not found" });
      } else {
        comment.votes = +comment.votes;
        return comment;
      }
    });
};

exports.destroyComment = comment_id => {
  return connection("comments")
    .where("comment_id", comment_id)
    .delete("*")
    .then(commentRes => {
      const [comment] = commentRes;
      if (!comment) {
        return Promise.reject({ status: 404, msg: "route not found" });
      } else return comment;
    });
};
