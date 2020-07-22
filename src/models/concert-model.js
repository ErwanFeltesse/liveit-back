const connection = require('../../db');
const ErrorCustom = require('../utils/ErrorCustom');

class ConcertModel {
  constructor(concertData) {
    this.date = concertData.date;
    this.scene= concertData.scene;
    this.genre = concertData.genre;
    this.adresse = concertData.adresse;
    this.ville = concertData.ville;
  }

  static getAll(callback) {
    connection.query('SELECT * from concert', (error, results, fields) => {
      callback(error, results);
    });
  }

  static getOne(id, callback) {
    const query = 'SELECT * from concert WHERE id = ?';
    connection.query(query, id, (error, results) => {
      callback(error, results);
    });
  }
   static deleteOne(id, callback) {
    const query = 'DELETE FROM artist WHERE id = ?';
    connection.query(query, id, (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = ConcertModel;