process.env.NODE_ENV = "test";

const app = require("../app.js");
const connection = require("../connections.js");

const chai = require("chai");
const { expect } = chai;

const request = require("supertest");

const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("ALL /not_a_route", () => {
    it("STATUS:404 get request route not found", () => {
      const methods = ["post", "patch", "delete", "get"];
      const promises = methods.map(method => {
        return request(app)
          [method]("/notAroute")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("route not found");
          });
      });
      return Promise.all(promises);
    });
    describe("/api", () => {
      describe("ALL /api/not_a_route", () => {
        it("STATUS:404 get request route not found", () => {
          const methods = ["post", "patch", "delete", "get"];
          const promises = methods.map(method => {
            return request(app)
              [method]("/api/notAroute")
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal("route not found");
              });
          });
          return Promise.all(promises);
        });
      });
      describe("/users", () => {
        describe("GET /api/users/username", () => {
          it(" STATUS:400 user not found", () => {
            return request(app)
              .get("/api/users/notauser")
              .expect(404)
              .then(res => expect(res.body.msg).to.equal("route not found"));
          });
        });
      });
      describe("/articles", () => {
        describe("GET  /api/articles/id_not_found", () => {
          it("STATUS 404 route not found", () => {
            return request(app)
              .get("/api/articles/666")
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal("route not found");
              });
          });
        });
        describe("GET /api/articles/wrong_format_id", () => {
          it("STATUS:400 bad request", () => {
            return request(app)
              .get("/api/articles/six")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
        describe("PATCH  /api/articles/id_not_found", () => {
          it("STATUS 404 route not found", () => {
            return request(app)
              .patch("/api/articles/4000")
              .send({ inc_votes: 3 })
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal("route not found");
              });
          });
        });
        describe("PATCH /api/articles/wrong_format_id", () => {
          it("STATUS:400 bad request", () => {
            return request(app)
              .patch("/api/articles/six")
              .send({ inc_votes: 3 })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
        describe("PATCH /api/articles/article_id (no data sent in patch request)", () => {
          it("STATUS: 400 bad request", () => {
            return request(app)
              .patch("/api/articles/1")
              .send()
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
        describe("PATCH /api/articles/article_id (no inc_votes key patch request)", () => {
          it("STATUS: 400 bad request", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ randomKey: 2 })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
        describe("PATCH /api/articles/article_id (invalid inc_votes value)", () => {
          it("STATUS: 400 bad request", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: "yes" })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
        describe.only("PATCH /api/articles/article_id (extra property on request body)", () => {
          it("STATUS: 400 bad request", () => {
            return request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 2, mitch: "present" })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
      });
    });
  });
});
