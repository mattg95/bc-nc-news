process.env.NODE_ENV = "test";

const app = require("../app.js");
const connection = require("../connections.js");

const chai = require("chai");
const { expect } = chai;

const request = require("supertest");

describe("/", () => {
  ///////////////////////
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/not_a_route", () => {
    describe("ALL", () => {
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
    });
  });
  ////////////////////////
  describe("/api", () => {
    describe("/api/not_a_route", () => {
      describe("ALL", () => {
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
    });
    /////////////////////////////////
    describe("/api/topics", () => {
      describe("GET", () => {
        it(" STATUS:400 bad request", () => {
          return request(app)
            .get("/api/topics/notatopic")
            .expect(404)
            .then(res => expect(res.body.msg).to.equal("route not found"));
        });
      });
    });
    //////////////////////////////////
    describe("/api/users", () => {
      describe("/api/users/:username", () => {
        describe("GET", () => {
          it(" STATUS:404 user not found", () => {
            return request(app)
              .get("/api/users/notauser")
              .expect(404)
              .then(res => expect(res.body.msg).to.equal("route not found"));
          });
        });
      });
    });
    ////////////////////////////////////
    describe("/api/articles", () => {
      ///////////////////////////////////
      describe("/api/articles?query", () => {
        describe("GET", () => {
          it("STATUS 400 bad request (sort_by a column that doesn't exist)", () => {
            return request(app)
              .get("/api/articles?sort_by=yes")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
          it("STATUS 400 bad request (order !== asc or desc)", () => {
            return request(app)
              .get("/api/articles?order=random")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
      });
      describe("/api/articles/:article_id", () => {
        describe("GET", () => {
          it("STATUS:400 bad request (wrong_format_id)", () => {
            return request(app)
              .get("/api/articles/six")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
        describe("PATCH", () => {
          it("STATUS:400 bad request (wrong_format_id", () => {
            return request(app)
              .patch("/api/articles/six")
              .send({ inc_votes: 3 })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
        it("STATUS: 400 bad request(no data sent in patch request)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send()
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 400 bad request (no inc_votes key patch request)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ randomKey: 2 })
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 400 bad request (invalid inc_votes value)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "yes" })
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 400 bad request (extra property on request body)", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 2, mitch: "present" })
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
      });
      describe("api/articles/:article_id/comments", () => {
        ///////////////////////////////////////
        describe("POST ", () => {
          it("STATUS 400 bad request (wrong format article_id)", () => {
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

          it("STATUS 404 route not found (invalid article_id)", () => {
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
          it("STATUS 400 bad input (no comment)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send()
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
          it("STATUS: 400 bad request (no username key present)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ body: "down with this sort of thing!" })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
          it("STATUS: 400 bad request (no body key present)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "lurker" })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
          it("STATUS: 400 bad request (username does not match a user)", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "bad username" })
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
          it("STATUS: 400 bad request (extra properties on request)", () => {
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
        describe("GET", () => {
          it("STATUS: 400 bad request (incorrect format article_id)", () => {
            return request(app)
              .get("/api/articles/four/comments")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
          it("STATUS: 404 route not found (no article at article_id)", () => {
            return request(app)
              .get("/api/articles/3000/comments")
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal("route not found");
              });
          });
        });
      });
    });
  });
  describe("/api/comments", () => {
    ////////////////////////////////////////////
    describe("/api/comments/:comment_id", () => {
      //////////////////////////////////////////////
      describe("GET", () => {
        it("STATUS 404 route not found (invalid_id)", () => {
          return request(app)
            .get("/api/articles/666")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("route not found");
            });
        });
      });
      describe("PATCH ", () => {
        it("STATUS 404 route not found (invalid_comment_id", () => {
          return request(app)
            .patch("/api/comments/4000")
            .send({ inc_votes: 3 })
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("route not found");
            });
        });
        it("STATUS:400 bad request (wrong_format_id", () => {
          return request(app)
            .patch("/api/comments/six")
            .send({ inc_votes: 3 })
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 400 bad request (no data sent in patch request)", () => {
          return request(app)
            .patch("/api/comments/1")
            .send()
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 400 bad request (no inc_votes key patch request)", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ randomKey: 2 })
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 400 bad request (invalid inc_votes value)", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "yes" })
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 400 bad request (extra property on request body)", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 2, mitch: "present" })
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
      });
      describe("DELETE", () => {
        it("STATUS: 400 bad request (invalid comment_id format)", () => {
          return request(app)
            .delete("/api/comments/four")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("bad request");
            });
        });
        it("STATUS: 404 route not found", () => {
          return request(app)
            .delete("/api/comments/30000")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("route not found");
            });
        });
      });
    });
  });
});
