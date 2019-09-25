const commentRouter = require("express").Router();
const express = require("express");
const {
  patchComment,
  deleteComment
} = require("../controllers/commentsController");

commentRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment);

module.exports = commentRouter;
