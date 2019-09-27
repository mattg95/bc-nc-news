const {
  writeComment,
  fetchComments,
  changeComment,
  destroyComment
} = require("../models/commentsModels");

exports.postComment = (req, res, next) => {
  if (
    !req.body.hasOwnProperty("username") ||
    !req.body.hasOwnProperty("body") ||
    Object.keys(req.body).length !== 2 ||
    !Number.isInteger(+req.params.article_id)
  ) {
    return next({
      status: 400,
      msg: "bad request"
    });
  } else {
    writeComment(req.body.username, req.params.article_id, req.body.body)
      .then(commentRes => {
        const [comment] = commentRes;
        res.status(201).send({ comment });
      })
      .catch(next);
  }
};

exports.getComment = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  if (!Number.isInteger(+req.params.article_id)) {
    return next({
      status: 400,
      msg: "bad request"
    });
  } else
    fetchComments(article_id, sort_by, order)
      .then(comments => {
        res.status(200).send({ comments });
      })
      .catch(next);
};

exports.patchComment = (req, res, next) => {
  if (
    !req.body ||
    !req.body.inc_votes ||
    Object.keys(req.body).length !== 1 ||
    !Number.isInteger(req.body.inc_votes) ||
    !Number.isInteger(+req.params.comment_id)
  ) {
    return next({ status: 400, msg: "bad request" });
  } else {
    changeComment(req.params.comment_id, req.body.inc_votes)
      .then(comment => res.status(200).send({ comment }))
      .catch(next);
  }
};

exports.deleteComment = (req, res, next) => {
  if (!Number.isInteger(+req.params.comment_id)) {
    return next({ status: 400, msg: "bad request" });
  }
  return destroyComment(req.params.comment_id)
    .then(comment => {
      res.status(204).send({ comment });
    })
    .catch(next);
};
