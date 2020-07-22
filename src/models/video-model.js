const connection = require('../../db');
const ErrorCustom = require('../utils/ErrorCustom');

class VideoModel {
  constructor(videoData) {
    this.artiste_id = videoData.artiste_id;
    this.url= videoData.prenom
    this.genre = videoData.genre;
  }

  static getAll(callback) {
    connection.query('SELECT * from video', (error, results, fields) => {
      callback(error, results);
    });
  }

  static getOne(id, callback) {
    const query = 'SELECT * from video WHERE id = ?';
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

module.exports = VideoModel;
