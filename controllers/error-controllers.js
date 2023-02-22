const handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Try again - Path not found!!!" });
};

const handle400 = (err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "bad request" });
  } else next(err);
};

const handleCustomErr = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
};

const handle500Err = (err, req, res) => {
  console.log(err, "details of 500 err");
  res.status(500).send("Server Error!");
};

module.exports = { handle404, handle400, handleCustomErr, handle500Err };
