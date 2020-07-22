const util = require('util');
const connection = require('../../db');

const queryAsync = util.promisify(connection.query).bind(connection);

class GigModel {
  constructor(gigData) {
    this.artiste_id = gigData.artiste_id;
    this.concert_id = gigData.concert_id;
  }

  static async getAll(filters) {
    const { artiste_id } = filters;
    const query = `SELECT artiste_id, concert_id, date, genre, adresse, ville, scene 
                    FROM artiste_concert AS a 
                    JOIN concert AS c 
                    ON u.concert_id = c.id
                    WHERE artiste_id LIKE ${connection.escape(`%${artiste_id}%`)}`;
    return queryAsync(query);
  }

  static async createOne(data) {
    const query = 'INSERT INTO artiste_concert SET ?';
    return queryAsync(query, data);
  }
}

module.exports = GigModel;