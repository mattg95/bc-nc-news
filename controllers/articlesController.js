const {
  returnArticles,
  patchArticles,
  writeComment,
  fetchComments
} = require("../models/articlesModels");

exports.sendArticles = (req, res, next) => {
  returnArticles(req.params).then(articleRes => {
    const [article] = articleRes;
    res.status(200).send({ article: article });
  });
};

exports.patchArticles = (req, res, next) => {
  patchArticles(req).then(articleRes => {
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
  fetchComments(req.params.article_id).then(commentRes => {
    res.status(200).send({ comments: commentRes });
  });
};
