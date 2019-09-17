const returnAllTopics = require("../models/topicsModels");

// Get all topcis
sendTopics = (req, res, next) => {
  returnAllTopics().then(topicRes => {
    res.status(200).send({ topics: topicRes });
  });
  //.catch(console.log);
};

module.exports = sendTopics;
