const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDate, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsPromise = knex("topics").insert(topicData);
      const userPromise = knex("users").insert(userData);
      return Promise.all([topicsPromise, userPromise]);
    })
    .then(() => {
      const dateFormattedArticles = formatDate(articleData);
      return knex
        .insert(dateFormattedArticles)
        .into("articles")
        .returning("*");
    })
    .then(insertedArticles => {
      const articleRef = makeRefObj(insertedArticles);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
