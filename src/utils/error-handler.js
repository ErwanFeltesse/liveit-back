module.exports = (err, req, res) => {
    res.status(err.statusCode).json(err);
  };
  