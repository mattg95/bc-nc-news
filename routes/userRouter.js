const userRouter = require("express").Router();
const express = require("express");
const sendUsers = require("../controllers/userController");

userRouter.route("/:username").get(sendUsers);

module.exports = userRouter;
