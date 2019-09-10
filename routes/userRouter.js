const userRouter = require("express").Router();
const express = require("express");
const sendUser = require("../controllers/userController");

userRouter.route("/:username").get(sendUser);

module.exports = userRouter;
