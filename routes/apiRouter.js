const apiRouter = require("express").Router();

const topicsRouter = require("./topicsRouter.js");
const userRouter = require("./userRouter.js");
const articlesRouter = require("./articlesRouter.js");
const commentRouter = require("./commentsRouter");

const { send405Error } = require("../errorHandlers");

//--------------------

//---

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", userRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentRouter);

apiRouter
  .route("/*")
  .get((req, res, next) => res.status(404).send({ msg: "route not found" }))
  .all(send405Error);

//-----

module.exports = apiRouter;
