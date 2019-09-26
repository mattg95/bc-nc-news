const {
  changeArticles,
  fetchArticlesById,
  fetchArticlesByQuery
} = require("../models/articlesModels");

exports.patchArticle = (req, res, next) => {
  if (
    !req.body ||
    !req.body.inc_votes ||
    Object.keys(req.body).length !== 1 ||
    !Number.isInteger(req.body.inc_votes) ||
    !Number.isInteger(+req.params.article_id)
  ) {
    return next({ status: 400, msg: "bad request" });
  } else
    return changeArticles(req.params.article_id, req.body.inc_votes)
      .then(article => res.status(200).send({ article: article }))
      .catch(next);
};

exports.sendArticles = (req, res, next) => {
  const { sort_by, order, topic, author } = req.query;
  if (order) {
    if (order !== "asc" && order !== "desc") {
      return next({ status: 400, msg: "bad request" });
    }
  }
  fetchArticlesByQuery(sort_by, order, author, topic)
    .then(articles => {
      res.status(200).send({
        articles
      });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  fetchArticlesById(sort_by, order, article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
