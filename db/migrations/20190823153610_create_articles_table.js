exports.up = function(knex) {
  console.log("creating articles table...");
  return knex.schema.createTable("articles", articles => {
    articles
      .increments("article_id")
      .primary()
      .notNullable();
    articles.string("title").notNullable();
    articles.string("body").notNullable();
    articles.integer("votes").defaultsTo(0);
    articles.string("topic").references("topics.slug");
    articles.string("author").references("users.username");
    articles.timestamps("created_at");

    //created at references the current timestamp
  });
};

exports.down = function(knex) {
  console.log("deleting articles table...");
  return knex.schema.dropTable("articles");
};
