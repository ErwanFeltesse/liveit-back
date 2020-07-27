const express = require('express');
// const connection = require('../../db');

const router = express.Router();

const ConcertcardController = require('../controllers/concertCard-controller');

router.get('/', ConcertcardController.getAllForLib);

module.exports = router;