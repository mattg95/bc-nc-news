const knex = require('../knexfile.js');
//const connection = require('../connections.js')


function returnAllTopics() {
  console.log(connection.select('*').from('films'))
  return knex.query('SELECT * FROM topics;').then(res => res.rows);
}

module.exports = {returnAllTopics}