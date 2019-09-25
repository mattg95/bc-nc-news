process.env.NODE_ENV = "test";

const app = require("../app.js");
const connection = require("../connections.js");

const chai = require("chai");
const { expect } = chai;

const request = require("supertest");

const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("GET api/topics", () => {
    it("STATUS:200 responds with an object containing an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics[0]).contain.keys("description", "slug");
        });
    });
  });
  describe("GET api/users:username", () => {
    it("STATUS: 200 responds with a specified username object", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.user).to.contain.keys(
            "username",
            "name",
            "avatar_url"
          );
          expect(res.body.user.username).to.equal("butter_bridge");
        });
    });
  });
  describe("GET api/articles:article_id", () => {
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
            "topic",
            "comment_count"
          );
          expect(res.body.article).to.include({
            title: "Living in the shadow of a great man",
            author: "butter_bridge"
          });
          expect(res.body.article.article_id).to.equal(1);
        });
    });
  });
  describe("PATCH api/articles:article_id", () => {
    it("STATUS: 200 responds with an article object with vote count increased", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 3 })
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.equal(103);
          expect(res.body.article).to.contain.keys(
            "article_id",
            "author",
            "title",
            "body",
            "created_at",
            "votes",
            "topic",
            "comment_count"
          );
          expect(res.body.article.article_id).to.equal(1);
        });
    });
    it("STATUS: 200 responds with vote count decreased", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -10 })
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.equal(90);
          expect(res.body.article).to.contain.keys(
            "article_id",
            "author",
            "title",
            "body",
            "created_at",
            "votes",
            "topic",
            "comment_count"
          );
          expect(res.body.article.article_id).to.equal(1);
        });
    });
  });
  describe("POST api/articles:articleId/comments", () => {
    it("STATUS: 201 responds with a newly posted comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "butter_bridge",
          body: "I strongly object to this"
        })
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.include({
            article_id: 1,
            body: "I strongly object to this"
          });
        });
    });
  });
  describe("GET api/articles:articleId/comments", () => {
    it("STATUS: 200 responds with an object containing an array of comments", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(res => {
          expect(res.body.comments[0]).to.have.keys(
            "body",
            "author",
            "comment_id",
            "article_id",
            "created_at",
            "votes"
          );
          expect(res.body.comments[0].article_id).to.equal(1);
        });
    });
    it("STATUS: 200 array is sorted by 'created_at' and ordered descendingly by default", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
  });
  it("STATUS: 200 array accepts a sort_by query and sorts the array correspondingly", () => {
    return request(app)
      .get("/api/articles/1/comments?sort_by=votes")
      .expect(200)
      .then(res => {
        expect(res.body.comments).to.be.sortedBy("votes", {
          descending: true
        });
      });
  });
  it("STATUS: 200 array accepts an order_by query and orders the array correspondingly", () => {
    return request(app)
      .get("/api/articles/1/comments?sorted_by=votes&order_by=asc")
      .expect(200)
      .then(res => {
        expect(res.body.comments).to.be.sortedBy("created_at", {
          ascending: true
        });
      });
  });
  describe("GET:200 api/articles", () => {
    it("STATUS: 200 responds with an object with an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0]).to.have.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("STATUS: 200 sorts by date descending by default", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("created_at", {
            descending: true
          });
        });
    });
    it("STATUS: 200 accepts a sort_by query which orders the array accordingly", () => {
      return request(app)
        .get("/api/articles?sort_by=comment_count")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.sortedBy("comment_count", {
            descending: true
          });
        });
    });
    it("STATUS: 200 accepts a author query which filters the articles by the passed author query", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].author).to.equal("butter_bridge");
          expect(res.body.articles[1].author).to.equal("butter_bridge");
        });
    });
    it("STATUS: 200 accepts a topic query which filters the articles by the passed topic query", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].topic).to.equal("cats");
          expect(res.body.articles.length).to.equal(1);
        });
    });
  });
  describe("PATCH /api/comments/:comment_id", () => {
    it("STATUS 200: responds with a changed comment", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 3 })
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.equal(19);
          expect(res.body.comment).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
          expect(res.body.comment.comment_id).to.equal(1);
        });
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    it("STATUS 204: comment deleted", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(res => {
          expect(res.body).to.deep.equal({});
        });
    });
  });
});
