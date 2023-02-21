const { fetchCategories, fetchReviews } = require("../models/app-models");

const getCategories = (req, res, next) => {
  console.log(2);
  fetchCategories()
    .then((result) => res.status(200).send({ categories: result }))
    .catch(next);
};

const getReviews = (req, res) => {
  fetchReviews().then((result) => res.status(200).send({ categories: result }));
};

module.exports = { getCategories, getReviews };
