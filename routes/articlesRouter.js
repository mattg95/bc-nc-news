const articlesRouter = require("express").Router();
const express = require("express");
const {
  sendArticles,
  patchArticles,
  postComment,
  getComments,
  getAllArticles
} = require("../controllers/articlesController.js");

articlesRouter.route("/").get(getAllArticles);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getComments);

articlesRouter
  .route("/:article_id")
  .get(sendArticles)
  .patch(patchArticles);

module.exports = articlesRouter;
