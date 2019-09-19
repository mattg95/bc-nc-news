const apiRouter = require("express").Router();

const topicsRouter = require("./topicsRouter.js");
const userRouter = require("./userRouter.js");
const articlesRouter = require("./articlesRouter.js");

//--------------------

//---

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", userRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter
  .route("/*")
  .get((req, res, next) => res.status(404).send({ msg: "route not found" }));

//-----

module.exports = apiRouter;
