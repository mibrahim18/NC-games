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
  test("should give a 404 error + correct message for invalid path", () => {
    return request(app)
      .get("/api/does-not-exist")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Try again - Path not found!!!");
      });
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

describe("GET API/reviews", () => {
  test("should return 200 status & an object with the 9 corresponding keys in descending order (by date) with the correct data tyoe", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            review_body: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(Number),
          });
        });

        expect(body.reviews).toBeSorted("created_at", { descending: true });
      });
  });
});
