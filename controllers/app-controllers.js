const {
  fetchCategories,
  fetchReviews,
  fetchReviewsbyId,
  fetchReviewIdComments,
  insertComment,
  removeComment,
  updateComment,
  fetchUsers,
  fetchApi,
} = require("../models/app-models");

const getApi = (request, response, next) => {
  fetchApi().then((listOfApis) => {
    response.status(200).send(listOfApis);
  });
};

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

const deleteComment = (req, res, next) => {
  const { params } = req;
  removeComment(params)
    .then((deletedComment) => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};

const patchComment = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateComment(review_id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
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
  deleteComment,
  patchComment,
  getUsers,
  getApi,
};
