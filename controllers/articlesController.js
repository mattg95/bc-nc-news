const {
  returnArticles,
  patchArticles,
  writeComment,
  fetchComments,
  fetchAllArticles
} = require("../models/articlesModels");

exports.sendArticles = (req, res, next) => {
  returnArticles(req.params.article_id).then(articleRes => {
    const [article] = articleRes;
    res.status(200).send({ article: article });
  });
};

exports.patchArticles = (req, res, next) => {
  patchArticles(req.params.article_id, req.body.inc_votes).then(articleRes => {
    const [article] = articleRes;
    res.status(200).send({ article: article });
  });
};

exports.postComment = (req, res, next) => {
  writeComment(req).then(commentRes => {
    const [comment] = commentRes;
    res.status(201).send({ comment: comment });
  });
};

exports.getComments = (req, res, next) => {
  fetchComments(req.params.article_id, req.query).then(commentRes => {
    res.status(200).send({ comments: commentRes });
  });
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles().then(articles => {
    res.status(200).send({ articles: articles });
  });
};
