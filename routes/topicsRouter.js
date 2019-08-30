const topicsRouter = require("express").Router();
const express = require("express");
const sendTopics = require("../controllers/topicsController.js");

topicsRouter.route("/").get(sendTopics);

module.exports = topicsRouter;
