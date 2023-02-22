const {
  fetchCategories,
  fetchReviews,
  fetchReviewsbyId,
} = require("../models/app-models");

const getCategories = (req, res, next) => {
  fetchCategories()
    .then((result) => res.status(200).send({ categories: result }))
    .catch(next);
};

const getReviews = (req, res, next) => {
  fetchReviews()
    .then((result) => res.status(200).send({ reviews: result }))
    .catch(next);
};

const getReviewsById = (req, res, next) => {
  fetchReviewsbyId(req)
    .then((result) => res.status(200).send({ review: result }))
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCategories, getReviews, getReviewsById };
