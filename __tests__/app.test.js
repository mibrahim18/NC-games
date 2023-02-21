const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const connection = require("../db/connection");
const data = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return connection.end();
});

describe("app", () => {
  test("should give a 500 error for invalid path", () => {
    return request(app).get("/api/does-not-exist").expect(404);
  });
});

describe("GET API/categories", () => {
  test("should return 200 status & an object with keys of description and slug", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).toHaveLength(4);
        body.categories.forEach((category) => {
          expect(category).toHaveProperty("description");
          expect(category).toHaveProperty("slug");
        });
      });
  });
});

// describe("GET API/reviews", () => {
//   test("should return 200 status & an object with the 9 corresponding keys in descending order (by date)", () => {
//     return request(app)
//       .get("/api/reviews")
//       .expect(200)
//       .then(({ body }) => {
//         body.categories.forEach((category) => {
//           expect(category).toHaveProperty("owner");
//           expect(category).toHaveProperty("title");
//           expect(category).toHaveProperty("review_id");
//           expect(category).toHaveProperty("category");
//           expect(category).toHaveProperty("review_img_url");
//           expect(category).toHaveProperty("created_at");
//           expect(category).toHaveProperty("votes");
//           expect(category).toHaveProperty("designer");
//           expect(category).toHaveProperty("comment_count");
//         });
//       });
//   });
// });

// joining
// use count function
