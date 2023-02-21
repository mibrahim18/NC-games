const fetchCategories = require("../models/app-models");

const getCategories = (req, res) => {
  fetchCategories().then((result) =>
    res.status(200).send({ categories: result })
  );
};

module.exports = getCategories;
