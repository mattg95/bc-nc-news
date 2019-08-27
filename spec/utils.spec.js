const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe.only("formatDates", () => {
  it("when passed an array of one empty object, returns an array of one empty object", () => {
    const input = [{}]
    const output = [{}]
    expect(formatDates(input)).to.deep.equal(output);
  });
  it("when passed a date formatted as a UNIX timestamp, returns the same date as a javascript date object", () => {
    const input = [{ created_at: 0 }]
    const output = [{ created_at: '1/0/1970' }]
    expect(formatDates(input)).to.deep.equal(output);
  });
  it("when passed a comment, changes only the date property to a javascript date object", () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }]
    const output = [{ body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: '22/10/2017'
  }]
    expect(formatDates(input)).to.deep.equal(output);
  })
  it("works for an array of multiple objects", () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    },
    { created_at: 0 }]
    const output = [{ body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: '22/10/2017'},
      { created_at: '1/0/1970' }
    ]
    expect(formatDates(input)).to.deep.equal(output)
  })
})


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

describe.only("formatComments", () => {});
