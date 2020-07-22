const express = require("express");
// const connection = require('../../db');

const router = express.Router();

const ConcertController = require("../controllers/concert-controller");

router.get("/", ConcertController.getAll);

router.get("/:id", ConcertController.getOne);

router.delete("/:id", ConcertController.deleteOne);

module.exports = router;
