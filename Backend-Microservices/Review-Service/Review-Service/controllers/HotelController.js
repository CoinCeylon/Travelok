const Hotel = require('../models/Hotel');

// GET /api/hotels - Fetch all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hotels', error: error.message });
  }
};

module.exports = {
  getAllHotels
};
