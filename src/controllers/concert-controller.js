const ConcertModel = require('../models/concert-model');
const ErrorCustom = require('../utils/ErrorCustom');

class ConcertController {
  static getAll(req, res, next) {
    ConcertModel.getAll((error, results) => {
      res.status(200).json({
        status: 'success',
        results,
      });
    });
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

  static createOne(req, res, next) {
    if (!req.body) {
      throw new ErrorCustom(400, 'Please fill all fields');
    }
    const concert = new ConcertModel(req.body);
    try {
      concert.createOne((error, results) => {
        res.status(201).json({
          status: 'success',
         concertCreated: {
            id: results.insertId,
            ...req.body,
          },
        });
      });
    } catch (err) {
      res.send(err);
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
