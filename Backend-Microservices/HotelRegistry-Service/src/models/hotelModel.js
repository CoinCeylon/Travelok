//  Mongo DB style

import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    walletAddress: String,
    licenseIPFSHash: String,
    imageIPFSHash: String,
    isVerified: { type: Boolean, default: false },
    nftTxHash: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Hotel', hotelSchema);
