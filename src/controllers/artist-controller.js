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
  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const data = await ArtistModel.getOne(id);
      // check if content in data - If not then throw 404 error
      if (data.length === 0) {
        return res.status(404).send('Nothing Found !')
      }
      res.status(200).json(data[0]);
    } catch (err) {
      // Log error in console for debug (or via a logger as Winston) then send to next middleware (aka errorHandler)
      console.log(err);
      next(err);
    }
  }

 
  static async deleteOne(req, res, next) {
    const { id } = req.params;
    try {
      const data = await ArtistModel.deleteOne(id);
      if (data.affectedRows === 0) {
        return res.status(404).send('No resource to delete at this id');
      }
      res.status(204).send('Artist correctly deleted');
    } catch (err) {
      console.log(err);
      return res.status(500).send('Something bad happened...');
    }
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
