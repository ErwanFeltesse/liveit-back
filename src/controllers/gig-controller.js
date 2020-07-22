const GigModel = require('../models/gig-model');

class GigController {
  static async getAll(req, res, next) {
    try {
      const data = await GigModel.getAll(req.query);
      if (data.length === 0) {
        res.status(404).send('Nothing found');
      } else {
        res.status(200).json({
          data,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createOne(req, res) {
    const { artiste_id, concert_id } = req.body;
    try {
      if (!artiste_id || !concert_id ) {
        return res.status(403).send('Please provide all fields');
      }
      const data = await GigModel.createOne({
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
}

module.exports = GigController;
