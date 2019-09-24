const returnUser = require("../models/userModels");

sendUser = (req, res, next) => {
  returnUser(req.params)
    .then(userRes => {
      res.status(200).send({ user: userRes });
    })
    .catch(next);
};
module.exports = sendUser;
