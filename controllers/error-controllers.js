const handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Try again - Path not found!!!" });
};
module.exports = { handle404 };
