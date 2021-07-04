const returnUser = require("../models/userModels");

sendUser = (req, res, next) => {
  returnUser(req.params)
    .then((userRes) => {
      const [user] = userRes;
      res.status(200).send({ user });
    })
    .catch(next);
};
module.exports = sendUser;
