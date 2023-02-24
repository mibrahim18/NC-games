const handle404 = (req, res, next) => {
  res.status(404).send({ msg: "Try again - Path not found!!!" });
};

const handleCustom = (err, req, res, next) => {
  if (
    err.code === "22P02" ||
    err.code === "23502" ||
    err.code === "42703" ||
    err.code === "42601"
  ) {
    res.status(400).send({ msg: "bad request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Try again - Not found!!!" });
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
  console.log("here4");
  console.log(err, "details of 500 err");
  res.status(500).send("Server Error!");
};

module.exports = { handle404, handleCustom, handleCustomErr, handle500Err };
