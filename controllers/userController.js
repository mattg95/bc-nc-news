const returnUser = require("../models/userModels");

sendUser = (req, res, next) => {
  console.log("inside sendUser");
  returnUser(req.params).then(userRes => {
    const [user] = userRes;
    res.status(200).send({ user: user });
  });
};
module.exports = sendUser;
