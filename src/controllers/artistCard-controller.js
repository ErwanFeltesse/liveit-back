const ArtistCardModel = require('../models/artistCard-model');
const ErrorCustom = require('../utils/ErrorCustom');

class ArtistCardController {

  static async getAll(req, res, next) {
    try{
      const artistCardData = await ArtistCardModel.getAll(req.query)
     if (artistCardData.length === 0) {
       return res.status(404).send('Nothing Found !')
     }
      res.status(200).json(artistCardData)
    } catch (error) {
      console.log(error)
      return res.status(500).send('Something bad happened...')
    }
  }
}

module.exports = ArtistCardController;