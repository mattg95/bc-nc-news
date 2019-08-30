const returnAllTopics = require("../models/topicsModels");

// Get all topcis
sendTopics = (req, res, next) => {
  console.log("inside sendTopics");
  returnAllTopics().then(topicRes => {
    res.status(200).send(topicRes);
  });
  //.catch(console.log);
};

module.exports = sendTopics;
