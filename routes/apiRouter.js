const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter.js");

console.log('in API!')

apiRouter.use('/', (req, res) => {
  res.status(200).send('welcome to the API');
});
 
apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
