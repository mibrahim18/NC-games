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
      console.log(rows);
      if (rows.length === 0) {
        console.log("We Made IT!");
        return Promise.reject({
          status: 404,
          message: `Try again - ID ${params.review_id} does not exist yet!!!`,
        });
      } else {
        return rows[0];
      }
    });
};

const getReviewIdComments = (req) => {
  const { params } = req;
  return db
    .query(
      `
      SELECT reviews.* WHERE review_id = $1, 
      CAST(COUNT(comment_id) AS INTEGER) AS comment_count 
FROM reviews 
LEFT JOIN comments ON comments.review_id = reviews.review_id 
GROUP BY reviews.review_id 
ORDER BY created_at DESC`,
      [params.review_id]
    )
    .then(({ rows }) => {
      console.log(rows);
    });
};

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewsbyId,
  getReviewIdComments,
};
