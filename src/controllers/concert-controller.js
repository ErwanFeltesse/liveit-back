const ConcertModel = require('../models/concert-model');
const ErrorCustom = require('../utils/ErrorCustom');

class ConcertController {
  static async getAll(req, res, next) {
    try{
      const concertData = await ConcertModel.getAll(req.query)
     if (concertData.length === 0) {
       return res.status(404).send('Nothing Found !')
     }
      res.status(200).json(concertData)
    } catch (error) {
      console.log(error)
      return res.status(500).send('Something bad happened...')
    }
  }

  static getOne(req, res, next) {
    const { id } = req.params;
    ConcertModel.getOne(id, (error, results) => {
      try {
        if (results.length === 0) {
          res.status(404).json({
            status: 'error',
            errorMessage: 'Not found',
          });
        } else {
          res.status(200).json({
            status: 'success',
            results: results[0],
          });
        }
      } catch (err) {
        res.status(500).json({
          status: 'error',
          errorMessage: 'Our server encountered an error performing the request',
        });
      }
    });
  }

  static async createOne(req, res, next) {
    const { artiste_id, scene, genre_concert, heure, date_concert, adresse, ville } = req.body;
    try {
      if (!artiste_id || !genre_concert || !scene || !date_concert || !heure || !adresse ||!ville) {
        return res.status(403).send('Please provide all fields');
      }
      const data = await ConcertModel.createOne({
        ...req.body,
      });
      return res.status(201).json({
        data,
        ...req.body,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something bad happened..');
    }
  }

  static deleteOne(req, res, next) {
    const { id } = req.params;
    ConcertModel.deleteOne(id, (error, results) => {
      try {
        if (!id) {
          res.status(404).json({
            status: 'error',
            errorMessage: 'Id not found',
          });
        } else {
          res.status(201).json({
            status: 'success',
            concertDeleted: id,
          });
        }
      } catch (err) {
        res.status(500).json({
          status: 'error',
          errorMessage: 'Our server encountered an error performing the request',
        });
      }
    });
  }
}

module.exports = ConcertController;
