exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.send400Error = (req, res, next) => {
  res.status(400).send({ msg: "bad request" });
};
