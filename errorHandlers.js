exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.send400Error = (req, res, next) => {
  res.status(400).send({ msg: "bad request" });
};

exports.send404Error = (req, res, next) => {
  res.status(404).send({ msg: "route not found" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "route not found" });
  }
  if (err.code === "23502" || err.code === "42703" || err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  }
  res.status(500).send({ msg: "Internal Server Error" });
};
