const apiRouter = require("express").Router();

const topicsRouter = require("./topicsRouter.js");
const userRouter = require("./userRouter.js");
const articlesRouter = require("./articlesRouter.js");

//--------------------

//---

apiRouter.get("/", (req, res) => {
  console.log("in API!");
});

//---

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", userRouter);

apiRouter.use("/articles", articlesRouter);

//-----

module.exports = apiRouter;
