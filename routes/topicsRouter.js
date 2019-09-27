const topicsRouter = require("express").Router();
const express = require("express");
const sendTopics = require("../controllers/topicsController.js");
const { send405Error } = require("../errorHandlers");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(send405Error);

module.exports = topicsRouter;
