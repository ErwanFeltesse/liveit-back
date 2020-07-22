const express = require('express');
// const connection = require('../../db');

const router = express.Router();

const ArtistController = require('../controllers/artist-controller');

router.get('/', ArtistController.getAll);

router.get('/:id', ArtistController.getOne);

router.delete('/:id', ArtistController.deleteOne);

module.exports = router;