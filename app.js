const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewsById,
  getReviewIdComments,
} = require("./controllers/app-controllers");
const {
  handle404,
  handle400,
  handleCustomErr,
  handle500Err,
} = require("./controllers/error-controllers");
const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getReviewIdComments);

app.use(handle404);

app.use(handle400);

app.use(handleCustomErr);

app.use(handle500Err);

module.exports = app;
