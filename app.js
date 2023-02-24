const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewsById,
  getReviewIdComments,
  postComment,
  deleteComment,
} = require("./controllers/app-controllers");
const {
  handle404,
  handleCustom,
  handleCustomErr,
  handle500Err,
} = require("./controllers/error-controllers");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getReviewIdComments);

app.post("/api/reviews/:review_id/comments", postComment);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handle404);

app.use(handleCustom);

app.use(handleCustomErr);

app.use(handle500Err);

module.exports = app;
