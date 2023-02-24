const db = require("../db/connection");

const fetchCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    return rows;
  });
};

const fetchReviews = (category, sort_by, order) => {
  const validCols = [
    "review_id",
    "title",
    "designer",
    "owner",
    "category",
    "review_body",
    "review_img_url",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validQueriesSort = sort_by ? `${sort_by}` : "created_at";
  const validQueriesOrder = `${order}` || "DESC";
  const validQueriesCategory = `WHERE category = ${category}` || "";
  const queryValues = [];
  let queryStr = `
  SELECT reviews.*, 
  CAST(COUNT(comment_id) AS INTEGER) AS comment_count 
  FROM reviews 
  LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    queryValues.push(category);
    queryStr += ` WHERE reviews.category = $${queryValues.length}`;
  }

  queryStr += `
  GROUP BY reviews.review_id
`;

  if (sort_by) {
    queryStr += ` ORDER BY ${sort_by}`;
  } else {
    queryStr += ` ORDER BY created_at`;
  }

  if (order) {
    queryStr += ` ${order.toUpperCase()}`;
  } else {
    queryStr += ` DESC`;
  }

  return db.query(queryStr, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: `Try again -  ${category} does not exist yet!!!`,
      });
    } else {
      return rows;
    }
  });
};

const fetchReviewsbyId = (params) => {
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
module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewsbyId,
  fetchReviewIdComments,
  insertComment,
};
