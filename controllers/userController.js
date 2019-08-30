const returnUser = require("../models/userModels");

sendUser = (req, res, next) => {
  console.log("inside sendUser");
  returnUser(req.params).then(userRes => {
    res.status(200).send(userRes);
  });
};
module.exports = sendUser;
