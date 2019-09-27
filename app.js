const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
app.use(express.json());

app.use("/api", apiRouter);

app
  .route("/*")
  .all((req, res, next) => res.status(404).send({ msg: "route not found" }));

//custom error codes
app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
});

//psql error codes
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "route not found" });
  }
  if (err.code === "23502" || err.code === "42703" || err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  }
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
