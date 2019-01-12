const request = require("supertest");
const app = require("../server/index.js");

describe("Test the GET all postController", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/all")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the DELETE all postController", () => {
  test("It should response the DELETE method", done => {
    request(app)
      .get("/all")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
describe("Test the GET postController", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/post")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
describe("Test the POST postController", () => {
  test("It should response the POST method", done => {
    request(app)
      .post("/post")
      .send("xyz")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
describe("Test the DELETE postController", () => {
  test("It should response the DELETE method", done => {
    request(app)
      // supertest uses just .del
      // should delete post be refactored for /post/:id
      .del("/post")
      .then(response => {
        // change this test
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
