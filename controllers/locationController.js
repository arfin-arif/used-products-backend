const LocationModel = require('../models/locationModel');


module.exports.getAllLocations = async (req, res, next) => {
    try {
        const location = await LocationModel.find();
    
    
        res.status(200).json( location);
      } catch (error) {
        next(error);
      }
  };

module.exports.getCitiesByState = async (req, res, next) => {
    try {
        const { state } = req.params;
        const location = await LocationModel.findOne({ state });
    
        if (!location) {
          return res.status(404).json({ message: "State not found" });
        }
    
        const cities = location.cities;
        res.status(200).json(cities);
      } catch (error) {
        next(error);
      }
  };