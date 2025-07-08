const db = require("../db/connection");
const { Hotels } = require("../models/Hotels");

const getAllHotels = async (req, res) => {
  const location = req.query.location;
  try {
    let hotels;
    if (location) {
      hotels = await Hotels.getHotelsByLocation(location);
    } else {
      hotels = await Hotels.getAllHotels();
    }
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await Hotels.getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations" });
  }
};

module.exports = {
  getAllHotels,
  getAllLocations,
};
