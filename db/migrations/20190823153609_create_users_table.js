exports.up = function(knex) {
  console.log("creating articles table...");
  return knex.schema.createTable("users", users => {
    users
      .string("username", 50)
      .unique()
      .primary();
    users.string("avatar_url").notNullable();
    users.string("name").notNullable();
  });
};

exports.down = function(knex) {
  console.log("deleting articles table...");
  return knex.schema.dropTable("users");
};
