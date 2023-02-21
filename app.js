const db = require("./db/connection");
const express = require("express");
const seed = require("./db/seeds/seed");
const { getCategories, getReviews } = require("./controllers/app-controllers");
const { handle404 } = require("./controllers/error-controllers");
const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.use(handle404);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;
