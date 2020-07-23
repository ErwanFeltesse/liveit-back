const express = require('express');
// const connection = require('../../db');

const router = express.Router();

const VideoController = require('../controllers/video-controller');

router.get('/', VideoController.getAll);

router.get('/:id', VideoController.getOne);

router.delete('/:id', VideoController.deleteOne);

router.post('/', VideoController.createOne);

module.exports = router;