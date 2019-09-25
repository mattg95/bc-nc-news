const connection = require("../connections.js");

exports.getArticles = article_id => {
  return connection("articles")
    .select("articles.*")
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", article_id)
    .returning("*")
    .then(articleRes => {
      const [article] = articleRes;
      if (!article) {
        return Promise.reject({ status: 404, msg: "route not found" });
      } else {
        article.comment_count = +article.comment_count;
        return article;
      }
    });
};

exports.changeArticles = (article_id, inc_votes) => {
  return connection("articles")
    .select("articles.*")
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", article_id)
    .increment({ votes: inc_votes })
    .returning("*")
    .then(articleRes => {
      const [article] = articleRes;
      if (!article) {
        return Promise.reject({ status: 404, msg: "route not found" });
      } else {
        article.comment_count = +article.comment_count;
        return article;
      }
    });
};

exports.fetchAllArticles = (sort_by, order, author, topic) => {
  return connection("articles")
    .select("articles.*")
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .returning("*")
    .then(articles => {
      articles.map(article => {
        article.comment_count = +article.comment_count;
      });
      return articles;
    });
};
