const connection = require('../../db');
const util= require('util');

const queryAsync = util.promisify(connection.query).bind(connection);

class VideoModel {
  constructor(videoData) {
    this.artiste_id = videoData.artiste_id;
    this.url= videoData.prenom
    this.genre = videoData.genre;
    this.titre = videoData.titre
  }

  static createOne(data){
  const query = "INSERT INTO video SET ?";
  return queryAsync(query, data);
  }



  static async getAll(filters) {
    let query = "SELECT * FROM video ORDER BY date_video DESC";
    if (filters) {
      const { genre, titre, artiste_id, id } = filters;
      if (titre && artiste_id) {
        query = `SELECT * FROM video 
                WHERE titre LIKE ${connection.escape(`%${titre}%`)} 
                AND artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                ORDER BY date_video DESC`;
      } else if (titre) {
        query = `SELECT * FROM video 
                WHERE titre LIKE ${connection.escape(`%${titre}%`)} 
                ORDER BY date_video DESC`;
      }else if (genre) {
        query =`SELECT * FROM video
                WHERE genre LIKE ${connection.escape(`%${genre}%`)}
                ORDER BY date_video DESC`;
      } else if (artiste_id) {
        query = `SELECT * FROM video 
                WHERE artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                ORDER BY date_video DESC`;
      } else if (id) {
        query = `SELECT * FROM video 
                WHERE id LIKE ${connection.escape(`${id}`)}`;
      }
    }
    return await queryAsync(query);
  }

  static async getAllForArtists(filters, artiste) {
    let query = "SELECT * FROM video WHERE artist_id =?ORDER BY date_video DESC";
    if (filters) {
      const { genre, titre, artiste_id, id } = filters;
      if (titre && artiste_id) {
        query = `SELECT * FROM video 
                WHERE titre LIKE ${connection.escape(`%${titre}%`)} 
                AND artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                ORDER BY date_video DESC`;
      } else if (titre) {
        query = `SELECT * FROM video 
                WHERE titre LIKE ${connection.escape(`%${titre}%`)} 
                ORDER BY date_video DESC`;
      }else if (genre) {
        query =`SELECT * FROM video
                WHERE genre LIKE ${connection.escape(`%${genre}%`)}
                ORDER BY date_video DESC`;
      } else if (artiste_id) {
        query = `SELECT * FROM video 
                WHERE artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                ORDER BY date_video DESC`;
      } else if (id) {
        query = `SELECT * FROM video 
                WHERE id LIKE ${connection.escape(`${id}`)}`;
      }
    }
    return await queryAsync(query);
  }

  static async getOne(id) {
    const query = "SELECT * FROM video WHERE id = ?";
    return await queryAsync(query, id);
  }
   

  static deleteOne(id, callback) {
    const query = 'DELETE FROM video WHERE id = ?';
    connection.query(query, id, (error, results) => {
      callback(error, results);
    });
  }
}

module.exports = VideoModel;
