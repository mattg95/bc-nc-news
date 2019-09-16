const returnArticles = require("../models/articlesModels");

sendArticles = (req, res, next) => {
  console.log("inside sendArticles");
  returnArticles(req.params).then(articleRes => {
    const [article] = articleRes;
    res.status(200).send({ article: article });
  });
};

module.exports = sendArticles;
