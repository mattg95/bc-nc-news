exports.up = function(knex) {
  return knex.schema.createTable("articles", articles => {
    articles.increments("article_id").primary();
    articles.string("title").notNullable();
    articles.text("body").notNullable();
    articles.integer("votes").defaultTo(0);
    articles.string("topic").references("topics.slug");
    articles.string("author").references("users.username");
    articles.timestamp("created_at"); //.defaultTo(Date.now());

    //created at references the current timestamp
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
