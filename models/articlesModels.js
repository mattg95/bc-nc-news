const connection = require("../connections.js");

const {
  checkTopicExists,
  checkAuthorExists
} = require("./checkThingsExistFuncs");

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

exports.fetchArticlesByQuery = (sort_by, order, author, topic) => {
  return connection("articles")
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes"
    )
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
      if (!articles.length && author) {
        return Promise.all([articles, checkAuthorExists(author)]).then(
          articles => {
            return articles;
          }
        );
      }
      if (!articles.length && topic) {
        return Promise.all([articles, checkTopicExists(topic)]).then(
          articles => {
            return articles;
          }
        );
      } else
        articles.map(article => {
          article.comment_count = +article.comment_count;
          return articles;
        });
      return articles;
    });
};

exports.fetchArticlesById = (sort_by, order, article_id) => {
  return connection("articles")
    .select("articles.*")
    .where("articles.article_id", article_id)
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "comments.article_id", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc")
    .returning("*")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "route not found" });
      }
      article.comment_count = +article.comment_count;
      return article;
    });
};
