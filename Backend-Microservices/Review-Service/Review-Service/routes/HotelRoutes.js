const express = require('express');
const router = express.Router();
const { getAllHotels } = require('../controllers/HotelController');

// GET all hotels
router.get('/', getAllHotels);

module.exports = router;
