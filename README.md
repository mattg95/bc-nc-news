# NewsApp

https://nc-news-matt-g.herokuapp.com/api

A web application which allows the hosting of articles, topics, comments and users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The app requires the use of node.js, postgresSQL, express.js and knex.js

#### Installation

To install the neccesary dependencies, run the following command;

```
npm install
```

The following dependencies will be installed:
express,
knex and
postgres.

The following developer dependencies will also be installed:
chai,
chai-sorted,
mocha,
supertest and
nodemon.

## Testing

To test the endpoints are working correctly, run the following command;

```
npm test
```

This will run the 'app.spec' tests. The following example test checks that the api/topics endpoint correctly returns an array of topic objects.

```

describe("GET", () => {
      it("STATUS:200 responds with an object containing an array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(res => {
            expect(res.body.topics[0]).contain.keys("description", "slug");
          });
      });
    });

```

To test the error are being handled properly, run the following command;

```
npm run test-errors
```

This will run the 'errorHandling.spec' tests. The following examle tests that a non-existent 'username' request inputed by the app user will return a '404' error code and 'route not found' message'

```

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

```

By contrast, this example tests that an invalied 'sort_by' query returns a '400' error code and 'bad request' message.

```

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

```

## Deployment

To deploy the system live, you will need web hosting that allows the use of postgresSQL. We reccomend Heroku web hosting.

## Built With

- [Visual Studio Code](https://code.visualstudio.com/docs) - This is a free, useful program for writing code in any language

- [Insomnia](https://insomnia.rest/) - This is used for testing endpoints in an easy, to understand, visual way. In particular, it is iseful in accepting POST, PATCH, PUT and DELETE requests, which web browsers cannot do.

## Contributing

Please see the [project repository](https://github.com/mattg95/be-nc-news/pulls) on GitHub if you wish to submit a pull request.

## Versioning

All version control is handled by GitHub. Please view [our GitHub](https://github.com/mattg95/be-nc-news) for all versions available.

## Authors

- [**Matt Goodman**](https://github.com/mattg95)

## License

This project is licensed and owned by NorthCoders.

## Acknowledgments

- Thanks to all the tutors for all the NChelp during this project.
