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
      describe("/topics", () => {
        describe("GET /api/topics", () => {
          it(" STATUS:400 bad request", () => {
            return request(app)
              .get("/api/topics/notatopic")
              .expect(404)
              .then(res => expect(res.body.msg).to.equal("route not found"));
          });
        });
      });
      describe("/users", () => {
        describe("GET /api/users:username", () => {
          it(" STATUS:400 user not found", () => {
            return request(app)
              .get("/api/users/notauser")
              .expect(404)
              .then(res => expect(res.body.msg).to.equal("route not found"));
          });
        });
      });
      describe("/articles", () => {
        describe(":article_id", () => {
          describe("GET  /api/articles:id_not_found", () => {
            it("STATUS 404 route not found", () => {
              return request(app)
                .get("/api/articles/666")
                .expect(404)
                .then(res => {
                  expect(res.body.msg).to.equal("route not found");
                });
            });
          });
          describe("GET /api/articles:wrong_format_id", () => {
            it("STATUS:400 bad request", () => {
              return request(app)
                .get("/api/articles/six")
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.equal("bad request");
                });
            });
          });
          describe("PATCH  /api/articles:id_not_found", () => {
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
          describe("PATCH /api/article:wrong_format_id", () => {
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
          describe("PATCH /api/articles:article_id (no data sent in patch request)", () => {
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
          describe("PATCH /api/articles:article_id (no inc_votes key patch request)", () => {
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
          describe("PATCH /api/articles:article_id (invalid inc_votes value)", () => {
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
          describe("PATCH /api/articles:article_id (extra property on request body)", () => {
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
          describe("/comments", () => {
            describe("POST /api/articles:article_id/comments (bad request)", () => {
              it("STATUS 400 bad request", () => {
                return request(app)
                  .post("/api/articles/one/comments")
                  .send({
                    username: "butter_bridge",
                    body: "I strongly object to this"
                  })
                  .expect(400)
                  .then(res => {
                    expect(res.body.msg).to.equal("bad request");
                  });
              });
            });
            describe("POST /api/articles:article_id/comments (invalid article_id)", () => {
              it("STATUS 404 route not found", () => {
                return request(app)
                  .post("/api/articles/3000/comments")
                  .send({
                    username: "butter_bridge",
                    body: "I strongly object to this"
                  })
                  .expect(404)
                  .then(res => {
                    expect(res.body.msg).to.equal("route not found");
                  });
              });
            });
            describe("POST /api/articles:article_id/comments (no comment)", () => {
              it("STATUS 400 bad input", () => {
                return request(app)
                  .post("/api/articles/1/comments")
                  .send()
                  .expect(400)
                  .then(res => {
                    expect(res.body.msg).to.equal("bad request");
                  });
              });
            });
            describe("POST /api/articles:article_id/comments (no username key present)", () => {
              it("STATUS: 400 bad request", () => {
                return request(app)
                  .post("/api/articles/1/comments")
                  .send({ body: "down with this sort of thing!" })
                  .expect(400)
                  .then(res => {
                    expect(res.body.msg).to.equal("bad request");
                  });
              });
            });
            describe("POST /api/articles:article_id/comments (no body key present)", () => {
              it("STATUS: 400 bad request", () => {
                return request(app)
                  .post("/api/articles/1/comments")
                  .send({ username: "lurker" })
                  .expect(400)
                  .then(res => {
                    expect(res.body.msg).to.equal("bad request");
                  });
              });
            });
            describe("POST /api/articles:article_id/comments  (username does not match a user)", () => {
              it("STATUS: 400 bad request", () => {
                return request(app)
                  .post("/api/articles/1/comments")
                  .send({ username: "bad username" })
                  .expect(400)
                  .then(res => {
                    expect(res.body.msg).to.equal("bad request");
                  });
              });
            });
            describe("POST /api/articles:article_id/comments (extra properties on request)", () => {
              it("STATUS: 400 bad request", () => {
                return request(app)
                  .post("/api/articles/1/comments")
                  .send({
                    username: "lurker",
                    body: "down with this sort of thing!",
                    mitch: "present"
                  })
                  .expect(400)
                  .then(res => {
                    expect(res.body.msg).to.equal("bad request");
                  });
              });
            });
          });
          describe("GET /api/articles:wrong_format_id", () => {
            it("STATUS:400 bad request", () => {
              return request(app)
                .get("/api/articles/six")
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.equal("bad request");
                });
            });
          });
          xdescribe("GET /api/articles:id_not_found/comments", () => {
            it("STATUS 404 route not found", () => {
              return request(app)
                .get("/api/articles/666/comments")
                .expect(404)
                .then(res => {
                  expect(res.body.msg).to.equal("route not found");
                });
            });
          });
        });
      });
    });
  });
});



