const userRouter = require("express").Router();
const express = require("express");
const sendUser = require("../controllers/userController");
const { send405Error } = require("../errorHandlers");

userRouter
  .route("/:username")
  .get(sendUser)
  .all(send405Error);

module.exports = userRouter;
