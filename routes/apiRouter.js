const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter.js");
const userRouter = require("./userRouter.js");

console.log("in API!");

apiRouter.get("/", (req, res) => {
  res.status(200).send("welcome to the API");
});

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
