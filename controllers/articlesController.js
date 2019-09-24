const {
  returnArticles,
  changeArticles,
  fetchAllArticles
} = require("../models/articlesModels");

exports.sendArticles = (req, res, next) => {
  if (!Number.isInteger(+req.params.article_id)) {
    return next({ status: 400, msg: "bad request" });
  } else {
    returnArticles(req.params.article_id)
      .then(articleRes => {
        const [article] = articleRes;
        if (!article) {
          return next({ status: 404, msg: "route not found" });
        } else {
          article.comment_count = +article.comment_count;
          res.status(200).send({ article: article });
        }
      })
      .catch(next);
  }
};
exports.patchArticles = (req, res, next) => {
  if (!req.body) return next({ status: 400, msg: "bad request" });
  if (!req.body.inc_votes) return next({ status: 400, msg: "bad request" });
  if (!Number.isInteger(req.body.inc_votes))
    return next({ status: 400, msg: "bad request" });
  if (Object.keys(req.body).length != 1)
    return next({
      status: 400,
      msg: "bad request"
    });
  if (!Number.isInteger(+req.params.article_id)) {
    return next({ status: 400, msg: "bad request" });
  } else {
    changeArticles(req.params.article_id, req.body.inc_votes)
      .then(articleRes => {
        const [article] = articleRes;
        if (!article) {
          return next({ status: 404, msg: "route not found" });
        } else {
          article.comment_count = +article.comment_count;
          res.status(200).send({ article: article });
        }
      })
      .catch(next);
  }
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(
    req.query.sort_by,
    req.query.order,
    req.query.author,
    req.query.topic
  )
    .then(articles => {
      articles.map(article => {
        article.comment_count = +article.comment_count;
      });
      res.status(200).send({
        articles: articles
      });
    })
    .catch(next);
};
