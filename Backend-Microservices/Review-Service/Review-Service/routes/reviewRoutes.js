// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { postReview } = require('../controllers/reviewController');

router.post('/submit', postReview);

module.exports = router;
