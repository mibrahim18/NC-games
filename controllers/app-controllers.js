const {
  fetchCategories,
  fetchReviews,
  fetchReviewsbyId,
  fetchReviewIdComments,
  insertComment,
  updateComment,
  fetchUsers,
} = require("../models/app-models");

const getCategories = (req, res, next) => {
  fetchCategories()
    .then((result) => res.status(200).send({ categories: result }))
    .catch((err) => {
      next(err);
    });
};

const getReviews = (req, res, next) => {
  const { category, sort_by, order } = req.query;
  fetchReviews(category, sort_by, order)
    .then((result) => res.status(200).send({ reviews: result }))
    .catch((err) => {
      next(err);
    });
};

const getReviewsById = (req, res, next) => {
  const { params } = req;
  fetchReviewsbyId(params)
    .then((result) => res.status(200).send({ review: result }))
    .catch((err) => {
      next(err);
    });
};

const getReviewIdComments = (req, res, next) => {
  const { params } = req;
  fetchReviewIdComments(params)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

const postComment = (req, res, next) => {
  const commentToPost = req.body;
  const review_id = req.params.review_id;
  insertComment(commentToPost, review_id)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

const patchComment = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(review_id, inc_votes)
    .then((rows) => {
      res.status(200).send({ rows });
    })
    .catch((err) => {
      console.log(err, "controllers err");
      next(err);
    });
};

const getUsers = (req, res, next) => {
  fetchUsers()
    .then((rows) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCategories,
  getReviews,
  getReviewsById,
  getReviewIdComments,
  postComment,
  patchComment,
  getUsers,
};
