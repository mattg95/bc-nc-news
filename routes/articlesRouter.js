const articlesRouter = require("express").Router();
const express = require("express");
const {
  sendArticles,
  patchArticles,
  postComment
} = require("../controllers/articlesController.js");

console.log("inside articlesRouter");

articlesRouter.route("/:article_id/comments").post(postComment);

articlesRouter
  .route("/:article_id")
  .get(sendArticles)
  .patch(patchArticles);

module.exports = articlesRouter;
