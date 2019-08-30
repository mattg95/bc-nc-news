exports.up = function(knex) {
  console.log("creating topics table...");
  return knex.schema.createTable("topics", topics => {
    topics
      .string("slug")
      .unique()
      .primary()
      .notNullable();
    topics.string("description").notNullable();
  });
};

exports.down = function(knex) {
  console.log("deleting topics table...");
  return knex.schema.dropTable("topics");
};
