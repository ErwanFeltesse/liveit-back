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

  static createOne(req, res, next) {
    if (!req.body) {
      throw new ErrorCustom(400, 'Please fill all fields');
    }
    const video = new VideoModel(req.body);
    try {
      video.createOne((error, results) => {
        res.status(201).json({
          status: 'success',
         videoCreated: {
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
