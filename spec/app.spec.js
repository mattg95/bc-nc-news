process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app.js");
const connection = require("../connections.js");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("GET api", () => {
    it("STATUS:200 responds with the API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(res => {
          expect(res.body).to.deep.equal({ message: "welcome to the API" });
        });
    });
    describe("GET api/topics", () => {
      it("STATUS:200 responds with an object containing an array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.equal({
              topics: [
                {
                  description: "The man, the Mitch, the legend",
                  slug: "mitch"
                },
                {
                  description: "Not dogs",
                  slug: "cats"
                },
                {
                  description: "what books are made of",
                  slug: "paper"
                }
              ]
            });
          });
      });
    });
    describe("GET api/users/:username", () => {
      it("STATUS: 200 responds with a specified username object", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.equal({
              user: {
                username: "butter_bridge",
                name: "jonny",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
              }
            });
          });
      });
    });
    describe("GET api/articles/:article_id", () => {
      it("STATUS: 200 responds with a specified article object", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body.article).to.contain.keys(
              "article_id",
              "author",
              "title",
              "body",
              "created_at",
              "votes",
              "topic"
            );
            expect(res.body.article).to.include({
              title: "Living in the shadow of a great man",
              author: "butter_bridge"
            });
          });
      });
      describe("PATCH api/articles/:article_id", () => {
        it("STATUS: 200 responds with an article with vote count increased", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 3 })
            .expect(200)
            .then(res => {
              expect(res.body.article.votes).to.equal(103);
            });
        });
        it("STATUS: 200 responds with an article with vote count decreased", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: -10 })
            .expect(200)
            .then(res => {
              expect(res.body.article.votes).to.equal(90);
            });
        });
      });
    });
  });
  describe("POST api/articles/:articleId/comments", () => {
    it("STATUS: 201 responds with a newly posted comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "I strongly object to this" })
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.include({
            article_id: 1,
            body: "I strongly object to this"
          });
        });
    });
  });
});
