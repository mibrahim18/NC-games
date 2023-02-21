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

module.exports = { fetchCategories, fetchReviews };
