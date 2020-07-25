const connection = require('../../db');
const util= require('util');

const queryAsync = util.promisify(connection.query).bind(connection);

class ConcertModel {
  constructor(concertData) {
    this.date = concertData.date;
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
      let query = "SELECT * FROM concert ORDER BY date DESC";
      if (filters) {
        const { genre, scene, artiste_id, id, date } = filters;
        if (scene && artiste_id) {
          query = `SELECT * FROM concert 
                  WHERE scene LIKE ${connection.escape(`%${scene}%`)} 
                  AND artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                  ORDER BY date DESC`;
        } else if (genre) {
          query = `SELECT * FROM concert 
                  WHERE genre LIKE ${connection.escape(`%${genre}%`)} 
                  ORDER BY date DESC`;
        }else if (date) {
          query =`SELECT * FROM concert
                  WHERE date LIKE ${connection.escape(`%${date}%`)}
                  ORDER BY date DESC`;
        } else if (artiste_id) {
          query = `SELECT * FROM concert 
                  WHERE artiste_id LIKE ${connection.escape(`${artiste_id}`)}
                  ORDER BY date DESC`;
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
     
    static async delete(id) {
      const query = "DELETE FROM concert WHERE id = ?";
      return await queryAsync(query, id);
    }
  }
module.exports = ConcertModel;