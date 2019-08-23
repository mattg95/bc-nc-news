exports.up = function(knex) {
  console.log("creating articles table");
  return knex.schema.createTable("articles", articles => {
    articles.string("username").primary; //how to use .unique()?
    articles.string("avatar_url");
    articles.string("name");
  });
};

exports.down = function(knex) {
  console.log("deleting articles table");
  return knex.schema.dropTable("articles");
};
