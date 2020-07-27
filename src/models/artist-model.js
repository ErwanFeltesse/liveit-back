const connection = require('../../db');
const util= require('util');

const queryAsync = util.promisify(connection.query).bind(connection);

class ArtistModel {
  constructor(artistData) {
    this.nom = artistData.nom;
    this.mail = artistData.mail;
    this.mdp = artistData.mdp;
    this.genre = artistData.genre;
    this.img_url = artistData.img_url;

  }

  static async getAll(data) {
    let query = "SELECT * FROM artiste";
  return await queryAsync(query, data);
  }

  static async getOne(id) {
    let query = "SELECT * FROM artiste WHERE id = ?";
    return await queryAsync(query, id);
  }

  static async deleteOne(id) {
    const query = "DELETE FROM artiste WHERE id = ?";
    return await queryAsync(query, id);
  }
  
  static async updateOne(trackData) {
  const query = "UPDATE artiste SET ? WHERE id = ?";
  return await queryAsync(query, trackData);
}
}



module.exports = ArtistModel;
