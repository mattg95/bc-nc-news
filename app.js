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

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
