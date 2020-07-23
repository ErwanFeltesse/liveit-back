const VideoModel = require('../models/video-model');
const ErrorCustom = require('../utils/ErrorCustom');



class VideoController {
  static getAll(req, res, next) {
    VideoModel.getAll((error, results) => {
      res.status(200).json({
        status: 'success',
        results,
      });
    });
  }

  static getOne(req, res, next) {
    const { id } = req.params;
    VideoModel.getOne(id, (error, results) => {
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
  static async createOne(req, res) {
    const {
      titre,
      genre,
      url,
    } = req.body;
    try {
      if (!titre || !genre || !url) {
        return res.status(403).send('Genre, titre and url must be provided');
      }
      const data = await VideoModel.createOne({
        ...req.body,
      });
      return res.status(201).json({
        id: data.insertId,
        ...req.body,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something bad happened..');
    }
  }
  

  static deleteOne(req, res, next) {
    const { id } = req.params;
    VideoModel.deleteOne(id, (error, results) => {
      try {
        if (!id) {
          res.status(404).json({
            status: 'error',
            errorMessage: 'Id not found',
          });
        } else {
          res.status(201).json({
            status: 'success',
            videoDeleted: id,
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

module.exports = VideoController;
