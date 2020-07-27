const connection = require('../../db');
const util= require('util');


const queryAsync = util.promisify(connection.query).bind(connection);

class ConcertCardModel {
    constructor(concertCardData) {
      this.nom =concertCardData.nom;
      this.mail =concertCardData.mail;
      this.description = concertCardData.description
      this.genre =concertCardData.genre;
      this.img_url =concertCardData.img_url;
      this.titre = concertCardData.titre;
      this.url = concertCardData.url;
      this.date = concertCardData.date;
      this.adresse = concertCardData.adresse;
      this.scene = concertCardData.scene;
      this.ville = concertCardData.ville;
      this.genre_concert = concertCardData.genre;
      this.date_concert = concertCardData.date_concert;
      this.heure = concertCardData.heure
  
    }


static async getAllForLib(data) {
    let query = "SELECT concert.scene, concert.date_concert, concert.heure, concert.ville, concert.adresse, concert.genre_concert, artiste.nom FROM concert LEFT JOIN artiste ON artiste.id= concert.artiste_id ORDER BY concert_date DESC"
    return await queryAsync(query, data);
    }
  }

  module.exports = ConcertCardModel;
  