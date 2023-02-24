const db = require("../db/connection");

const fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    return rows;
  });
};

const fetchReviews = (category, sort_by = "created_at", order = "desc") => {
  return db
    .query(
      `SELECT reviews.*, 
      CAST(COUNT(comment_id) AS INTEGER) AS comment_count 
FROM reviews 
LEFT JOIN comments ON comments.review_id = reviews.review_id 
GROUP BY reviews.review_id 
ORDER BY created_at ${order};
`
    )
    .then(({ rows }) => {
      return rows;
    });
};

const fetchReviewsbyId = (params) => {
  return db
    .query(
      `
SELECT 
  reviews.*, 
  (SELECT COUNT(*) FROM comments WHERE review_id = $1)::integer as comment_count 
FROM reviews WHERE review_id = $1;`,
      [params.review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: `Try again - ID ${params.review_id} does not exist yet!!!`,
        });
      } else {
        return rows[0];
      }
    });
};

const fetchReviewIdComments = (params) => {
  return db
    .query(
      `
      SELECT comments.*, 
      CAST(COUNT(comment_id) AS INTEGER) AS comment_count 
      FROM reviews 
      LEFT JOIN comments ON comments.review_id = reviews.review_id 
      WHERE reviews.review_id = $1
      GROUP BY comments.comment_id 
      ORDER BY comments.created_at DESC
      `,
      [params.review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: `Try again - ID ${params.review_id} does not exist yet!!!`,
        });
      } else if (rows[0].comment_id === null) {
        return [];
      } else {
        return rows;
      }
    });
};
const insertComment = (commentToPost, review_id) => {
  return db
    .query(
      "INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;",
      [commentToPost.username, commentToPost.body, review_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
const updateComment = (review_id, inc_votes) => {
  return db
    .query(
      "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *",
      [inc_votes, review_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

const fetchUsers = (req, res, next) => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewsbyId,
  fetchReviewIdComments,
  insertComment,
  updateComment,
  fetchUsers,
};
