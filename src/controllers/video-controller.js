const VideoModel = require('../models/video-model');
const ErrorCustom = require('../utils/ErrorCustom');



class VideoController {

  static async getAllForLib(req, res, next) {
    try{
      const artistCardData = await VideoModel.getAllForLib(req.query)
     if (artistCardData.length === 0) {
       return res.status(404).send('Nothing Found !')
     }
      res.status(200).json(artistCardData)
    } catch (error) {
      console.log(error)
      return res.status(500).send('Something bad happened...')
    }
  }


  static async getAll(req, res, next) {
    const {idArtiste} = req.params;
    try{
      let videoData 
      if(!idArtiste){
        videoData= await VideoModel.getAll(req.query)
      } else {videoData = await VideoModel.getAllForL(req.query) }
     if (videoData.length === 0) {
       return res.status(404).send('Nothing Found !')
     }
      res.status(200).json(videoData)
    } catch (error) {
      console.log(error)
      return res.status(500).send('Something bad happened...')
    }
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
    const { artiste_id, titre, genre, url, date_video } = req.body;
    try {
      if (!artiste_id || !titre || !genre || !url || !date_video) {
        return res.status(403).send('Please provide all fields');
      }
      const data = await VideoModel.createOne({
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
}}

module.exports = VideoController;
