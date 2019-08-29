const {returnAllTopics} = require('../models/topicsModels')


// Get all topcis
sendTopics = (req, res, next) => {
  console.log('inside sendTopics');
  returnAllTopics()
  .then(topics => res.status(200).send({topics}))
  .catch(next)
}

module.exports = {sendTopics}