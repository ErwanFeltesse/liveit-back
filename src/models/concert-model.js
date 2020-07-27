const connection = require('../../db');
const util= require('util');

const queryAsync = util.promisify(connection.query).bind(connection);

class ConcertModel {
  constructor(concertData) {
    this.artiste_id = concertData.artiste_id
    this.date_concert = concertData.date_concert;
    this.scene= concertData.scene;
    this.genre = concertData.genre;
    this.heure = concertData.heure
    this.adresse = concertData.adresse;
    this.ville = concertData.ville;
  }

  static createOne(data){
    const query = "INSERT INTO concert SET ?";
    return queryAsync(query, data);
    }
  
  
    static async getAll(filters) {
      let query = "SELECT * FROM concert ORDER BY date_concert DESC";
      if (filters) {
        const { genre, scene, artiste_id, id, date_concert } = filters;
        if (scene && artiste_id) {
          query = `SELECT * FROM concert 
                  WHERE scene LIKE ${connection.escape(`%${scene}%`)} 
                  AND artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                  ORDER BY date_concert DESC`;
        } else if (genre) {
          query = `SELECT * FROM concert 
                  WHERE genre LIKE ${connection.escape(`%${genre}%`)} 
                  ORDER BY date_concert DESC`;
        }else if (date_concert) {
          query =`SELECT * FROM concert
                  WHERE date_concert LIKE ${connection.escape(`${date_concert}`)}
                  ORDER BY date_concert DESC`;
        } else if (artiste_id) {
          query = `SELECT * FROM concert 
                  WHERE artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                  ORDER BY date_concert DESC`;
        } else if (id) {
          query = `SELECT * FROM concert 
                  WHERE id LIKE ${connection.escape(`${id}`)}`;
        }
      }
      return await queryAsync(query);
    }
  
    static async getOne(id) {
      const query = "SELECT * FROM concert WHERE id = ?";
      return await queryAsync(query, id);
    }
     
    static deleteOne(id, callback) {
      const query = 'DELETE FROM video WHERE id = ?';
      connection.query(query, id, (error, results) => {
        callback(error, results);
      });
    }
  }
module.exports = ConcertModel;