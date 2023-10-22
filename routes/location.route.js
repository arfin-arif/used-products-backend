const { getAllLocations, getCitiesByState } = require("../controllers/locationController");

const router = require("express").Router();


router.get('/', getAllLocations)
router.get('/:state', getCitiesByState)



module.exports = router;

