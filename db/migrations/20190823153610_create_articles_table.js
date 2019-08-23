exports.up = function(knex) {
  console.log("creating articles table...");
  return knex.schema.createTable("articles", articles => {
    articles("articles_id").primary();
    articles.string("title");
  });
};

exports.down = function(knex) {};
