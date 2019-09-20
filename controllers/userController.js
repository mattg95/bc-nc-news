const returnUser = require("../models/userModels");

sendUser = (req, res, next) => {
  returnUser(req.params)
    .then(userRes => {
      const [user] = userRes;
      if (!user) {
        return next({ status: 404, msg: "route not found" });
      } else res.status(200).send({ user: user });
    })
    .catch(next);
};
module.exports = sendUser;
