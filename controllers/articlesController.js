const returnArticles = require("../models/articlesModels");

sendArticles = (req, res, next) => {
  console.log("inside sendArticles");
  const request = returnArticles(req.params).then(articleRes => {
    res.status(200).send(articleRes);
  });
};

module.exports = sendArticles;
