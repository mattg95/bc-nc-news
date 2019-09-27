const connection = require("../connections.js");

exports.checkArticleExists = article_id => {
  return connection("articles")
    .first("articles.*")
    .where("article_id", article_id)
    .then(article => {
      if (!article)
        return Promise.reject({ status: 404, msg: "route not found" });
    });
};

const checkTopicExists = topic => {
  return connection("topics")
    .first("topics.*")
    .where("topic.slug", topic)
    .then(topic => {
      if (!topic)
        return Promise.reject({ status: 404, msg: "route not found" });
    });
};

const checkAuthorExists = author => {
  return connection("users")
    .first("users.*")
    .where("users.username", author)
    .then(authorRes => {
      if (!authorRes)
        return Promise.reject({ status: 404, msg: "route not found" });
    });
};
