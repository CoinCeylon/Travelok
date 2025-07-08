// services/dbService.js
const Review = require('../models/Review');

async function saveReview({ wallet, hotelId, rating, reviewText, ipfsCid, txHash }) {
  const review = new Review({ wallet, hotelId, rating, reviewText, ipfsCid, txHash });
  await review.save();
}

module.exports = { saveReview };
