const express = require("express");
const cors = require("cors")
const app = express();
const apiRouter = require("./routes/apiRouter");
app.use(express.json());

const { handlePSQLErrors } = require("./errorHandlers");

app.use(cors())

app.use("/api", apiRouter);

const { send404Error } = require("./errorHandlers");

app.route("/*").all(send404Error);

//custom error codes
app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
});

//psql error codes
app.use(handlePSQLErrors);

module.exports = app;
