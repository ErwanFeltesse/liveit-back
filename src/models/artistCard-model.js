const connection = require('../../db');
const util= require('util');
const ArtistModel = require('./artist-model');

const queryAsync = util.promisify(connection.query).bind(connection);

class ArtistCardModel {
    constructor(artistCardData) {
      this.nom =artistCardData.nom;
      this.mail =artistCardData.mail;
      this.description = artistCardData.description
      this.genre =artistCardData.genre;
      this.img_url =artistCardData.img_url;
      this.titre = artistCardData.titre;
      this.url = artistCardData.url;
      this.date = artistCardData.date;
      this.adresse = artistCardData.adresse;
      this.scene = artistCardData.scene;
      this.ville = artistCardData.ville;
      this.genre_concert = artistCardData.genre;
      this.date_concert = artistCardData.date_concert;
      this.heure = artistCardData.heure
  
    }
  /*   select tb1.clef, tb1.nom, tb1.prenom,
       tb2.titre, tb2.parution, tb2.genre, tb2.prix
from            `ecrivains` as tb1
left outer join `livres`    as tb2
on tb2.clef = tb1.clef
union
select tb1.clef, tb1.nom, tb1.prenom,
       tb2.titre, tb2.parution, tb2.genre, tb2.prix
from             `ecrivains` as tb1
right outer join `livres`    as tb2
on tb2.clef = tb1.clef */
  
/*     static async getAll(data) {
        let query = "SELECT artiste.nom , artiste.genre, artiste.img_url, artiste.description, video.titre, video.date, video.url,video.genre, concert.scene, concert.date_concert, concert.heure, concert.ville, concert.adresse, concert.genre_concert FROM artiste LEFT JOIN video ON video.artiste_id = artiste.id LEFT JOIN concert ON concert.artiste_id= artiste.id";
     return await queryAsync(query, data);
    }
} */
static async getAllForLib(data) {
  let query = "SELECT video.titre, video.date, video.url, video.genre, artiste.nom FROM video LEFT JOIN artiste ON artiste.id= video.artiste_id ORDER BY date DESC"
  return await queryAsync(query, data);
  }
}

    module.exports = ArtistCardModel;