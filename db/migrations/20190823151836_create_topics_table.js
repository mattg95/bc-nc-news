exports.up = function(knex) {
  console.log("creating topics table");
  return knex.schema.createTAble("topics", topics => {
    topics.string("slug").primary();
    topics.string("description");
  });
};

exports.down = function(knex) {
  console.log("deleting topics...");
  return knex.schema.dropTable("topics");
};
