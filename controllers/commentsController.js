const { writeComment, fetchComments } = require("../models/commentsModels");

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

exports.getComments = (req, res, next) => {
  if (!Number.isInteger(+req.params.article_id)) {
    return next({
      status: 400,
      msg: "bad request"
    });
  } else
    fetchComments(req.params.article_id, req.query.sort_by, req.query.order_by)
      .then(commentRes => {
        const [comments] = commentRes;
        res.status(200).send({ comments });
      })
      .catch(next);
};
