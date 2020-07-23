const connection = require('../../db');
const ErrorCustom = require('../utils/ErrorCustom');

class ArtistModel {
  constructor(artistData) {
    this.nom = artistData.nom;
    this.prenom= artistData.prenom
    this.mail = artistData.mail;
    this.mdp = artistData.mdp;
    this.genre = artistData.genre;
    this.img_url = artistData.img_url;

  }

  static getAll(callback) {
    connection.query('SELECT * from artiste', (error, results, fields) => {
      callback(error, results);
    });
  }

  static getOne(id, callback) {
    const query = 'SELECT * from artiste WHERE id = ?';
    connection.query(query, id, (error, results) => {
      callback(error, results);
    });
    
  }



  static deleteOne(id, callback) {
    const query = 'DELETE FROM artiste WHERE id = ?';
    connection.query(query, id, (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = ArtistModel;
