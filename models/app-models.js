const db = require("../db/connection");

const fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    return rows;
  });
};

const fetchReviews = () => {
  return db
    .query(
      `SELECT reviews.*, 
      CAST(COUNT(comment_id) AS INTEGER) AS comment_count 
FROM reviews 
LEFT JOIN comments ON comments.review_id = reviews.review_id 
GROUP BY reviews.review_id 
ORDER BY created_at DESC;
`
    )
    .then(({ rows }) => {
      return rows;
    });
};

const fetchReviewsbyId = (req) => {
  const { params } = req;
  return db
    .query(
      `
  SELECT * FROM reviews WHERE review_id = $1;`,
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

const fetchReviewIdComments = (req) => {
  const { params } = req;
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
      return rows;
    });
};
module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewsbyId,
  fetchReviewIdComments,
};
