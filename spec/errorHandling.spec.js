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
  describe("ALL METHODS /not_a_route", () => {
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
    describe("ALL METHODS /api/not_a_route", () => {
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
      describe("/articles", () => {
        describe.only("GET AND PATCH /api/articles/id_not_found", () => {
          it("STATUS 404 route not found", () => {
            const methods = ["patch", "get"];
            const promises = methods.map(method => {
              return request(app)
                [method]("/api/articles/666")
                .expect(404)
                .then(res => {
                  expect(res.body.msg).to.equal("route not found");
                });
            });
            return Promise.all(promises);
          });
        });
        describe("GET AND PATCH /api/articles/wrong_format_id", () => {
          it("STATUS:400 bad request", () => {
            const methods = ["get, patch"];
            const promises = methods.map(method => {
              return request(app)
                [method]("/api/articles/six")
                .expect(400)
                .then(res => {
                  console.log(res.body);
                  expect(res.body.msg).to.equal("bad request");
                });
            });
            return Promise.all(promises);
          });
        });
        xdescribe("PATCH /api/articles/article_id", () => {
          it("STATUS: 400 bad request", () => {
            return request(app)
              .post("/api/articles/1")
              .send.expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("bad request");
              });
          });
        });
      });
    });
  });
});
