const express = require('express');
const util = require('util');
const bcrypt = require('bcrypt');

const router = express.Router();
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

router.post('/', async (req, res) => {
  try {
    const { mail, mdp } = req.body;
    const query = 'SELECT * FROM artiste WHERE mail = ?';
    const existingArtist = await queryAsync(query, mail);
    if (existingArtist[0]) {
      if (bcrypt.compareSync(mdp, existingArtist[0].mdp)) {
        return res.status(200).json({
          id: existingArtist[0].id,
          nom: existingArtist[0].nom,
          mail: existingArtist[0].mail,
          genre : existingArtist[0].genre,
          img_url: existingArtist[0].img_url,
        });
  
      }
    }
    return res.status(404).send('Artist not found');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something bad happened...');
  }
});

module.exports = router;