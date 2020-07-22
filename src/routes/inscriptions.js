const express = require('express');
const util = require('util');
const bcrypt = require('bcrypt');

const router = express.Router();
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

router.post('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM artiste WHERE mail = ?';
    const {
      nom,
      mail,
      mdp,
      genre,
      img_url,
    } = req.body;
    if (!nom || !mail || !mdp || !genre || !img_url) {
      return res.status(403).send('Veuillez remplir tous les champs!');
    }
    const existingArtist = await queryAsync(query, mail);
    if (existingArtist[0]) {
      return res.status(409).send('Artist already exists!');
    }
    const hash = bcrypt.hashSync(mdp, 10);
    const insertQuery = 'INSERT INTO artiste SET ?';
    const result = await queryAsync(insertQuery, {
      ...req.body,
      mdp: hash,
    });
    return res.status(201).json({
      id: result.insertId,
      ...req.body,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something bad happened...');
  }
});

module.exports = router;