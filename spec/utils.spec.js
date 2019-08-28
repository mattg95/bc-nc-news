const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("when passed a date formatted as a UNIX timestamp, returns the same date as a javascript date object", () => {
    const input = [{ created_at: 0 }];
    const output = formatDates(input);
    expect(output[0].created_at).to.deep.equal(new Date(0));
  });
  it("when an object with multiple key-value pairs, only the date property to a javascript date object", () => {
    const input = [
      {
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const output = formatDates(input);
    expect(output[0].created_at).to.deep.equal(new Date(1511354163389));
  });
  it("works for an array of multiple objects", () => {
    const input = [
      {
        votes: 16,
        created_at: 1511354163389
      },
      { created_at: 0 }
    ];
    const output = formatDates(input);
    expect(output[0].created_at).to.deep.equal(new Date(1511354163389));
    expect(output[1].created_at).to.deep.equal(new Date(0));
  });
});

describe("makeRefObj", () => {
  it("takes an array of objects as input and returns an object", () => {
    const input = [{}];
    const output = {};
    expect(makeRefObj(input)).to.deep.equal(output);
  });
  it("transforms each object so that the article id corresponds with the title", () => {
    const input = [{ article_id: 1, title: "A" }];
    const output = { A: 1 };
    expect(makeRefObj(input)).to.deep.equal(output);
  });
  it("works over an array of multiple objects", () => {
    const input = [
      { article_id: 1, title: "A" },
      { article_id: 2, title: "B" }
    ];
    const output = { A: 1, B: 2 };
    expect(makeRefObj(input)).to.deep.equal(output);
  });
});

describe.only("formatComments", () => {
  const comment = [
    {
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: "butter_bridge",
      votes: 16,
      created_at: 1511354163389
    }
  ];
  const ref = { "They're not exactly dogs, are they?" : 1};
  const output = formatComments(comment, ref);
  it("should change the 'created_by' key of a comment to 'author'", () => {
    expect(output[0].author).to.equal("butter_bridge");
    expect(output[0].created_by).to.equal(undefined);
  });
  it("should change the 'belongs_to' key to an 'article_id' key", () => {
    expect(output[0]).to.have.property("article_id");
    expect(output[0].belongs_to).to.equal(undefined);
  });
  it("article_id key should correspond with the title of the origional 'belongs_to' key", () => {
    expect(output[0].article_id).to.equal(1)
  });
});
