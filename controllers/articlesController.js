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
    article.comment_count = +article.comment_count;
    res.status(200).send({ article: article });
  });
};

exports.patchArticles = (req, res, next) => {
  patchArticles(req.params.article_id, req.body.inc_votes).then(articleRes => {
    const [article] = articleRes;
    article.comment_count = +article.comment_count;
    res.status(200).send({ article: article });
  });
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(red.query.sort_by, req.query.order ).then(articles => {
    articles.map(article => {
      article.comment_count = +article.comment_count;
    });
    res.status(200).send({ articles: articles });
  });
};

exports.postComment = (req, res, next) => {
  writeComment(req.body.username, req.params.article_id, req.body.body).then(commentRes => {
    const [comment] = commentRes;
    res.status(201).send({ comment: comment });
  });
};

exports.getComments = (req, res, next) => {
  fetchComments(req.params.article_id, req.query.sort_by, req.query.order_by).then(commentRes => {
    res.status(200).send({ comments: commentRes });
  });
};
