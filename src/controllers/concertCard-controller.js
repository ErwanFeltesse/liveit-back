const ConcertCardModel = require('../models/artistCard-model');
const ErrorCustom = require('../utils/ErrorCustom');

class ConcertCardController {

  static async getAllForLib(req, res, next) {
    try{
      const concertCardData = await ConcertCardModel.getAllForLib(req.query)
     if (concertCardData.length === 0) {
       return res.status(404).send('Nothing Found !')
     }
      res.status(200).json(concertCardData)
    } catch (error) {
      console.log(error)
      return res.status(500).send('Something bad happened...')
    }
  }
}

module.exports = ConcertCardController;