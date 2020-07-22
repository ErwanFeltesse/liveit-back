const express = require('express');
// const connection = require('../../db');

const router = express.Router();

const GigController = require('../controllers/gig-controller');

router.get('/', GigController.getAll);
router.post('/', GigController.createOne);

module.exports = router;
