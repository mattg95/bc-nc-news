const commentRouter = require("express").Router();
const express = require("express");
const {
  patchComment,
  deleteComment,

} = require("../controllers/commentsController");

const { send405Error } = require("../errorHandlers");

commentRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment)
  .all(send405Error);

module.exports = commentRouter;
