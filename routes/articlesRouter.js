const articlesRouter = require("express").Router();
const express = require("express");
const sendArticles = require("../controllers/articlesController.js");

console.log("inside articlesRouter");

articlesRouter.route("/:article_id").get(sendArticles);

module.exports = articlesRouter;
