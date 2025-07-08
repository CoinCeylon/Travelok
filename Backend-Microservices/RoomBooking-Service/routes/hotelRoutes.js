const router = require("express").Router();
const {
  getAllHotels,
  getAllLocations,
} = require("../controllers/hotelController");

router.get("/", getAllHotels);
router.get("/locations", getAllLocations);
// router.post("/filter-hotels", getHotelsByFilters);
// router.get("/filter", getFilteredData);

module.exports = router;
