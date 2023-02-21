const { fetchCategories, fetchReviews } = require("../models/app-models");

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

module.exports = { getCategories, getReviews };
