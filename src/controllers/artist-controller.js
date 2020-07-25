const ArtistModel = require('../models/artist-model');
const ErrorCustom = require('../utils/ErrorCustom');

class ArtistController {

  static async getAll(req, res, next) {
    try{
      const artistData = await ArtistModel.getAll(req.query)
     if (artistData.length === 0) {
       return res.status(404).send('Nothing Found !')
     }
      res.status(200).json(artistData)
    } catch (error) {
      console.log(error)
      return res.status(500).send('Something bad happened...')
    }
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
  static async updateOne(req, res, next) {
    const { artiste_id, id} = req.params;
    const { nom, mail, img_url, genre } = req.body;
    try {
      //check parameters - If not satisfying then throw a custom error handled (catched)
      if (!nom && !mail && !img_url && !genre) {
        return res.status(400).send("You must specify at least one field to modify")
       
      }
      await ArtistModel.updateOne([req.body, id, artiste_id]);
      res.status(201).json({ id: id, ...req.body });
    } catch (err) {
      // Log error in console for debug (or via a logger as Winston) then send to next middleware (aka errorHandler)
      console.log(err);
      next(err);
    }
  }
}

module.exports = ArtistController;
