const ArtistModel = require('../models/artist-model');
const ErrorCustom = require('../utils/ErrorCustom');

class ArtistController {
  static getAll(req, res, next) {
    ArtistModel.getAll((error, results) => {
      res.status(200).json({
        status: 'success',
        results,
      });
    });
  }

  static getOne(req, res, next) {
    const { id } = req.params;
    ArtistModel.getOne(id, (error, results) => {
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
    const artist = new ArtistModel(req.body);
    try {
      artist.createOne((error, results) => {
        res.status(201).json({
          status: 'success',
          userCreated: {
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
    ArtistModel.deleteOne(id, (error, results) => {
      try {
        if (!id) {
          res.status(404).json({
            status: 'error',
            errorMessage: 'Id not found',
          });
        } else {
          res.status(201).json({
            status: 'success',
            artistDeleted: id,
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

module.exports = ArtistController;
