const commentRouter = require("express").Router();
const express = require("express");
const {
  patchComment,
  deleteComment,
  getComment
} = require("../controllers/commentsController");

const { send405Error } = require("../errorHandlers");

commentRouter
  .route("/:comment_id")
  .get(getComment)
  .patch(patchComment)
  .delete(deleteComment)
  .all(send405Error);

module.exports = commentRouter;
