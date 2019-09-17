const { returnArticles, patchArticles } = require("../models/articlesModels");

exports.sendArticles = (req, res, next) => {
  console.log("inside sendArticles");
  returnArticles(req.params).then(articleRes => {
    const [article] = articleRes;
    res.status(200).send({ article: article });
  });
};

exports.patchArticles = (req, res, next) => {
  console.log("inside patchArticles");
  patchArticles(req).then(articleRes => {
    const [article] = articleRes;
    res.status(200).send({ article: article });
  });
};
