const { writeComment, fetchComments } = require("../models/commentsModels");

exports.postComment = (req, res, next) => {
  console.log(req.body);
  if (!req.body.hasOwnProperty("username")) {
    return next({
      status: 400,
      msg: "bad request"
    });
  }
  if (Object.keys(req.body).length != 2)
    return next({
      status: 400,
      msg: "bad request"
    });
  if (!Number.isInteger(+req.params.article_id)) {
    return next({ status: 400, msg: "bad request" });
  } else {
    writeComment(req.body.username, req.params.article_id, req.body.body)
      .then(commentRes => {
        const [comment] = commentRes;
        res.status(201).send({ comment: comment });
      })
      .catch(next);
  }
};

exports.getComments = (req, res, next) => {
  fetchComments(req.params.article_id, req.query.sort_by, req.query.order_by)
    .then(commentRes => {
      res.status(200).send({ comments: commentRes });
    })
    .catch(next);
};
