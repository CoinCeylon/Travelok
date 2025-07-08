// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  hotelId: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String },
  ipfsCid: { type: String, required: true },
  txHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
