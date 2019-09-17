exports.up = function(knex) {
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
  return knex.schema.dropTable("users");
};
