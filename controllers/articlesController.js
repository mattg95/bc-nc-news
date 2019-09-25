const {
  getArticles,
  changeArticles,
  fetchAllArticles
} = require("../models/articlesModels");

exports.sendArticles = (req, res, next) => {
  if (!Number.isInteger(+req.params.article_id)) {
    return next({ status: 400, msg: "bad request" });
  } else {
    getArticles(req.params.article_id)
      .then(article => res.status(200).send({ article }))
      .catch(next);
  }
};

exports.patchArticles = (req, res, next) => {
  if (
    !req.body ||
    !req.body.inc_votes ||
    !Number.isInteger(req.body.inc_votes) ||
    !Number.isInteger(+req.params.article_id)
  ) {
    return next({ status: 400, msg: "bad request" });
  } else
    return changeArticles(req.params.article_id, req.body.inc_votes)
      .then(article => res.status(200).send({ article: article }))
      .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(
    req.query.sort_by,
    req.query.order,
    req.query.author,
    req.query.topic
  )
    .then(articles =>
      res.status(200).send({
        articles
      })
    )
    .catch(next);
};
