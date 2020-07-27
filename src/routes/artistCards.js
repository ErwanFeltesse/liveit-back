const express = require('express');
// const connection = require('../../db');

const router = express.Router();

const ArtistcardController = require('../controllers/artistCard-controller');

router.get('/', ArtistcardController.getAllForLib);

module.exports = router;